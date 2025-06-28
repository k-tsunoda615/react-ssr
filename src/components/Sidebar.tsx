import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : '☰'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>サイドバー</h3>
        <nav>
          <ul>
            <li>
              <a href="#home">ホーム</a>
            </li>
            <li>
              <a href="#about">概要</a>
            </li>
            <li>
              <a href="#contact">お問い合わせ</a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}
