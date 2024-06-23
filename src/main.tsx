import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AlbumsPage, loader, loaderData, PostFavorites, Root, UsersPage} from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailsPage from './routes/user-details';
import CommentsPage, { LoaderComments } from './routes/comments';
import { loaderAlbums } from './routes/albums';
import Favorites from './routes/favorites ';
import "./routes/styles/sass/main.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index:true,
        path:"/users",
        loader: loader,
        element:<UsersPage/>
      },
      {
        path:"users/:userId",
        loader: loaderData,
        element:<UserDetailsPage/>,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <CommentsPage />,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loader: LoaderComments as any,
      }, 
      {
        path:"/users/:userId/albums/:albumId",
        element:<AlbumsPage/>,
        loader: loaderAlbums,
      },
      {
        path: "/favorites",
        element: <Favorites/>
      },
      {
        path:"/post-favorites",
        element: <PostFavorites/>  
      }
        ]
      }
    ]
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
