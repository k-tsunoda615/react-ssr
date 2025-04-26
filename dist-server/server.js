import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
function Page() {
  const [isClient, setIsClient] = useState(false);
  const [clientTime, setClientTime] = useState("Loading...");
  const [serverTime] = useState((/* @__PURE__ */ new Date()).toISOString());
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    setIsClient(true);
    setClientTime((/* @__PURE__ */ new Date()).toISOString());
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const timer = setInterval(() => {
        setClientTime((/* @__PURE__ */ new Date()).toISOString());
      }, 1e3);
      return () => clearInterval(timer);
    }
  }, []);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px"
      },
      children: [
        /* @__PURE__ */ jsx("h1", { style: { color: "#333", borderBottom: "2px solid #eee", paddingBottom: "10px" }, children: "SSRとCSRの違いを確認するテストページ" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px"
            },
            children: [
              /* @__PURE__ */ jsx("h2", { children: "現在の実行環境" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    padding: "10px",
                    background: isClient ? "#e6ffe6" : "#ffe6e6",
                    borderRadius: "4px"
                  },
                  children: /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "レンダリング状態:" }),
                    " ",
                    isClient ? "クライアントサイド (ハイドレーション完了)" : "サーバーサイド (初期レンダリング)"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "サーバー時間 (初期レンダリング時):" }),
                " ",
                serverTime
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "クライアント時間 (1秒ごとに更新):" }),
                " ",
                clientTime
              ] }),
              isClient ? /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "ブラウザの幅:" }),
                " ",
                windowWidth,
                "px (クライアントサイドで取得)"
              ] }) : /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "ブラウザの幅:" }),
                " サーバーサイドでは取得できません"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { marginBottom: "20px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "インタラクティブな要素のテスト" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "カウンター値:" }),
            " ",
            count
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: incrementCount,
              style: {
                background: "#4CAF50",
                border: "none",
                color: "white",
                padding: "10px 15px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px"
              },
              children: "カウントを増加 (+1)"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCount(0),
              style: {
                background: "#f44336",
                border: "none",
                color: "white",
                padding: "10px 15px",
                borderRadius: "4px",
                cursor: "pointer"
              },
              children: "リセット"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { background: "#e8f4fd", padding: "15px", borderRadius: "5px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "SSRとCSRの主な違い" }),
          /* @__PURE__ */ jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { style: { background: "#bbdefb" }, children: [
              /* @__PURE__ */ jsx("th", { style: { padding: "8px", border: "1px solid #ddd", textAlign: "left" }, children: "機能/動作" }),
              /* @__PURE__ */ jsx("th", { style: { padding: "8px", border: "1px solid #ddd", textAlign: "left" }, children: "サーバーサイドレンダリング (SSR)" }),
              /* @__PURE__ */ jsx("th", { style: { padding: "8px", border: "1px solid #ddd", textAlign: "left" }, children: "クライアントサイドレンダリング (CSR)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "window オブジェクト" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "存在しない" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "存在する" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "useEffect" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "実行されない" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "実行される" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "イベントハンドラ" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "機能しない" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "機能する" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "初期HTML" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "サーバーで生成" }),
                /* @__PURE__ */ jsx("td", { style: { padding: "8px", border: "1px solid #ddd" }, children: "最小限のHTML（ほぼ空）" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function App() {
  return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Page, {}) }) });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3e3;
app.use(compression());
app.use(express.static(path.resolve(__dirname, "..", "dist")));
const template = fs.readFileSync(path.resolve(__dirname, "..", "dist", "index.html"), "utf-8");
app.get("*", (req, res) => {
  try {
    const appHtml = renderToString(
      React.createElement(StaticRouter, { location: req.url }, React.createElement(App))
    );
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    res.send(html);
  } catch (error) {
    console.error("Rendering error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
