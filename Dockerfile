FROM node:17-alpine
RUN apk add git 
RUN npm install -g typescript ts-node turbo
WORKDIR /app
COPY . .
RUN chmod +x entry.sh
ENTRYPOINT [ "sh", "./entry.sh" ]