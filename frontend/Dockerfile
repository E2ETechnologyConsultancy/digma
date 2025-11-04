FROM node:18-alpine
WORKDIR /app
COPY . .
RUN chmod +x docker-entrypoint.sh
EXPOSE 3000
CMD ["sh", "docker-entrypoint.sh"]
