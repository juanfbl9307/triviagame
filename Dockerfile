FROM node:14

WORKDIR /app/server

COPY . .

RUN npm install
RUN npm install knex -g

ENTRYPOINT ["sh", "/app/server/entrypoint.sh" ]