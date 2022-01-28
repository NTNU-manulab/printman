FROM node:17-alpine
RUN apk add git 
RUN npm install -g typescript ts-node turbo
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npx", "turbo", "run", "dev" ]