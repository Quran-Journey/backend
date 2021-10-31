# We will use a test db server on firebase.
# cd db; sh repop.sh > ../testOutput.txt; cd ..;
node maaNode.js >> ./testOutput.txt 2>> ./testOutput.txt &
maadmin=$!
npm test
kill $maadmin
