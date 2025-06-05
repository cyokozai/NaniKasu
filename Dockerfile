FROM node:20-alpine

RUN apk add --no-cache curl bash && \
    npm install -g wrangler turbo bun

WORKDIR /app

COPY package.json ./
COPY turbo.json ./
RUN npm install

COPY apps ./apps
WORKDIR /app/apps/frontend
RUN npm install

WORKDIR /app/apps/backend
RUN npm install

# 作業用に戻す
WORKDIR /app

# ポート開放（Vite: 5173, Wrangler: 8787）
EXPOSE 5173 8787

# デフォルトは bash（docker-compose で起動コマンドを切り替える）
CMD ["bash"]
