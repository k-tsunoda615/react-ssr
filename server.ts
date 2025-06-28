import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter } from 'react-router-dom/server';
import { RouterProvider } from 'react-router-dom';
import { routes } from './src/routes';
import React from 'react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ビルド時は dist-server から dist へのパスを計算
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();

console.log('Server initialization started');
console.log('Server directory:', __dirname);
console.log('Dist directory:', distPath);

// 静的ファイルの提供（Reactアプリケーションのルーティングより前に配置）
app.use('/assets', express.static(path.join(distPath, 'assets')));
app.use('/vite.svg', express.static(path.join(distPath, 'vite.svg')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));

// Reactアプリケーションのルートハンドラ（静的ファイル以外のすべてのリクエスト）
app.get('*', async (req, res) => {
  console.log('Request received:', req.url);

  // 静的ファイルの場合は処理しない
  // ブラウザが画像をリクエストしてReact Router が画像URLを解析しようとするため
  if (
    req.url.startsWith('/assets/') ||
    req.url.startsWith('/src/') ||
    req.url.endsWith('.js') ||
    req.url.endsWith('.css') ||
    req.url.endsWith('.png') ||
    req.url.endsWith('.svg') ||
    req.url.endsWith('.ico')
  ) {
    return res.status(404).send('Not found');
  }

  try {
    // StaticHandlerを作成
    const { query, dataRoutes } = createStaticHandler(routes);

    // リクエストオブジェクトを作成してクエリを実行
    const fetchRequest = new Request(`http://localhost:3000${req.url}`, {
      method: req.method,
      headers: req.headers as Record<string, string>,
    });

    const context = await query(fetchRequest);

    if (context instanceof Response) {
      throw context;
    }

    // StaticRouterを作成
    const router = createStaticRouter(dataRoutes, context);

    // ReactをHTMLにレンダリング
    const html = renderToString(React.createElement(RouterProvider, { router }));

    // ルーターの状態からloaderDataを取得
    const hydrationData = router.state.loaderData || {};

    // テンプレートファイルを読み込む
    const templatePath = path.join(distPath, 'index.html');
    console.log('Reading template from:', templatePath);

    const template = fs.readFileSync(templatePath, 'utf-8');

    // HTMLを構築（ハイドレーションデータとCSSを含む）
    const finalHtml = template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(
        '</head>',
        `<script>window.__RRR_DATA__ = ${JSON.stringify(hydrationData)};</script></head>`
      );

    res.send(finalHtml);
  } catch (error: unknown) {
    console.error('SSR Error:', error);
    res
      .status(500)
      .send(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000');
});
