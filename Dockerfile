FROM node:18

ENV POSTGRES_USER=qj
ENV POSTGRES_PASSWORD=Yatathakar123!
ENV POSTGRES_HOST=docker_postgres
ENV POSTGRES_PORT=5433
ENV POSTGRES_DB=quranJourney

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
ENV NODE_ENV=staging
ENV PORT=3001

CMD ["node", "index.js"]
