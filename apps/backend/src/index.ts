import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// CORS設定
app.use("*", cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // フロントエンドの開発サーバー
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// ヘルスチェック
app.get("/api/health", (c) => {
  return c.json({ status: "ok", message: "NaniKasu API is running" });
});

// 認証関連のAPI
app.post("/api/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // ダミー認証（実際の実装ではSupabase認証を使用）
    if (email && password) {
      return c.json({
        success: true,
        user: {
          id: "dummy-user-id",
          email: email,
          display_name: "テストユーザー"
        },
        token: "dummy-jwt-token"
      }, 200);
    } else {
      return c.json({
        success: false,
        message: "メールアドレスとパスワードを入力してください"
      }, 400);
    }
  } catch (error) {
    return c.json({
      success: false,
      message: "リクエストの処理中にエラーが発生しました"
    }, 500);
  }
});

app.post("/api/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // ダミーサインアップ（実際の実装ではSupabase認証を使用）
    if (email && password) {
      return c.json({
        success: true,
        user: {
          id: "dummy-user-id",
          email: email,
          display_name: "新規ユーザー"
        },
        token: "dummy-jwt-token"
      }, 201);
    } else {
      return c.json({
        success: false,
        message: "メールアドレスとパスワードを入力してください"
      }, 400);
    }
  } catch (error) {
    return c.json({
      success: false,
      message: "リクエストの処理中にエラーが発生しました"
    }, 500);
  }
});

// 備品管理API（ダミー）
app.get("/api/items", (c) => {
  // ダミーの備品データ
  const items = [
    {
      id: "1",
      name: "DMXケーブル",
      description: "本体×1",
      quantity: 1,
      owner_id: "owner-1",
      current_holder_id: "user-1",
      location: "埼玉県さいたま市",
      status: "available",
      category_id: "cable",
      created_at: new Date().toISOString()
    }
  ];

  return c.json({ items });
});

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
