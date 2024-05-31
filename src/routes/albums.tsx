import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { User, UsersContainer } from "./user-details";
import { CiHeart } from "react-icons/ci";
import styled from "styled-components";
import { create } from "zustand";
import "./routes.css";
// import { useAlbumsStore } from "./favorites ";
// import { useEffect } from "react";

const StyledHeart = styled(CiHeart)`
  &:hover {
    color: red;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
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


type Store = {
  count: number
  inc: () => void
}

export const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))


export default function AlbumsPage() {
  const { albums, user } = useLoaderData() as Awaited<
    ReturnType<typeof loaderAlbums>
  >;
  // const userId = useAlbumsStore((state)=> state.userId);
  // const albumId = useAlbumsStore((state)=> state.albumId);
  // const id = useAlbumsStore((state) => state.id);
  // const title = useAlbumsStore((state)=> state.title);
  // const url = useAlbumsStore((state) => state.url)
  // const thumbnailUrl = useAlbumsStore((state) => state.setThumbnailUrl)
  // const setUserId = useAlbumsStore((state) => state.setUserId);
  // const setAlbumId = useAlbumsStore((state) => state.setAlbumId);
  // const setId = useAlbumsStore((state) => state.setId);
  // const setTitle = useAlbumsStore((state) => state.setTitle);
  // const setUrl = useAlbumsStore((state) => state.setUrl);
  // const setThumbnailUrl = useAlbumsStore((state) => state.setThumbnailUrl);


  return (
    <>
    <h2 className="text-center" style={{
      fontFamily:"sans-serif"

    }}>Albums</h2>
      <Container className="mt-4">
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
              <Card style={{ minHeight: "450px" }} className="mb-3">
                <h3></h3>
                <Card.Title style={{ padding: "5px" }}>
                  {album.title}
                </Card.Title>
                <Card.Img variant="top" src={album.url} />
                <CardBody style={{}}>
                  <StyledHeart className="heart" type="submit" size={30} />
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
