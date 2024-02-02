FROM node:alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install && \
    npm cache clean --force
COPY ./src ./src
COPY ./.env ./
COPY config.ts ./
CMD [ "npm", "run", "dev" ]
