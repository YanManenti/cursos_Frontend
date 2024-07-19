# Dockerfile
FROM node:18-bookworm

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apt update

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV HOST="0.0.0.0"
ENV NUXT_NEXTAUTH_SECRET="PKfXtTlvT/CimBILzFqfC7ftRZGxi23Ub0r6mbG81+0="
ENV AUTH_API="http://172.18.0.3:8000"
ENV BACK_API="127.0.0.1:8000"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV AUTH_ORIGIN="http://0.0.0.0:3000/"
ENV NEXTAUTH_URL="http://0.0.0.0:3000/"
ENV SECRET="PKfXtTlvT/CimBILzFqfC7ftRZGxi23Ub0r6mbG81+0="

CMD [ "node", ".output/server/index.mjs" ]