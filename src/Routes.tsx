import { FC } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './containers/home/Home';
import EditArticle from './containers/article/EditArticle';
import CreateArticle from './containers/article/CreateArticle';
import PreviewArticle from './containers/article/PreviewArticle';
import Articles from './containers/article/Articles';
import Layout from './components/layout/Layout';
import { PATH_NAMES } from './utils/constants';
import { onEnterArticles } from './actions/articles';

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
        path: '/' + PATH_NAMES.articles.root,
        children: [
          {
            path: "",
            element: <Articles />,
            loader: onEnterArticles
          },
          {
            path: PATH_NAMES.articles.root + "/:id",
            element: <PreviewArticle />,
          },
          {
            path: PATH_NAMES.articles.create,
            element: <CreateArticle />,
          },
          {
            path: PATH_NAMES.articles.edit + "/:id",
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
