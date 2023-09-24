FROM node:16 AS base
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# clean install
RUN npm i --force --save-exact
COPY . /app
ENV PORT=3000
# CMD [ "npm", "start" ]

FROM base AS build
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]


# FROM node:16.20.0-alpine3.17

# # WORKDIR /app
# WORKDIR /var/www/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build


# EXPOSE 4000

# # CMD ["npm", "start"]


