# React SSR + Hydration デモ

React Server-Side Rendering (SSR) と Hydration の実装例です。

## セットアップ

```bash
# 依存関係のインストール
yarn install

# 開発サーバーの起動
yarn dev

# 本番ビルド
yarn build

# 本番サーバーの起動
yarn start
```

## 技術スタック

- **React 18**
- **TypeScript**
- **Vite**
- **Express**: サーバーサイドレンダリング用のサーバー
- **React DOM**: サーバーサイドレンダリングとHydration

### 動作の流れ

1. サーバーでReactコンポーネントをHTMLにレンダリング
2. クライアントにHTMLを送信
3. クライアントでJavaScriptが読み込まれる
4. `hydrateRoot`により、既存のHTMLにReactの機能を追加
5. インタラクティブな機能が有効になる

## ファイル構成

```
src/
├── App.tsx              # メインアプリケーション
├── main.tsx             # クライアントサイドエントリーポイント
├── components/
│   ├── Counter.tsx      # カウンターコンポーネント
│   ├── ToggleButton.tsx # トグルボタンコンポーネント
│   └── Sidebar.tsx      # サイドバーコンポーネント
└── App.css              # スタイルシート
```

## 開発

```bash
# 開発モードでサーバーを起動
yarn dev

# コードの品質チェック
yarn lint

# コードのフォーマット
yarn format
```

## デプロイ

GHAによりVercelへ自動デプロイされます
