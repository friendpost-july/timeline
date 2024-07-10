FROM node:lts-alpine
LABEL maintainer="FriendPost Timeline Team"

WORKDIR /app
COPY . .
RUN npm install

CMD ["node","server.js"]

EXPOSE 3002
