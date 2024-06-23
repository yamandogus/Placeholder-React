import {Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { User} from "./user-details";
import { useAlbumStore } from "./favorites ";
import { useState } from "react";
import { Alert } from "@mui/material";
import { AlertDiv, UsersContainer } from "./styled-components/styled";
import { AiFillHeart } from "react-icons/ai";

interface LoaderParams {
  albumId: string;
  userId: string;
}

interface AlbumsProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface ShowProps{
  show: boolean;
  type: "success" | "error";
  message: string;
}



export async function loaderAlbums({ params }: { params: LoaderParams }) {
  const { albumId, userId } = params;
  const responseUser = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  const userData: AlbumsProps[] = await responseUser.json();

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = (await response.json()) as User;

  console.log(data);

  return { albums: userData, user: data };
}


export default function AlbumsPage() {
  const { albums, user } = useLoaderData() as Awaited<
    ReturnType<typeof loaderAlbums>
  >;
  const addFavorite = useAlbumStore((state) => state.addFavorite);
  const increaceCount = useAlbumStore((state)=> state.increaceCount);
  const[showAlert, setShowAlert] = useState<ShowProps>({show: false, type:"success", message: ""})

  const closeAlert = () => {
    setTimeout(() => {
      setShowAlert({...showAlert, show: false})
    }, 2000);
  }

  const handleLike = (album: AlbumsProps) => {
    addFavorite(album);
    increaceCount()
    setShowAlert({show: true, type: "success", message: "album added"})
    closeAlert()
  };


  return (
    <>
    <AlertDiv className="mt-3">
        {showAlert.show &&
            <Alert variant="filled" severity={showAlert.type} onClose={closeAlert}>
              {showAlert.message}
            </Alert>
          }
      </AlertDiv>
      <Container className="mt-3 mb-5">
        <Link style={{textDecoration:"none",
          color:"black"
        }} to={`/users/${user.id}`}>
          <UsersContainer>
          <h3>
            {user.name} ({user.username})
          </h3>
          </UsersContainer>
        </Link>
        <Row className="mt-4">
          {albums.map((album) => (
            <Col xs={12} sm={6} md={4} key={album.id}>
              <Card style={{ minHeight: "300px", backgroundColor:"#d2e8ff"  }} className="mb-3 cardImg">
                <Card.Img className="impType" variant="top" src={album.url} />
                <p className="albumsClas" style={{ padding: "5px"}}>
                  {album.title}
                </p>
                <div style={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
                }}>
                  <AiFillHeart 
                    style={{fontSize: "30px", cursor: "pointer" }}
                    onClick={() => handleLike(album)}
                  /> 
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}