# This is a multistage

# Stage node build
FROM node:13.14.0 as angul
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build

# Stage deployement production
FROM nginx:1.17.10

COPY --from=angul /usr/src/app/dist/boncoin-workspace /usr/share/nginx/html

EXPOSE 80
