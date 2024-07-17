# Dockerfile
FROM node:20.9-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_NEXTAUTH_SECRET=PKfXtTlvT/CimBILzFqfC7ftRZGxi23Ub0r6mbG81+0=
ENV AUTH_API="http://172.18.0.3:8000"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD [ "node", ".output/server/index.mjs" ]