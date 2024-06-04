import {Card,Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import { create } from "zustand";
import { IoHeartDislikeOutline } from "react-icons/io5";

export const NewCard = styled(Card)`
 background: #d2e8ff;
 border-radius: 10px;
 transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

`

interface FavoritesProps{
  userId?: number,
  albumId?: number;
  id?: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface AlbumsProps {
  count: number,
  userId?: number,
  albumId?: number;
  id?: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorites: FavoritesProps[],
  setUserId : (payload: number) => void,
  setAlbumId: (payload: number) => void,
  setId: (payload: number) => void,
  setTitle: (payload: string) => void,
  setUrl: (payload: string) => void,
  setThumbnailUrl: (payload: string) => void,
  addFavorite: (album: FavoritesProps) => void,
  removeFavorite:(albumId: number) => void,
  increaceCount: () => void,
  disncreaceCount: () => void,
}

export const useAlbumStore = create<AlbumsProps>((set) =>({
  count: 0,
  userId: undefined,
  albumId: undefined,
  id: undefined,
  title: "",
  url:"",
  thumbnailUrl:"",
  favorites: [],
  increaceCount: () => set((state) => ({ count: state.count + 1 })),
  disncreaceCount: () => set((state) => ({ count: state.count - 1 })),
  setUserId: (payload) => set({userId: payload}),
  setAlbumId: (payload) => set({albumId: payload}),
  setId: (payload) => set({id: payload }),
  setTitle: (payload) => set({title: payload}),
  setUrl: (payload) => set({url: payload}),
  setThumbnailUrl: (payload) => set({thumbnailUrl: payload}),
  addFavorite: (album) =>
    set((state)=>({
      favorites: [...state.favorites, album]
    })),
  removeFavorite: (albumId) =>
    set((state) =>({
      favorites: state.favorites.filter((album) => album.id !== albumId)
    })),
}));

export default function Favorites() {

  const favorites = useAlbumStore((state) => state.favorites);
  const removeFavorite = useAlbumStore((state) => state.removeFavorite);
  const disncreaceCount = useAlbumStore((state)=> state.disncreaceCount)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDisLike = (albumId: any) => {
    removeFavorite(albumId);
    disncreaceCount()
  };
  
  return (
    <>
    <Container>
      <h2 className="text-center">Favorites Page</h2>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map((album) => (
            <Col xs={12} sm={6} md={4} lg={3} key={album.id} className="mb-4">
              <NewCard >
                <Card.Img variant="top" src={album.thumbnailUrl} alt={album.title} />
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                </Card.Body>
                <div className="text-center">
                <IoHeartDislikeOutline style={{
                  fontSize:"30px"
                }} onClick={() => handleDisLike(album.id)}/>
                </div>
              </NewCard>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No favorites added yet.</p>
      )}
    </Container>
    </>
  );
}