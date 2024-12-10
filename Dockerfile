FROM node:18-alpine

WORKDIR /app

COPY . .

ENV PORT=3001
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USERNAME=house
ENV DB_PASSWORD=house
ENV DB_NAME=housetask

EXPOSE $PORT

RUN npm ci

CMD ["npm", "run", "dev"]
