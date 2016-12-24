FROM alpine:3.4

RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.5/main nginx nginx-mod-http-headers-more &&\
    mkdir /run/nginx

EXPOSE 80

ADD nginx.conf /etc/nginx/nginx.conf
#/var/run/docker.sock

ENTRYPOINT ["nginx"]
