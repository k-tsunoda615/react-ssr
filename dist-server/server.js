import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { renderToString } from "react-dom/server";
import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState } from "react";
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
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { children: "React SSR + Hydration デモ" }),
      /* @__PURE__ */ jsx("p", { children: "このページはサーバーサイドでレンダリングされ、クライアントサイドでHydrationされています" })
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "hydration-info", children: [
        /* @__PURE__ */ jsx("h2", { children: "Hydrationとは？" }),
        /* @__PURE__ */ jsx("p", { children: "Hydrationは、サーバーサイドでレンダリングされたHTMLにJavaScriptの機能を追加するプロセスです。 これにより、静的だったHTMLがインタラクティブになります。" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "ページロード時にHTMLが表示される（SSR）" }),
          /* @__PURE__ */ jsx("li", { children: "JavaScriptが読み込まれた後、イベントハンドラーが有効になる（Hydration）" }),
          /* @__PURE__ */ jsx("li", { children: "ユーザーは即座にコンテンツを見ることができる" }),
          /* @__PURE__ */ jsx("li", { children: "インタラクティブな機能も正常に動作する" })
        ] }),
        /* @__PURE__ */ jsx("img", { src: "/assets/codediagram20250628.png", alt: "Hydration" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "interactive-components", children: [
        /* @__PURE__ */ jsx("h2", { children: "インタラクティブなコンポーネント" }),
        /* @__PURE__ */ jsxs("div", { className: "components-grid", children: [
          /* @__PURE__ */ jsx(Counter, {}),
          /* @__PURE__ */ jsx(ToggleButton, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx(Sidebar, {})
    ] }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("p", { children: "Hydrationなしの純粋なSSRでは、これらのボタンはクリックしても反応しません" }) })
  ] });
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
console.log("Server initialization started");
app.get("/", (req, res) => {
  console.log("Request received:", req.url);
  try {
    const appHtml = renderToString(React.createElement(App, null));
    console.log("Rendered HTML:", appHtml);
    const template = fs.readFileSync(path.resolve(__dirname, "..", "dist", "index.html"), "utf-8");
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    res.send(html);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send(`Internal Server Error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
});
app.use(express.static("dist"));
app.listen(3e3, () => {
  console.log("Server started: http://localhost:3000");
});
