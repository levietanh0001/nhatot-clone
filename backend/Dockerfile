# FROM node:16.20.0 AS base
FROM node:16.20.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# FROM node:16.20.0-alpine3.17

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --only=production

# COPY --from=base /app ./

EXPOSE 4000

CMD [ "npm", "start" ] 


