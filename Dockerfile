FROM node:14

WORKDIR /app/server

COPY package*.json ./

RUN npm install
RUN npm install knex -g

COPY . .

ENTRYPOINT ["sh", "/app/server/entrypoint.sh" ]