FROM node:16-slim as builder

WORKDIR /app

RUN sed -i s/deb.debian.org/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.debian.org/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && rm -rf /var/lib/apt/lists/*

COPY . /app/

RUN yarn config set npmRegistryServer https://registry.npmmirror.com/ \
    && yarn install

RUN yarn run build

FROM nginx:alpine

COPY --from=0 /app/build/ /usr/share/nginx/html/

COPY ./etc/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
