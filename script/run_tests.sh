rm output.txt
cd db; docker-compose down; docker-compose up -d > ../output.txt; cd ..; sleep 10;
# We sleep 10 seconds to give the db enough time to set up. Should probably change that soon.
npm run start >> ./output.txt 2>> ./output.txt &
backend_pid=$!  # Save the PID of the background process
npm test;
exit_code=$?
echo "Checking test exit code: Exited with '$exit_code'";
pkill -f "ts-node src/index.ts"
echo "Terminated backend process"
cd db; docker-compose down 2>> ../output.txt; cd ..;
if [ $exit_code -ne 0 ]; then
    exit $exit_code
fi
