#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install -g json-server
RUN npm install && \
    npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/superheroes-w2-m /usr/share/nginx/html

