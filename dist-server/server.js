import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter } from "react-router-dom/server.mjs";
import { Link, Outlet, RouterProvider } from "react-router-dom";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
function Navigation() {
  return /* @__PURE__ */ jsx("nav", { className: "navigation", children: /* @__PURE__ */ jsxs("ul", { className: "nav-links", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "nav-link", children: "ホーム" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "nav-link", children: "About" }) })
  ] }) });
}
function Layout() {
  return /* @__PURE__ */ jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { children: "React SSR + Hydration デモ" }),
      /* @__PURE__ */ jsx("p", { children: "このページはサーバーサイドでレンダリングされ、クライアントサイドでHydrationされています" }),
      /* @__PURE__ */ jsx(Navigation, {})
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("p", { children: "Hydrationなしの純粋なSSRでは、これらのボタンはクリックしても反応しません" }) })
  ] });
}
function Counter() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "counter", children: [
    /* @__PURE__ */ jsx("h3", { children: "普通のカウンター" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "現在の値: ",
      count
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "counter-buttons", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setCount(count - 1), children: "-1" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setCount(0), children: "リセット" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setCount(count + 1), children: "+1" })
    ] })
  ] });
}
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "toggle", children: [
    /* @__PURE__ */ jsx("h3", { children: "ただのトグルボタン" }),
    /* @__PURE__ */ jsx("button", { className: `toggle-button ${isOn ? "on" : "off"}`, onClick: () => setIsOn(!isOn), children: isOn ? "ON" : "OFF" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "状態: ",
      isOn ? "有効" : "無効"
    ] })
  ] });
}
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "sidebar-container", children: [
    /* @__PURE__ */ jsx("button", { className: "sidebar-toggle", onClick: () => setIsOpen(!isOpen), children: isOpen ? "×" : "☰" }),
    /* @__PURE__ */ jsxs("div", { className: `sidebar ${isOpen ? "open" : ""}`, children: [
      /* @__PURE__ */ jsx("h3", { children: "サイドバー" }),
      /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#home", children: "ホーム" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#about", children: "概要" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "お問い合わせ" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `sidebar-overlay ${isOpen ? "visible" : ""}`,
        onClick: () => setIsOpen(false)
      }
    )
  ] });
}
const diagramImage = "/assets/codediagram20250628-B5fAJjoI.png";
function HomePage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "hydration-info", children: [
      /* @__PURE__ */ jsx("h2", { children: "Hydrationとは？" }),
      /* @__PURE__ */ jsx("p", { children: "Hydrationは、サーバーサイドでレンダリングされたHTMLにJavaScriptの機能を追加するプロセスです。 これにより、静的だったHTMLがインタラクティブになります。" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "ページロード時にHTMLが表示される（SSR）" }),
        /* @__PURE__ */ jsx("li", { children: "JavaScriptが読み込まれた後、イベントハンドラーが有効になる（Hydration）" }),
        /* @__PURE__ */ jsx("li", { children: "ユーザーは即座にコンテンツを見ることができる" }),
        /* @__PURE__ */ jsx("li", { children: "インタラクティブな機能も正常に動作する" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "ビルド→デプロイ→SSR→ハイドレーションの流れ" }),
      /* @__PURE__ */ jsx("img", { src: diagramImage, alt: "Hydration", width: "100%" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "interactive-components", children: [
      /* @__PURE__ */ jsx("h2", { children: "インタラクティブなコンポーネント" }),
      /* @__PURE__ */ jsxs("div", { className: "components-grid", children: [
        /* @__PURE__ */ jsx(Counter, {}),
        /* @__PURE__ */ jsx(ToggleButton, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx(Sidebar, {})
  ] });
}
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "about-page", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { children: "About - React SSR + Hydration デモ" }),
      /* @__PURE__ */ jsx("p", { children: "このプロジェクトについて" })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { className: "about-content", children: [
      /* @__PURE__ */ jsx("h2", { children: "プロジェクト概要" }),
      /* @__PURE__ */ jsx("p", { children: "このプロジェクトは、React Server-Side Rendering (SSR) と Hydration の実装例です。" }),
      /* @__PURE__ */ jsx("h2", { children: "技術スタック" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "React 18" }),
        /* @__PURE__ */ jsx("li", { children: "TypeScript" }),
        /* @__PURE__ */ jsx("li", { children: "Vite" }),
        /* @__PURE__ */ jsx("li", { children: "Express" }),
        /* @__PURE__ */ jsx("li", { children: "React DOM" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("p", { children: "React SSR + Hydration デモ - About ページ" }) })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "not-found-page", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { children: "404 - ページが見つかりません" }),
      /* @__PURE__ */ jsx("p", { children: "お探しのページは存在しないか、移動された可能性があります" })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { className: "not-found-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "error-message", children: [
        /* @__PURE__ */ jsx("h2", { children: "ページが見つかりません" }),
        /* @__PURE__ */ jsx("p", { children: "申し訳ございませんが、お探しのページは存在しないか、 別の場所に移動された可能性があります。" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "navigation-links", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "home-link", children: "ホームページに戻る" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "about-link", children: "Aboutページを見る" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("p", { children: "React SSR + Hydration デモ - 404 エラーページ" }) })
  ] });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(HomePage, {})
      },
      {
        path: "about",
        element: /* @__PURE__ */ jsx(About, {})
      },
      {
        path: "*",
        element: /* @__PURE__ */ jsx(NotFound, {})
      }
    ]
  }
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");
const app = express();
console.log("Server initialization started");
console.log("Server directory:", __dirname);
console.log("Dist directory:", distPath);
app.use("/assets", express.static(path.join(distPath, "assets")));
app.use("/vite.svg", express.static(path.join(distPath, "vite.svg")));
app.use("/src", express.static(path.join(__dirname, "..", "src")));
app.get("*", async (req, res) => {
  console.log("Request received:", req.url);
  if (req.url.startsWith("/assets/") || req.url.startsWith("/src/") || req.url.endsWith(".js") || req.url.endsWith(".css") || req.url.endsWith(".png") || req.url.endsWith(".svg") || req.url.endsWith(".ico")) {
    return res.status(404).send("Not found");
  }
  try {
    const { query, dataRoutes } = createStaticHandler(routes);
    const fetchRequest = new Request(`http://localhost:3000${req.url}`, {
      method: req.method,
      headers: req.headers
    });
    const context = await query(fetchRequest);
    if (context instanceof Response) {
      throw context;
    }
    const router = createStaticRouter(dataRoutes, context);
    const html = renderToString(React.createElement(RouterProvider, { router }));
    const hydrationData = router.state.loaderData || {};
    const templatePath = path.join(distPath, "index.html");
    console.log("Reading template from:", templatePath);
    const template = fs.readFileSync(templatePath, "utf-8");
    const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`).replace(
      "</head>",
      `<script>window.__RRR_DATA__ = ${JSON.stringify(hydrationData)};<\/script></head>`
    );
    res.send(finalHtml);
  } catch (error) {
    console.error("SSR Error:", error);
    res.status(500).send(`Internal Server Error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
});
app.listen(3e3, () => {
  console.log("Server started: http://localhost:3000");
});
