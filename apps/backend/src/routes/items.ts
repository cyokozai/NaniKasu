import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { db, items, itemLogs } from '../db';
import { authMiddleware, requireRoles, getUser, createItemSchema, updateItemSchema } from '../middleware/auth';

const app = new Hono();

// 全エンドポイントで認証を要求
app.use('*', authMiddleware);

// GET /items - 備品一覧を取得
app.get('/', async (c) => {
  try {
    const allItems = await db.select().from(items).orderBy(desc(items.created_at));
    return c.json(allItems);
  } catch (error) {
    console.error('備品一覧取得エラー:', error);
    return c.json({ message: '備品一覧の取得に失敗しました' }, 500);
  }
});

// POST /items - 備品を新規作成
app.post('/', requireRoles(['admin', 'manager']), async (c) => {
  try {
    const body = await c.req.json();
    const user = getUser(c);
    
    // バリデーション
    const validatedData = createItemSchema.parse(body);
    
    // 新規備品を作成
    const newItem = await db.insert(items).values({
      ...validatedData,
      owner_id: validatedData.owner_id || user.id,
      status: validatedData.status || 'available',
    }).returning();

    // ログを作成
    await db.insert(itemLogs).values({
      item_id: newItem[0].id,
      user_id: user.id,
      action: 'created',
      details: `備品「${validatedData.name}」を作成しました`,
    });

    return c.json(newItem[0], 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('バリデーション')) {
      return c.json({ message: error.message }, 400);
    }
    console.error('備品作成エラー:', error);
    return c.json({ message: '備品の作成に失敗しました' }, 500);
  }
});

// GET /items/:itemId - 備品の詳細を取得
app.get('/:itemId', async (c) => {
  try {
    const itemId = c.req.param('itemId');
    const item = await db.select().from(items).where(eq(items.id, itemId)).limit(1);
    
    if (item.length === 0) {
      return c.json({ message: '備品が見つかりません' }, 404);
    }
    
    return c.json(item[0]);
  } catch (error) {
    console.error('備品詳細取得エラー:', error);
    return c.json({ message: '備品の詳細取得に失敗しました' }, 500);
  }
});

// PATCH /items/:itemId - 備品情報を更新
app.patch('/:itemId', requireRoles(['admin', 'manager']), async (c) => {
  try {
    const itemId = c.req.param('itemId');
    const body = await c.req.json();
    const user = getUser(c);
    
    // バリデーション
    const validatedData = updateItemSchema.parse(body);
    
    // 備品の存在確認
    const existingItem = await db.select().from(items).where(eq(items.id, itemId)).limit(1);
    if (existingItem.length === 0) {
      return c.json({ message: '備品が見つかりません' }, 404);
    }
    
    // 備品を更新
    const updatedItem = await db.update(items)
      .set({
        ...validatedData,
        updated_at: new Date(),
      })
      .where(eq(items.id, itemId))
      .returning();

    // ログを作成
    await db.insert(itemLogs).values({
      item_id: itemId,
      user_id: user.id,
      action: 'updated',
      details: `備品「${existingItem[0].name}」を更新しました`,
    });

    return c.json(updatedItem[0]);
  } catch (error) {
    if (error instanceof Error && error.message.includes('バリデーション')) {
      return c.json({ message: error.message }, 400);
    }
    console.error('備品更新エラー:', error);
    return c.json({ message: '備品の更新に失敗しました' }, 500);
  }
});

// DELETE /items/:itemId - 備品を削除
app.delete('/:itemId', requireRoles(['admin']), async (c) => {
  try {
    const itemId = c.req.param('itemId');
    const user = getUser(c);
    
    // 備品の存在確認
    const existingItem = await db.select().from(items).where(eq(items.id, itemId)).limit(1);
    if (existingItem.length === 0) {
      return c.json({ message: '備品が見つかりません' }, 404);
    }
    
    // 備品を削除
    await db.delete(items).where(eq(items.id, itemId));

    // ログを作成
    await db.insert(itemLogs).values({
      item_id: itemId,
      user_id: user.id,
      action: 'deleted',
      details: `備品「${existingItem[0].name}」を削除しました`,
    });

    return c.json({}, 204);
  } catch (error) {
    console.error('備品削除エラー:', error);
    return c.json({ message: '備品の削除に失敗しました' }, 500);
  }
});

export default app; 