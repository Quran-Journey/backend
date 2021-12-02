FROM node:12.19.0

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=Yatathakar123!
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_DB=quranJourney

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]