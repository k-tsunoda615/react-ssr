import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import './App.css';

// サーバーから埋め込まれたハイドレーションデータを取得
const hydrationData = (window as any).__RRR_DATA__;

// クライアント用のRouterを作成
const router = createBrowserRouter(routes, {
  // サーバーサイドのloader結果があれば、初期状態として設定
  hydrationData: hydrationData,
});

console.log('Client hydration starting with data:', hydrationData);

hydrateRoot(document.getElementById('root')!, <RouterProvider router={router} />);
