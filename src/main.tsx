import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DetailsPage, HomePage, loader, loaderData, Root, UsersPage} from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailsPage from './routes/user-details';
import CommentsPage, { LoaderComments } from './routes/comments';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index: true,
        element: <HomePage/>
      },
      {
        path:"/users",
        loader: loader,
        element:<UsersPage/>
      },
      {
        path: "/details",
        children:[
          {
            index: true,
            element: <DetailsPage/>
          },
          {
            path:":userId",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loader: loaderData as any,
            element:<UserDetailsPage/>,
            children:[
              {
                path:"posts",
                children:[
                  {
                    index: true,
                    path: ":postId",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    loader: LoaderComments as any,
                    element: <CommentsPage/>
                  }
                ]
              }
            ]
          },
          
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
