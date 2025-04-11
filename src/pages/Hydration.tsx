import { useState, useEffect } from 'react';

export default function Hydration() {
  // サーバーサイドとクライアントサイドの両方で実行される
  console.log('コンポーネントがレンダリングされました');

  // サーバー時間 - コンポーネントが初期化された時点の時間
  const [serverTime] = useState(new Date().toISOString());

  // クライアント時間 - useEffectで更新される時間
  const [clientTime, setClientTime] = useState<string>('Loading...');

  // ハイドレーション状態を追跡
  const [hydrated, setHydrated] = useState(false);

  // カウンター状態
  const [count, setCount] = useState(0);

  // ハイドレーション前後の表示内容
  const [visibleContent, setVisibleContent] = useState<string[]>([
    'これはサーバーとクライアントの両方で表示されるコンテンツです',
  ]);

  // ハイドレーションの段階を追跡
  const [hydrationStage, setHydrationStage] = useState('初期レンダリング');

  // ハイドレーション完了までの時間を計測
  const [hydrationTime, setHydrationTime] = useState<number | null>(null);

  // ハイドレーション遅延時間（ミリ秒）
  const [delayTime, setDelayTime] = useState(3000); // デフォルトは3秒

  // 手動ハイドレーションモード
  const [manualMode, setManualMode] = useState(true);

  // 遅延時間を変更する関数
  const changeDelayTime = (newDelay: number) => {
    // ハイドレーション前のみ変更可能
    if (!hydrated) {
      setDelayTime(newDelay);
    }
  };

  // 手動ハイドレーションを実行する関数
  const triggerManualHydration = () => {
    if (!hydrated && manualMode) {
      console.log('手動ハイドレーションを実行します');
      performHydration();
    }
  };

  // ハイドレーションを実行する関数
  const performHydration = () => {
    const startTime = performance.now();
    console.log('useEffect実行: ハイドレーションが開始されました');

    // ハイドレーション完了を示す
    setHydrated(true);
    setHydrationStage('ハイドレーション完了');

    // ハイドレーション時間を計算
    const endTime = performance.now();
    setHydrationTime(endTime - startTime);

    // クライアント時間を設定
    setClientTime(new Date().toISOString());

    // コンテンツを追加
    setVisibleContent((prev) => [
      ...prev,
      'これはクライアントサイドでのみ表示されるコンテンツです（ハイドレーション後）',
    ]);

    // 1秒ごとにクライアント時間を更新
    const timer = setInterval(() => {
      setClientTime(new Date().toISOString());
    }, 1000);

    return () => {
      console.log('クリーンアップ関数実行: コンポーネントがアンマウントされました');
      clearInterval(timer);
    };
  };

  // 自動ハイドレーション（遅延あり）
  useEffect(() => {
    if (manualMode) {
      // 手動モードの場合は自動ハイドレーションを行わない
      console.log(
        '手動ハイドレーションモードが有効です。ボタンをクリックしてハイドレーションを開始してください。'
      );
      return;
    }

    console.log(`${delayTime}ミリ秒後にハイドレーションを開始します...`);

    // 指定された時間だけハイドレーションを遅延
    const hydrationTimer = setTimeout(() => {
      performHydration();
    }, delayTime);

    return () => clearTimeout(hydrationTimer);
  }, [delayTime, manualMode]);

  // ハイドレーション後のみ実行される関数
  const handleClick = () => {
    if (!hydrated) {
      console.log('ハイドレーション前: クリックイベントは機能しません');
      return;
    }

    console.log('ハイドレーション後: クリックイベントが機能しています');
    setCount((prev) => prev + 1);
    setHydrationStage('インタラクション発生');
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        ハイドレーション（Hydration）の仕組み
      </h1>

      {/* ハイドレーションの説明セクション */}
      <div
        style={{
          backgroundColor: '#fff3e0',
          padding: '15px',
          borderRadius: '6px',
          border: '1px solid #ffe0b2',
          marginBottom: '20px',
        }}
      >
        <h2>ハイドレーションとは</h2>
        <p>
          ハイドレーション（Hydration）は、サーバーサイドレンダリング（SSR）とクライアントサイドレンダリング（CSR）を
          組み合わせたアプリケーションにおける重要なプロセスです。簡単に言うと、
          <strong>
            サーバーで生成された静的なHTMLに、
            クライアント側でJavaScriptによるインタラクティブ性を「注入」する
          </strong>
          プロセスです。
        </p>

        <h3>ハイドレーションの流れ</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li style={{ margin: '10px 0' }}>
            <strong>サーバーサイドレンダリング（SSR）:</strong>{' '}
            サーバーがReactコンポーネントを実行し、
            静的なHTMLを生成します。このHTMLには初期状態（サーバー時間など）が含まれています。
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>初期HTML配信:</strong> ブラウザに静的なHTMLが送信され、ユーザーはJavaScriptが
            読み込まれる前でもコンテンツを見ることができます。
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>JavaScriptの読み込み:</strong> ブラウザがReactのJavaScriptコードを読み込みます。
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>ハイドレーション処理:</strong>{' '}
            Reactが既存のHTMLを認識し、仮想DOMと実際のDOMを同期させます。
            この時点で、イベントリスナー（onClick等）が静的なHTMLに「取り付けられ」ます。
          </li>
          <li style={{ margin: '10px 0' }}>
            <strong>インタラクティブ化:</strong>{' '}
            ハイドレーションが完了すると、アプリケーションは完全に
            インタラクティブになり、ユーザーはボタンをクリックしたり、フォームに入力したりできるようになります。
          </li>
        </ol>

        <h3>ハイドレーションの比喩</h3>
        <p>ハイドレーションは「乾いたスポンジに水を注入する」ようなものです：</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>乾いたスポンジ</strong> = サーバーから送られてきた静的なHTML
          </li>
          <li>
            <strong>水</strong> = JavaScriptによるインタラクティブ性
          </li>
          <li>
            <strong>水を含んだスポンジ</strong> = 完全に機能するインタラクティブなアプリケーション
          </li>
        </ul>

        <div
          style={{
            backgroundColor: '#fffde7',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '15px',
            borderLeft: '4px solid #ffd54f',
          }}
        >
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>注意:</strong> 現在のアプリケーションはクライアントサイドレンダリング (CSR)
            のみで動作しているため、
            厳密には「ハイドレーション」ではなく「初期レンダリング」が行われています。
          </p>
          <p style={{ margin: '0' }}>
            真のハイドレーションを体験するには、サーバーサイドレンダリング (SSR)
            を実装する必要があります。
          </p>
        </div>
      </div>

      {/* ハイドレーションデモセクション */}
      <div
        style={{
          backgroundColor: '#e8f5e9',
          padding: '15px',
          borderRadius: '6px',
          border: '1px solid #c8e6c9',
          marginBottom: '20px',
        }}
      >
        <h2>ハイドレーションのデモ</h2>
        <p>
          以下のデモでは、ハイドレーションプロセスを視覚的に確認できます。
          ハイドレーション前後での動作の違いや、状態の変化を観察してください。
        </p>

        {/* ハイドレーション設定パネル */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#e0f7fa',
            borderRadius: '6px',
            marginBottom: '20px',
            display: hydrated ? 'none' : 'block', // ハイドレーション後は非表示
          }}
        >
          <h3>ハイドレーション設定</h3>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                checked={manualMode}
                onChange={() => setManualMode(!manualMode)}
                disabled={hydrated}
              />{' '}
              手動ハイドレーションモード
            </label>
            <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 0 20px' }}>
              有効にすると、ボタンをクリックするまでハイドレーションが開始されません。
            </p>
          </div>

          {!manualMode && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                遅延時間: {delayTime}ミリ秒
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1000, 3000, 5000, 10000].map((time) => (
                  <button
                    key={time}
                    onClick={() => changeDelayTime(time)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: delayTime === time ? '#26a69a' : '#e0e0e0',
                      color: delayTime === time ? 'white' : 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    disabled={hydrated}
                  >
                    {time / 1000}秒
                  </button>
                ))}
              </div>
            </div>
          )}

          {manualMode && (
            <button
              onClick={triggerManualHydration}
              style={{
                padding: '10px 15px',
                backgroundColor: '#26a69a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              disabled={hydrated}
            >
              ハイドレーションを開始
            </button>
          )}
        </div>

        {/* ハイドレーション状態表示 */}
        <div
          style={{
            padding: '15px',
            backgroundColor: hydrated ? '#e6ffe6' : '#ffe6e6',
            borderRadius: '6px',
            marginBottom: '20px',
            transition: 'background-color 0.5s ease',
          }}
        >
          <h3>現在の状態</h3>
          <p>
            <strong>ハイドレーション状態:</strong> {hydrated ? '完了' : '未完了'}
          </p>
          <p>
            <strong>ハイドレーション段階:</strong> {hydrationStage}
          </p>
          {hydrationTime !== null && (
            <p>
              <strong>ハイドレーション所要時間:</strong> {hydrationTime.toFixed(2)}ms
            </p>
          )}
          {!hydrated && !manualMode && (
            <p>
              <strong>残り時間:</strong> <DelayCountdown delayTime={delayTime} />
            </p>
          )}
        </div>

        {/* 時間比較 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>時間比較</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>サーバー時間</h4>
              <p style={{ fontSize: '14px', color: '#777' }}>
                初期レンダリング時に設定され、変化しません
                <span
                  style={{
                    display: 'block',
                    marginTop: '5px',
                    fontSize: '13px',
                    color: '#666',
                    fontStyle: 'italic',
                    backgroundColor: '#f9f9f9',
                    padding: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <strong>なぜ？</strong>
                  <br />
                  これは<strong>JavaScriptが必要ない部分</strong>
                  です。HTMLが読み込まれた時点で表示される静的な値で、
                  JavaScriptが実行されなくても表示されます。実際のSSR環境では、これはサーバー側で生成された時間になります。
                  現在のCSR環境では、初期レンダリング時の時間を示しています。
                </span>
              </p>
              <p
                style={{
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                {serverTime}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>クライアント時間</h4>
              <p style={{ fontSize: '14px', color: '#777' }}>
                ハイドレーション後に設定され、1秒ごとに更新
                <span
                  style={{
                    display: 'block',
                    marginTop: '5px',
                    fontSize: '13px',
                    color: '#666',
                    fontStyle: 'italic',
                    backgroundColor: '#f9f9f9',
                    padding: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <strong>なぜ？</strong>
                  <br />
                  これは<strong>JavaScriptが必要な部分</strong>
                  です。useEffect内のコードはJavaScriptが実行されて初めて動作します。
                  setIntervalを使って1秒ごとに更新されるため、JavaScriptが動作していることを視覚的に確認できます。
                  ハイドレーション前は機能せず、ハイドレーション後に初めて機能し始めます。
                </span>
              </p>
              <p
                style={{
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                {clientTime}
              </p>
            </div>
          </div>
        </div>

        {/* インタラクティブ要素 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>インタラクティブ要素</h3>
          <p>
            このボタンはハイドレーション後にのみ機能します。
            <span
              style={{
                display: 'block',
                marginTop: '5px',
                fontSize: '13px',
                color: '#666',
                fontStyle: 'italic',
                backgroundColor: '#f9f9f9',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              <strong>なぜ？</strong>
              <br />
              ボタンのクリックイベント（onClick）は<strong>JavaScriptが必要な機能</strong>です。
              HTMLだけでは見た目のボタンは表示できますが、クリックしても何も起きません。
              ハイドレーションによってJavaScriptが実行されると、ボタンにイベントリスナーが接続され、
              クリックに反応できるようになります。これがハイドレーションの本質的な役割です。
            </span>
            現在のカウント: <strong>{count}</strong>
          </p>
          <button
            onClick={handleClick}
            style={{
              backgroundColor: hydrated ? '#4CAF50' : '#cccccc',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: hydrated ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
            disabled={!hydrated}
          >
            {hydrated ? 'クリックしてカウントを増やす' : 'ハイドレーション待ち...'}
          </button>
        </div>

        {/* 表示コンテンツ */}
        <div style={{ marginBottom: '20px' }}>
          <h3>表示コンテンツ</h3>
          <ul
            style={{
              backgroundColor: '#fff',
              borderRadius: '6px',
              border: '1px solid #ddd',
              padding: '15px',
            }}
          >
            {visibleContent.map((content, index) => (
              <li
                key={index}
                style={{
                  padding: '8px',
                  backgroundColor: index === 0 ? '#f0f8ff' : '#f0fff0',
                  margin: '5px 0',
                  borderRadius: '4px',
                  borderLeft: `4px solid ${index === 0 ? '#4169e1' : '#2e8b57'}`,
                }}
              >
                {content}
                {index === 0 && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: '5px',
                      fontSize: '13px',
                      color: '#666',
                      fontStyle: 'italic',
                      backgroundColor: '#f9f9f9',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <strong>なぜ？</strong>
                    <br />
                    このテキストは<strong>JavaScriptなしでも表示できる内容</strong>です。
                    初期状態（useState）で設定されたテキストは、HTMLの一部として生成されるため、
                    JavaScriptが読み込まれる前でも表示されます。「ページのソースを表示」で確認できます。
                  </span>
                )}
                {index === 1 && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: '5px',
                      fontSize: '13px',
                      color: '#666',
                      fontStyle: 'italic',
                      backgroundColor: '#f9f9f9',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <strong>なぜ？</strong>
                    <br />
                    このテキストは<strong>JavaScriptが必要な内容</strong>です。
                    useEffect内でsetVisibleContentを使って追加されたテキストは、
                    JavaScriptが実行されて初めて表示されます。ハイドレーション前は存在せず、
                    ハイドレーション後に動的に追加されます。
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 追加情報 */}
      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '15px',
          borderRadius: '6px',
          border: '1px solid #bbdefb',
        }}
      >
        <h2>ハイドレーションに関する追加情報</h2>

        <h3>ハイドレーションの重要性</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>パフォーマンス向上:</strong>{' '}
            初期ロード時にユーザーはすぐにコンテンツを見ることができる（SSRの利点）。その後、アプリケーションはインタラクティブになる（CSRの利点）。
          </li>
          <li>
            <strong>SEO対策:</strong> 検索エンジンはHTMLコンテンツを直接クロールできる。
          </li>
          <li>
            <strong>ユーザーエクスペリエンス:</strong>{' '}
            初期表示が速く、JavaScriptが読み込まれた後はシングルページアプリケーション（SPA）として動作。
          </li>
        </ul>

        <h3>ハイドレーションに関する注意点</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>ハイドレーションミスマッチ:</strong>{' '}
            サーバーで生成されたHTMLとクライアントで生成されるHTMLが一致しない場合、Reactは警告を出し、クライアント側で再レンダリングを行う。
          </li>
          <li>
            <strong>ハイドレーション遅延:</strong>{' '}
            大きなJavaScriptバンドルの場合、ハイドレーションが完了するまでに時間がかかる。この間、ユーザーはコンテンツを見ることはできるが、インタラクションはできない。
          </li>
          <li>
            <strong>選択的ハイドレーション:</strong> React
            18では、アプリケーションの一部を先にハイドレーションする「選択的ハイドレーション」が導入された。これにより、重要なUI部分を優先的にインタラクティブにできる。
          </li>
        </ul>
      </div>
    </div>
  );
}

// カウントダウンコンポーネント
function DelayCountdown({ delayTime }: { delayTime: number }) {
  const [remainingTime, setRemainingTime] = useState(delayTime);

  useEffect(() => {
    // 遅延時間が変更されたら残り時間をリセット
    setRemainingTime(delayTime);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 100;
        return newTime < 0 ? 0 : newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [delayTime]);

  return <span>{(remainingTime / 1000).toFixed(1)}秒</span>;
}
