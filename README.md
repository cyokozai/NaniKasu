# NaniKasu

NaniKasu aims to transform Inventory management from a 'troublesome task' into a 'smart, on-site experience'!

## スマートフォンから簡単に操作できる備品管理アプリ NaniKasu

### 解決したい課題・バグ  

大学のサークルや学生団体、ボランティアグループなどにおいて、備品管理は意外と手間のかかるトイルな作業です  
ノートパソコンやプロジェクター、工具、ケーブル類など、誰がどの備品を所有しているのか、現在誰に貸し出しているのかが分かりにくく、トラブルや紛失につながることもしばしばあります  
加えて、備品の管理をパソコンで行うシステムが多く、現場ではスマートフォンなどから操作できず不便です  
そこで、解決したい課題を以下にまとめます  

- スマホやタブレットなどの小さな画面でも簡単に操作が可能
- 備品の貸出/返却の操作が分かりやすいUI
- 誰の所有物であるかがすぐに検索できる
- 誰に貸し出しているのか？をすぐに検索できる
- 備品の返却方法などの指示を自動的に利用者に提示する（メールなど）

### どんな価値／取り組み方  

NaniKasuは、備品管理を「面倒な作業」から「現場で完結するスマートな体験」へと変えることを目指します  
スマートフォンやタブレットといった日常的なデバイスを使い、貸出・返却状況を即時に確認・記録できる仕組みを構築します  
また、貸出履歴や所有情報を一元管理することで、備品の所在不明や返却忘れといったトラブルを未然に防ぎます  
さらに、メール通知などによるリマインド機能を備えることで、利用者が責任をもって備品を扱えるような設計にします  
具体的な実装機能は以下の４つです  

- スマートフォン・タブレット対応  
  小さな画面でも操作しやすく、PCにアクセスできない場面でも対応可能
- 直感的な貸出／返却操作  
  UIをシンプルに設計し、誰でもすぐに使える操作性を実現
- 所有者・貸出先の検索機能  
  「これは誰の備品？」「今、誰が使っているの？」といった問いに即座に答えられる
- 返却方法の自動通知  
  利用者には返却期限や手順をメールなどで自動案内し、運用負担を軽減

## Environment

- techstack

    Frontend: React + Vite (Cloudflare Pages)  
    Backend: Hono (Cloudflare Workers)  
    DB: PostgreSQL (Docker) + Drizzle ORM
    Auth: Supabase Auth (JWT認証 + RBAC)  

| 判断軸      | 結論                                   |
| -------- | ------------------------------------ |
| 実装速度     | Supabase Auth + Hono + Drizzle が最速    |
| 保守性      | Supabase Auth管理画面で楽、Hono + Drizzle はシンプルコードベース |
| デプロイの容易さ | Cloudflare Pages + Workers で統一デプロイ可能 |
| 学習コスト    | Hono + Drizzle の方が簡単（特に JS/TS に慣れていれば）  |

- tree

```planetext
my-app/
└── apps/
    ├── frontend/             # React + Vite
    │   ├── src/
    │   ├── index.html
    │   ├── vite.config.ts
    │   └── package.json
    │
    ├── backend/              # Hono + Cloudflare Workers + Drizzle ORM
    │   ├── src/
    │   │   ├── index.ts
    │   │   ├── db/
    │   │   │   ├── index.ts
    │   │   │   └── schema.ts
    │   │   ├── middleware/
    │   │   │   └── auth.ts
    │   │   └── routes/
    │   │       ├── items.ts
    │   │       └── item-logs.ts
    │   ├── wrangler.toml
    │   ├── drizzle.config.ts
    │   └── package.json
    │
    ├── package.json
    └── turbo.json
```

## Design

### API

[`openapi.yaml`](apps/openapi.yaml)

### DB

※Supabase Auth に依存するので、id, email, display_name 等を持つだけでOKです

#### `items`

| カテゴリ | アイテム名  | 内容   | 在庫数 | 所有権 | 現在の利用者/管理者 | 現在の備品の所在地 | ステータス | (コンテナ) | (長さ) | 備考       |
| -------- | ----------- | ------ | ------ | ------ | ------------------- | ------------------ | ---------- | ---------- | ------ | ---------- |
| ケーブル | DMXケーブル | 本体×1 | 1      | MO     | cyokozai            | 埼玉県さいたま市   | 在庫       | コンテナ#2 | 5m     | 被覆: 赤色 |

| カラム名                | 型         | 説明                                       |
| ------------------- | --------- | ---------------------------------------- |
| `id`                | UUID (PK) | 備品ID                                     |
| `name`              | TEXT      | アイテム名                                    |
| `description`       | TEXT      | 内容・説明                                    |
| `quantity`          | INTEGER   | 在庫数                                      |
| `owner_id`          | UUID (FK) | 所有者（`users`テーブル）                         |
| `current_holder_id` | UUID (FK) | 現在の管理者／使用者                               |
| `location`          | TEXT      | 現在の所在地                                   |
| `status`            | TEXT      | `available` / `borrowed` / `maintenance` |
| `category_id`       | UUID (FK) | カテゴリID（`categories`）                     |
| `custom_fields`     | JSONB     | カスタム属性（柔軟に拡張可能）                          |
| `created_at`        | TIMESTAMP | 登録日時                                     |
| `updated_at`        | TIMESTAMP | 最終更新日時                                   |

- `custom_fields`

以下のように JSONB に格納すれば、アイテムごとに異なる属性も扱えます。

```json
{
  "container": "コンテナ#2",
  "length": "5m",
  "coating": "赤色"
}
```

#### `categories`

| カラム名   | 型         | 説明        |
| ------ | --------- | --------- |
| `id`   | UUID (PK) | カテゴリID    |
| `name` | TEXT      | カテゴリ名     |
| `slug` | TEXT      | URLスラッグなど |

#### `item_logs`

| カラム名        | 型         | 説明                                     |
| ----------- | --------- | -------------------------------------- |
| `id`        | UUID (PK) | ログID                                   |
| `item_id`   | UUID (FK) | 備品ID                                   |
| `user_id`   | UUID (FK) | 操作したユーザー                               |
| `action`    | TEXT      | `borrowed` / `returned` / `updated` など |
| `note`      | TEXT      | 備考                                     |
| `timestamp` | TIMESTAMP | 操作時刻                                   |
