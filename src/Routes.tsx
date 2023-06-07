import { FC } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Test from './containers/test/Test';
import EditArticle from './containers/article/EditArticle';
import CreateArticle from './containers/article/CreateArticle';
import PreviewArticle from './containers/article/PreviewArticle';
import Articles from './containers/article/Articles';
import DashboardLayout from './components/layout/DashboardLayout';
import { PATH_NAMES } from './utils/constants';
import Login from './containers/auth/Login';
import AuthLayout from './components/layout/AuthLayout';
import SignUp from './containers/auth/SignUp';
import Home from './containers/home/Home';
import LogOut from './containers/auth/LogOut';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/' + PATH_NAMES.articles.root,
        children: [
          {
            path: "",
            element: <Articles />,
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
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: PATH_NAMES.auth.login,
        element: <Login />,
      },
      {
        path: PATH_NAMES.auth.signUp,
        element: <SignUp />,
      }
    ]
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const Routes: FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Routes;
