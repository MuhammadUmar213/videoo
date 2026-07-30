FROM node:20-alpine

WORKDIR /app/backend

# Run as the unprivileged user that ships with the image so a process
# compromise does not hand over root inside the container.
RUN chown -R node:node /app
USER node

COPY --chown=node:node package*.json ./

RUN npm install --omit=dev --no-audit --no-fund

COPY --chown=node:node . .

EXPOSE 5000

CMD ["npm", "start"]
