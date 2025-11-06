FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN chmod +x docker-entrypoint.sh
EXPOSE 5000
CMD ["sh", "docker-entrypoint.sh"]
