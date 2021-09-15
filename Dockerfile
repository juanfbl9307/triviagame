FROM node:14

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["sh", "/app/server/entrypoint.sh" ]