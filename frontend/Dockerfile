FROM node:16.20.0-alpine3.17

# WORKDIR /app
WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 4000

# CMD ["npm", "start"]


