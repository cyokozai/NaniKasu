import { Hono } from "hono";
import { cors } from "hono/cors";
import itemsRouter from "./routes/items";
import itemLogsRouter from "./routes/item-logs";

const app = new Hono();

// CORS設定
app.use("*", cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // フロントエンドの開発サーバー
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// ヘルスチェック
app.get("/health", (c) => {
  return c.json({ status: "ok", message: "NaniKasu API is running" });
});

// APIルート
app.route("/items", itemsRouter);
app.route("/item_logs", itemLogsRouter);

// 404ハンドラー
app.notFound((c) => {
  return c.json({ message: "Not Found" }, 404);
});

// エラーハンドラー
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ message: "Internal Server Error" }, 500);
});

// Cloudflare Workers用のエクスポート
export default app;
