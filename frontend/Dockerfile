FROM node:20-alpine as build

WORKDIR /app/frontend

RUN chown -R node:node /app
USER node

COPY --chown=node:node package*.json ./

RUN npm install --no-audit --no-fund

COPY --chown=node:node . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:20-alpine

WORKDIR /app/frontend

RUN npm install -g serve && chown -R node:node /app

# Serving static files needs no privileges; drop to the unprivileged user.
USER node

COPY --from=build --chown=node:node /app/frontend/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
