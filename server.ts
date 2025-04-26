import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import App from './src/App';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 圧縮ミドルウェアを使用
app.use(compression() as any);

// 静的ファイルの提供
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// HTMLテンプレートを読み込む
const template = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf-8');

// すべてのリクエストに対してSSRを実行
app.get('*', (req, res) => {
  try {
    // Reactアプリケーションをサーバーサイドでレンダリング
    const appHtml = renderToString(
      React.createElement(StaticRouter, { location: req.url }, React.createElement(App))
    );

    // テンプレートにレンダリング結果を挿入
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    res.send(html);
  } catch (error) {
    console.error('Rendering error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
