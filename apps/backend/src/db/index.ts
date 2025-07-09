import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// データベース接続設定
const connectionString = process.env.DATABASE_URL || 'postgres://nanikasu:nanikasu_password@localhost:5432/nanikasu';

// PostgreSQLクライアント
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Drizzle ORMクライアント
export const db = drizzle(client, { schema });

// 型定義のエクスポート
export * from './schema'; 