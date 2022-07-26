# cd db; docker-compose down; docker-compose up --build -d;
cd db; sh backup.sh;
cd ..; nodemon index.js;