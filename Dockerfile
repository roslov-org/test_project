# Small Node.js app serving the landing (/) and the privacy page (/privacy) on :8080.
FROM node:22-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
