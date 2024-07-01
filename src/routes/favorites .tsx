import { Card, Col, Container, Row } from "react-bootstrap";
import { create } from "zustand";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { createJSONStorage, persist } from "zustand/middleware";
import { Empty, NewCard } from "./styled-components/styled";



interface FavoritesProps {
  userId?: number;
  albumId?: number;
  id?: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface AlbumsProps {
  count: number;
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
  increaceCount: () => void;
  decreaseCount: () => void;
}


export const useAlbumStore = create<AlbumsProps>()(
  persist(
    (set) => ({
      count: 0,
      userId: undefined,
      albumId: undefined,
      id: undefined,
      title: "",
      url: "",
      thumbnailUrl: "",
      favorites: [],
      increaceCount: () => set((state) => ({ count: state.count + 1 })),
      decreaseCount: () => set((state) => ({ count: state.count > 0 ? state.count - 1 : state.count })),
      setUserId: (payload) => set({ userId: payload }),
      setAlbumId: (payload) => set({ albumId: payload }),
      setId: (payload) => set({ id: payload }),
      setTitle: (payload) => set({ title: payload }),
      setUrl: (payload) => set({ url: payload }),
      setThumbnailUrl: (payload) => set({ thumbnailUrl: payload }),
      addFavorite: (album) =>
        set((state) => ({
          favorites: [...state.favorites, album],
        })),
      removeFavorite: (albumId) =>
        set((state) => ({
          favorites: state.favorites.filter((album) => album.id !== albumId),
        })),
    }),
    {
      name: "favorite-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default function Favorites() {
  const favorites = useAlbumStore((state) => state.favorites);
  const removeFavorite = useAlbumStore((state) => state.removeFavorite);
  const decreaseCount= useAlbumStore((state) => state.decreaseCount);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDisLike = (albumId: any) => {
    removeFavorite(albumId);
    decreaseCount();
  };

  return (
    <>
      <Container>
        {favorites.length > 0 ? (
          <Row>
            <h2 className="text-center mt-3">Favorites Page</h2>
            {favorites.map((album) => (
              <Col xs={12} sm={6} md={4} lg={3} key={album.id} className="mb-4">
                <NewCard>
                  <Card.Img
                    variant="top"
                    src={album.thumbnailUrl}
                    alt={album.title}
                  />
                  <Card.Body>
                    <Card.Title>{album.title}</Card.Title>
                  </Card.Body>
                  <div className="text-center">
                    <IoHeartDislikeOutline
                      style={{
                        fontSize: "30px",
                      }}
                      onClick={() => handleDisLike(album.id)}
                    />
                  </div>
                </NewCard>
              </Col>
            ))}
          </Row>
        ) : (
          <>
          <Empty>Favorites box is empty</Empty>
          <img className="img-fluid" alt="Responsive image" src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130355-1800920.png" />
          </>
          
        )}
      </Container>
    </>
  );
}
