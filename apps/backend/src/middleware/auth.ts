import { Context, Next } from 'hono';
import { jwtVerify } from 'jose';
import { z } from 'zod';

// Supabase JWTのペイロード型
interface SupabaseJWTPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  role: string;
  aal: string;
  amr: Array<{ method: string; timestamp: number }>;
  session_id: string;
}

// ユーザー情報の型
export interface User {
  id: string;
  email: string;
  role: string;
}

// 認証ミドルウェア
export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: '認証が必要です' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    // Supabase JWTの検証
    // 注意: 本番環境では適切なJWT_SECRETを使用してください
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET || 'your-supabase-jwt-secret');
    
    const { payload } = await jwtVerify(token, secret);
    const supabasePayload = payload as SupabaseJWTPayload;

    // ユーザー情報をコンテキストに設定
    c.set('user', {
      id: supabasePayload.sub,
      email: supabasePayload.email,
      role: supabasePayload.role || 'user'
    });

    await next();
  } catch (error) {
    console.error('JWT検証エラー:', error);
    return c.json({ message: '無効なトークンです' }, 401);
  }
}

// RBACミドルウェア
export function requireRoles(allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as User;
    
    if (!user) {
      return c.json({ message: '認証が必要です' }, 401);
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return c.json({ message: '権限が不足しています' }, 403);
    }

    await next();
  };
}

// ユーザー情報を取得するヘルパー関数
export function getUser(c: Context): User {
  return c.get('user') as User;
}

// リクエストバリデーション用のスキーマ
export const createItemSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  description: z.string().optional(),
  quantity: z.number().int().positive('数量は正の整数である必要があります'),
  owner_id: z.string().uuid().optional(),
  current_holder_id: z.string().uuid().optional(),
  location: z.string().optional(),
  status: z.enum(['available', 'borrowed', 'maintenance']).optional(),
  category_id: z.string().uuid().optional(),
  custom_fields: z.record(z.any()).optional(),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  current_holder_id: z.string().uuid().optional(),
  location: z.string().optional(),
  status: z.enum(['available', 'borrowed', 'maintenance']).optional(),
  custom_fields: z.record(z.any()).optional(),
}); 