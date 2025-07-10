FROM node:20 AS dev

SHELL [ "bash", "-c" ]

ENV BUN_INSTALL=/root/.bun
ENV PATH="${BUN_INSTALL}/bin:$PATH"

WORKDIR /root/apps

# 依存関係ファイルを先にコピー
COPY ./apps/frontend/package.json ./frontend/
COPY ./apps/backend/package.json ./backend/
COPY ./apps/package.json ./
COPY ./apps/turbo.json ./

# BunとTurboをインストール
RUN apt -y update && \
    apt -y install --no-install-recommends curl git bash ca-certificates && \
    curl -fsSL https://bun.sh/install | bash && \
    npm install -g turbo && \
    apt -y clean && \
    rm -rf /var/lib/apt/lists/* /tmp/*

# 依存関係をインストール
RUN cd ./frontend && bun install && \
    cd ../backend && bun install && \
    cd .. && bun install

# アプリケーションコードをコピー
COPY ./apps .

# バージョン情報を表示
RUN bun --version > versions && \
    node --version >> versions && \
    npm --version >> versions && \
    turbo --version >> versions && \
    echo "Bun, Node, NPM, and Turbo installed successfully."

CMD ["bash"]