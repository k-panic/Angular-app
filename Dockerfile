FROM node:13.14.0 as angul
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
FROM nginx:1.17.10

COPY --from=angul /usr/src/app/dist /usr/share/nginx/html

