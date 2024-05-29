import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { User } from "./user-details";
import { CiHeart } from "react-icons/ci";
import { create } from "zustand";




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

export const useAlbumsStore = create((set)=>(
    {
        userId: "",
        albumId: "",
        id: "",
        title: "",
        url: "",
        thumbnailUrl: "", 
    }
))

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

  return (
    <>
      <Container>
        <Link to={`/users/${user.id}`}>
          <h3>
            {user.name} ({user.username})
          </h3>
        </Link>
        <Row>
          {albums.map((album) => (
            <Col xs={12} sm={6} md={4} key={album.id}>
              <Card style={{minHeight:"450px"}} className="mb-3">
                <h3></h3>
                <Card.Title style={{ padding: "5px" }}>
                  {album.title}
                </Card.Title>
                <Card.Img variant="top" src={album.url} />
                <Card.Body style={{
                    display:"flex",
                    justifyContent:"center"
                    }}>
                    <CiHeart size={30}/>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
