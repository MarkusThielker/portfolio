FROM node:20.6.0-slim AS build

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

COPY prisma/ ./prisma/
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "build"]
