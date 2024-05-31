import { create } from "zustand";
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

export default function Favorites() {

  
  
  return (
    <div>Favorites</div>
  )
}

