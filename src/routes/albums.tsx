import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { User } from "./user-details";
import { CiHeart } from "react-icons/ci";
import styled from "styled-components";
import { create } from "zustand";
import "./routes.css";

const StyledHeart = styled(CiHeart)`
  &:hover {
    color: red;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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

interface AlbumsState {
  userId?: number,
  albumId?: number,
  id?: number,
  title: string,
  url: string,
  thumbnailUrl: string,
  setUserId: (payload: number) => void,
  setAlbumId: (payload: number) => void,
  setId: (payload: number) => void,
  setTitle: (payload: string) => void,
  setUrl: (payload: string) => void,
  setThumbnailUrl: (payload: string) => void,
}

export const useAlbumsStore = create<AlbumsState>((set) => ({
  title: "",
  url: "",
  thumbnailUrl: "",
  setUserId: (payload) => set({userId: payload}),
  setAlbumId: (payload) => set({albumId: payload}),
  setId: (payload) => set({id: payload}),
  setTitle: (payload) => set({title: payload}),
  setUrl: (payload) => set({url: payload}),
  setThumbnailUrl: (payload) => set({thumbnailUrl:payload})
}));

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
