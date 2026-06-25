# Node.js app: landing + /privacy + /register + /account, persisting signups to Postgres.
# Listens on $PORT (default 8080). Runs as a non-root user — the Lessly deploy
# platform enforces PodSecurity "restricted" (no root containers).
FROM node:22-alpine

WORKDIR /app

# Install production deps first so this layer caches across code-only changes.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# App code.
COPY . .

# node:* images ship a non-root "node" user (uid 1000).
USER node

EXPOSE 8080
CMD ["node", "server.js"]
