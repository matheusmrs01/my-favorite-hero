FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env ./.env

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]