export default function About() {
  return (
    <div className="about-page">
      <main>
        <section className="about-content">
          <h2>プロジェクト概要</h2>
          <p>このプロジェクトは、React Server-Side Rendering (SSR) と Hydration の実装例です。</p>

          <h2>技術スタック</h2>
          <ul>
            <li>React 18</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Express</li>
            <li>React DOM</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>React SSR + Hydration デモ - About ページ</p>
      </footer>
    </div>
  );
}
