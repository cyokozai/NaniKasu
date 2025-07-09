import { pgTable, uuid, text, integer, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ステータス列挙型
export const itemStatusEnum = pgEnum('item_status', ['available', 'borrowed', 'maintenance']);

// アクション列挙型
export const itemActionEnum = pgEnum('item_action', ['borrowed', 'returned', 'updated', 'created', 'deleted']);

// カテゴリテーブル
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 備品テーブル
export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull().default(1),
  owner_id: uuid('owner_id').notNull(), // Supabase AuthのユーザーID
  current_holder_id: uuid('current_holder_id'), // 現在の管理者/使用者
  location: text('location'),
  status: itemStatusEnum('status').notNull().default('available'),
  category_id: uuid('category_id').references(() => categories.id),
  custom_fields: jsonb('custom_fields'), // カスタム属性（JSONB）
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 備品ログテーブル
export const itemLogs = pgTable('item_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  item_id: uuid('item_id').references(() => items.id).notNull(),
  user_id: uuid('user_id').notNull(), // 操作したユーザー
  action: itemActionEnum('action').notNull(),
  details: text('details'), // 備考
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// リレーション定義
export const categoriesRelations = relations(categories, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  category: one(categories, {
    fields: [items.category_id],
    references: [categories.id],
  }),
  logs: many(itemLogs),
}));

export const itemLogsRelations = relations(itemLogs, ({ one }) => ({
  item: one(items, {
    fields: [itemLogs.item_id],
    references: [items.id],
  }),
}));

// 型定義
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
export type UpdateItem = Partial<NewItem>;
export type ItemLog = typeof itemLogs.$inferSelect;
export type NewItemLog = typeof itemLogs.$inferInsert; 