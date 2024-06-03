import { Container, Row, Col, Card } from "react-bootstrap";
import { create } from "zustand";
import { SlLike } from "react-icons/sl";
import styled from "styled-components";

const StyledDisLike = styled(SlLike)`
font-size: 25px;
transform: rotate(180deg);
`;

interface FavoritesProps{
  userId?: number;
  albumId?: number;
  id?: number;
  title: string;
  url: string;
  thumbnailUrl: string;

}
interface AlbumsProps {
  userId?: number;
  albumId?: number;
  id?: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorites: FavoritesProps[];
  setUserId: (payload: number) => void;
  setAlbumId: (payload: number) => void;
  setId: (payload: number) => void;
  setTitle: (payload: string) => void;
  setUrl: (payload: string) => void;
  setThumbnailUrl: (payload: string) => void;
  addFavorite: (album: FavoritesProps) => void;
  removeFavorite: (albumId: number) => void;
}

export const useAlbumsStore = create<AlbumsProps>((set) => ({
  userId: undefined,
  albumId: undefined,
  id: undefined,
  title: "",
  url: "",
  thumbnailUrl: "",
  favorites: [],
  setUserId: (payload) => set({ userId: payload }),
  setAlbumId: (payload) => set({ albumId: payload }),
  setId: (payload) => set({ id: payload }),
  setTitle: (payload) => set({ title: payload }),
  setUrl: (payload) => set({ url: payload }),
  setThumbnailUrl: (payload) => set({ thumbnailUrl: payload }),
  addFavorite: (album)=> 
    set((state)=>({
      favorites: [...state.favorites, album],
    })),
  removeFavorite: (albumId)=> 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set((state:any)=> ({
      favorites: state.favorites.filter((album)=> album.id !== albumId)
    }))
}));



export default function Favorites() {

  const favorites = useAlbumsStore((state) => state.favorites);
  const removeFavorite = useAlbumsStore((state) => state.removeFavorite);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDisLike = (albumId: any) => {
    removeFavorite(albumId);
  };
  
  return (
    <>
    <Container>
      <h2 className="text-center">Favorites Page</h2>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map((album) => (
            <Col xs={12} sm={6} md={4} lg={3} key={album.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={album.thumbnailUrl} alt={album.title} />
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                </Card.Body>
                <div className="text-center">
                <StyledDisLike onClick={() => handleDisLike(album.id)}/>
                </div>
              </Card>
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
