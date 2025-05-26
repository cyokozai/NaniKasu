# NaniKasu

NaniKasu aims to transform Inventory management from a 'troublesome task' into a 'smart, on-site experience'!

## Environment

```planetext
my-app/
├── apps/
│   ├── frontend/             # React + Vite (Bun or Node 対応可)
│   │   ├── src/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── backend/              # Hono + Cloudflare Workers
│       ├── src/
│       │   └── index.ts      # Hono アプリ本体
│       ├── wrangler.toml     # ← 🔥 ここに置く（Cloudflare Workerの定義）
│       └── package.json
│
├── package.json              # （必要なら）ワークスペース共通設定
├── turbo.json                # Turborepo 設定（任意）
└── tsconfig.json             # 共通のTypeScript設定（optional）
```
