FROM node:20-alpine as build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:20-alpine

WORKDIR /app/frontend

RUN npm install -g serve

COPY --from=build /app/frontend/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
