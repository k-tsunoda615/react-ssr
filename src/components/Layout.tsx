import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

/**
 * レイアウトコンポーネント
 * 全ページ共通のヘッダー、ナビゲーション、フッターを提供
 */
export default function Layout() {
  return (
    <div className="app">
      <header>
        <h1>React SSR + Hydration デモ</h1>
        <p>
          このページはサーバーサイドでレンダリングされ、クライアントサイドでHydrationされています
        </p>
        <Navigation />
      </header>

      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </main>

      <footer>
        <p>Hydrationなしの純粋なSSRでは、これらのボタンはクリックしても反応しません</p>
      </footer>
    </div>
  );
}
