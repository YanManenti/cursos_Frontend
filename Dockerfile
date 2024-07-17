# Dockerfile
FROM node:18-alpine

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

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_NEXTAUTH_SECRET=PKfXtTlvT/CimBILzFqfC7ftRZGxi23Ub0r6mbG81+0=
ENV AUTH_API=127.0.0.1:8000

CMD [ "node", ".output/server/index.mjs" ]