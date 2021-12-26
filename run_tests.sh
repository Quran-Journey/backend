# We will use a test db server on firebase.
# rm testOutput.txt
cd db; docker-compose up -d > ../testOutput.txt; cd ..; sleep 5;
node index.js >> ./testOutput.txt 2>> ./testOutput.txt &
backend=$!
npm test
kill $backend
cd db; docker-compose down 2>> ../testOutput.txt; cd ..;