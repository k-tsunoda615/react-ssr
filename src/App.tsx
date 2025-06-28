import Counter from './components/Counter';
import ToggleButton from './components/ToggleButton';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>React SSR + Hydration デモ</h1>
        <p>
          このページはサーバーサイドでレンダリングされ、クライアントサイドでHydrationされています
        </p>
      </header>

      <main>
        <section className="hydration-info">
          <h2>Hydrationとは？</h2>
          <p>
            Hydrationは、サーバーサイドでレンダリングされたHTMLにJavaScriptの機能を追加するプロセスです。
            これにより、静的だったHTMLがインタラクティブになります。
          </p>
          <ul>
            <li>ページロード時にHTMLが表示される（SSR）</li>
            <li>JavaScriptが読み込まれた後、イベントハンドラーが有効になる（Hydration）</li>
            <li>ユーザーは即座にコンテンツを見ることができる</li>
            <li>インタラクティブな機能も正常に動作する</li>
          </ul>
          <h2>ビルド→デプロイ→SSR→ハイドレーションの流れ</h2>
          <img src="/src/assets/codediagram20250628.png" alt="Hydration" width="100%" />
        </section>

        <section className="interactive-components">
          <h2>インタラクティブなコンポーネント</h2>
          <div className="components-grid">
            <Counter />
            <ToggleButton />
          </div>
        </section>

        <Sidebar />
      </main>

      <footer>
        <p>Hydrationなしの純粋なSSRでは、これらのボタンはクリックしても反応しません</p>
      </footer>
    </div>
  );
}
