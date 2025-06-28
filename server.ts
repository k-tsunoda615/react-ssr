import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import React from 'react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

console.log('Server initialization started');

// メインのルートハンドラ
app.get('/', (req, res) => {
  console.log('Request received:', req.url);
  try {
    const appHtml = renderToString(React.createElement(App, null));
    console.log('Rendered HTML:', appHtml);

    // テンプレートファイルを読み込む
    const template = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf-8');

    // クライアントサイドのJavaScriptを読み込むためのスクリプトタグを追加
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    res.send(html);
  } catch (error: unknown) {
    console.error('Error details:', error);
    res
      .status(500)
      .send(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

// 静的ファイルの提供
app.use(express.static('dist'));

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000');
});
