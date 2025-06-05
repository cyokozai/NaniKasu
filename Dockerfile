FROM node:20 AS dev

SHELL [ "bash", "-c" ]

ENV BUN_INSTALL=/root/.bun
ENV PATH="${BUN_INSTALL}/bin:$PATH"

WORKDIR /apps

COPY ./apps/ .

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl git bash ca-certificates && \
    curl -fsSL https://bun.sh/install | bash && \
    npm install -g turbo wrangler && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* && \
    bun --version > ./versions && \
    node --version >> ./versions && \
    npm --version >> ./versions && \
    turbo --version >> ./versions && \
    wrangler --version >> ./versions && \
    cd ./frontend && \
    bun install && \
    cd ../backend && \
    bun install

CMD ["bash"]
