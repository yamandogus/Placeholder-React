import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { User, UsersContainer } from "./user-details";
import styled from "styled-components";
import { SlLike } from "react-icons/sl";
import { useAlbumsStore } from "./favorites ";

const StyledLike = styled(SlLike)`
font-size: 25px;
  &:hover {
    color: #0004ff;
  }
`;

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

  const addFavorite = useAlbumsStore((state) => state.addFavorite);

  const handleLike = (album: AlbumsProps) => {
    addFavorite(album);
  };


  return (
    <>
    <h2 className="text-center" style={{
      fontFamily:"sans-serif"

    }}>Albums</h2>
      <Container className="my-5">
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
              <Card style={{ minHeight: "300px" }} className="mb-3">
                <Card.Img variant="top" src={album.url} />
                <p style={{ padding: "5px" }}>
                  {album.title}
                </p>
                <div style={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
                }}>
                  <StyledLike onClick={() => handleLike(album)} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
