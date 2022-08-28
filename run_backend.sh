cd db; docker-compose down; docker-compose up -d;
sleep 8;
cd ..; nodemon index.js;