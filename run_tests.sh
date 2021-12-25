# We will use a test db server on firebase.
# cd db; sh repop.sh > ../testOutput.txt; cd ..;
cd db; docker-compose up -d > ../testOutput.txt; cd ..;
node index.js >> ./testOutput.txt 2>> ./testOutput.txt &
backend=$!
npm test
cd db docker-compose down; cd ..;
kill $backend
