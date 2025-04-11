import { useState, useEffect, useRef } from 'react';

export default function Page() {
  // 初回レンダリング時のみログを出力するための参照
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    console.log(
      'レンダリング環境:',
      typeof window !== 'undefined' ? 'クライアントサイド' : 'サーバーサイド'
    );
    console.log(
      'window オブジェクト:',
      typeof window !== 'undefined' ? '存在します' : '存在しません'
    );

    // クライアントサイドでのみ参照を更新
    if (typeof window !== 'undefined') {
      isFirstRender.current = false;
    }
  }

  const isClient = typeof window !== 'undefined';
  const [clientTime, setClientTime] = useState<string>('Loading...');
  const [serverTime] = useState<string>(new Date().toISOString());
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // 安全にwindowにアクセスする関数
  function getWindowDimension(dimension: 'width' | 'height'): number | null {
    try {
      return dimension === 'width' ? window.innerWidth : window.innerHeight;
    } catch (e) {
      console.error('windowオブジェクトにアクセスできません（サーバーサイド）');
      return null;
    }
  }

  useEffect(() => {
    // このコードブロックはクライアントサイドでのみ実行される
    console.log('useEffect実行: クライアントサイドでのみ実行されます');
    setHydrated(true);

    // クライアント時間を設定
    setClientTime(new Date().toISOString());

    // windowオブジェクトを使用
    setWindowWidth(getWindowDimension('width'));

    // 時間を更新するタイマー
    const timer = setInterval(() => {
      setClientTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // カウンターを増加させる関数
  const incrementCount = () => {
    console.log('ボタンがクリックされました（クライアントサイドのみ）');
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1000px',
        width: '100%',
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
            background: hydrated ? '#e6ffe6' : '#ffe6e6',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
        >
          <p>
            <strong>ハイドレーション状態:</strong>{' '}
            {hydrated
              ? 'ハイドレーション完了（クライアントサイド）'
              : 'ハイドレーション前（初期レンダリング）'}
          </p>
        </div>

        <p>
          <strong>サーバー時間 (初期レンダリング時):</strong> {serverTime}
        </p>
        <p>
          <strong>クライアント時間 (1秒ごとに更新):</strong> {clientTime}
        </p>

        {/* 条件付きレンダリングでwindowの存在を確認 */}
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

        <div
          style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}
        >
          <p>
            <strong>確認方法:</strong>
          </p>
          <ol style={{ paddingLeft: '20px' }}>
            <li>ボタンをクリックしてカウントを増やす</li>
            <li>右クリック → 「ページのソースを表示」を選択</li>
            <li>
              HTMLソース内にはカウンター値を含むアプリケーションのコンテンツ自体が存在しないことを確認（CSRの特徴）
            </li>
          </ol>
        </div>
      </div>

      <div
        style={{
          background: '#e8f4fd',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h2>SSRとCSRの違いを確認する方法</h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li>
            <strong>コンソールログを確認:</strong> ブラウザの開発者ツールでコンソールを開き、
            「レンダリング環境」と「window オブジェクト」のログを確認してください。
            サーバーサイドとクライアントサイドで異なるメッセージが表示されます。
          </li>
          <li>
            <strong>ネットワークを遅くして観察:</strong> 開発者ツール → Network → Throttling で
            「Slow 3G」などを選択し、ページを再読み込みします。JavaScriptが読み込まれる前に
            ボタンをクリックしても反応がないことを確認できます。
          </li>
          <li>
            <strong>ページソースを確認:</strong> 右クリック → 「ページのソースを表示」で、
            サーバーから送信された初期HTMLを確認できます。クライアントサイドでの変更は
            ここには反映されません。
          </li>
        </ul>
      </div>

      <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '5px' }}>
        <h2>SSRとCSRの主な違い</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#ffcc80' }}>
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
