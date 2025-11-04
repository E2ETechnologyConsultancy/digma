FROM node:18-alpine
WORKDIR /app
COPY . .
RUN chmod +x docker-entrypoint.sh
EXPOSE 3001
CMD ["sh", "docker-entrypoint.sh"]
