# We will use a test db server on firebase.
# rm testOutput.txt
cd db; docker-compose up -d > ../output.txt; cd ..; sleep 5;
node index.js >> ./testOutput.txt 2>> ./output.txt &
backend=$!;
npm test;
exit_code=$?
echo "Checking test exit code: Exited with '$exit_code'";
kill $backend;
cd db; docker-compose down 2>> ../output.txt; cd ..;
if [ $exit_code -ne 0 ]; then
    exit $exit_code
fi