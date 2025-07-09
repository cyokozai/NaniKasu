import { Hono } from 'hono';
import { eq, desc, and } from 'drizzle-orm';
import { db, itemLogs } from '../db';
import { authMiddleware, requireRoles } from '../middleware/auth';

const app = new Hono();

// 全エンドポイントで認証を要求
app.use('*', authMiddleware);

// GET /item_logs - 備品ログ一覧を取得
app.get('/', requireRoles(['admin', 'manager']), async (c) => {
  try {
    const itemId = c.req.query('itemId');
    const userId = c.req.query('userId');
    
    let query = db.select().from(itemLogs);
    
    // フィルタリング条件を構築
    const conditions = [];
    if (itemId) {
      conditions.push(eq(itemLogs.item_id, itemId));
    }
    if (userId) {
      conditions.push(eq(itemLogs.user_id, userId));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const logs = await query.orderBy(desc(itemLogs.timestamp));
    return c.json(logs);
  } catch (error) {
    console.error('ログ一覧取得エラー:', error);
    return c.json({ message: 'ログ一覧の取得に失敗しました' }, 500);
  }
});

export default app; 