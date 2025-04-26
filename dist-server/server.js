import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
import React from "react";
function App() {
  return /* @__PURE__ */ jsx("h1", { children: "Hello" });
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
