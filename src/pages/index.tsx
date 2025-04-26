import { useState, useEffect } from 'react';

export default function Page() {
  // サーバーとクライアントで安全に動作する状態
  const [isClient, setIsClient] = useState(false);
  const [clientTime, setClientTime] = useState<string>('Loading...');
  const [serverTime] = useState<string>(new Date().toISOString());
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // クライアントサイドでのみ実行される処理
  useEffect(() => {
    // クライアントサイドであることをマーク
    setIsClient(true);

    // クライアント時間を設定
    setClientTime(new Date().toISOString());

    // windowオブジェクトを安全に使用
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      // 時間を更新するタイマー
      const timer = setInterval(() => {
        setClientTime(new Date().toISOString());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  // カウンターを増加させる関数
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        SSRとCSRの違いを確認するテストページ
      </h1>

      <div
        style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h2>現在の実行環境</h2>
        <div
          style={{
            padding: '10px',
            background: isClient ? '#e6ffe6' : '#ffe6e6',
            borderRadius: '4px',
          }}
        >
          <p>
            <strong>レンダリング状態:</strong>{' '}
            {isClient
              ? 'クライアントサイド (ハイドレーション完了)'
              : 'サーバーサイド (初期レンダリング)'}
          </p>
        </div>

        <p>
          <strong>サーバー時間 (初期レンダリング時):</strong> {serverTime}
        </p>
        <p>
          <strong>クライアント時間 (1秒ごとに更新):</strong> {clientTime}
        </p>

        {isClient ? (
          <p>
            <strong>ブラウザの幅:</strong> {windowWidth}px (クライアントサイドで取得)
          </p>
        ) : (
          <p>
            <strong>ブラウザの幅:</strong> サーバーサイドでは取得できません
          </p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>インタラクティブな要素のテスト</h2>
        <p>
          <strong>カウンター値:</strong> {count}
        </p>
        <button
          onClick={incrementCount}
          style={{
            background: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          カウントを増加 (+1)
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            background: '#f44336',
            border: 'none',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          リセット
        </button>
      </div>

      <div style={{ background: '#e8f4fd', padding: '15px', borderRadius: '5px' }}>
        <h2>SSRとCSRの主な違い</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#bbdefb' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                機能/動作
              </th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                サーバーサイドレンダリング (SSR)
              </th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                クライアントサイドレンダリング (CSR)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>window オブジェクト</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>存在しない</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>存在する</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>useEffect</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>実行されない</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>実行される</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>イベントハンドラ</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>機能しない</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>機能する</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>初期HTML</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>サーバーで生成</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>最小限のHTML（ほぼ空）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Page };
