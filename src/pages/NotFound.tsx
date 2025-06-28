import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header>
        <h1>404 - ページが見つかりません</h1>
        <p>お探しのページは存在しないか、移動された可能性があります</p>
      </header>

      <main>
        <section className="not-found-content">
          <div className="error-message">
            <h2>ページが見つかりません</h2>
            <p>
              申し訳ございませんが、お探しのページは存在しないか、
              別の場所に移動された可能性があります。
            </p>
          </div>

          <div className="navigation-links">
            <Link to="/" className="home-link">
              ホームページに戻る
            </Link>
            <Link to="/about" className="about-link">
              Aboutページを見る
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <p>React SSR + Hydration デモ - 404 エラーページ</p>
      </footer>
    </div>
  );
}
