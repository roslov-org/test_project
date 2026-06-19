# Static landing — served by nginx on the Lessly container port (8080).
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
RUN printf 'server {\n    listen 8080;\n    listen [::]:8080;\n    server_name _;\n    root /usr/share/nginx/html;\n    index index.html;\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
