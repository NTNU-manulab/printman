FROM node:17-alpine
RUN yarn global add typescript ts-node 
WORKDIR /app
COPY . .
RUN yarn install --production=false
ENTRYPOINT [ "yarn","run","dev" ]