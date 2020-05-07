FROM node:13.14.0 as angul
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.10

RUN rm index.html
COPY --from=angul /usr/src/app/dist/boncoin-workspace /usr/share/nginx/html

EXPOSE 80
