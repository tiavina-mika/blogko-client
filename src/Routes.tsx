import { FC } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './containers/home/Home';
import EditArticle from './containers/article/EditArticle';
import CreateArticle from './containers/article/CreateArticle';
import Articles from './containers/article/Articles';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/articles",
        children: [
          {
            path: "",
            element: <Articles />,
          },
          {
            path: "ajouter",
            element: <CreateArticle />,
          },
          {
            path: "editer/:id",
            element: <EditArticle />,
          },
        ],
      },
    ]
  }
]);

const Routes: FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Routes;
