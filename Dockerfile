FROM node:20 AS dev

SHELL [ "bash", "-c" ]

ENV BUN_INSTALL=/root/.bun
ENV PATH="${BUN_INSTALL}/bin:$PATH"

WORKDIR /root/apps
COPY ./apps .

RUN apt -y update && \
    apt -y install --no-install-recommends curl git bash ca-certificates && \
    curl -fsSL https://bun.sh/install | bash && \
    npm install -g turbo wrangler && \
    apt -y clean && \
    cd ./frontend && \
    bun install && \
    cd ../backend && \
    bun install && \
    rm -rf /var/lib/apt/lists/* /tmp/* && \
    bun --version > versions && \
    node --version >> versions && \
    npm --version >> versions && \
    turbo --version >> versions && \
    wrangler --version >> versions && \
    echo "Bun, Node, NPM, Turbo, and Wrangler installed successfully."

RUN ls && ls ./frontend && ls ./backend

CMD ["bash"]
