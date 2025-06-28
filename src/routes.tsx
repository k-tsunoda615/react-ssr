import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import NotFound from './pages/NotFound';

/**
 * アプリケーションのルート定義
 * React Router v6.4のData Router機能に対応
 * サーバーとクライアントで同じ定義を使用
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
