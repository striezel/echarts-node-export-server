#!/bin/sh

# Start the server.
npm run start &
# Give server some time to start completely.
sleep 3
SERVER_PID=$(pgrep node)
echo "Server process id is $SERVER_PID."

# Run actual tests.
node --test
EXIT_CODE=$?

# Stop / kill server process.
kill $SERVER_PID
if [ $? -ne 0 ]
then
  kill -9 $SERVER_PID
fi

sleep 1

if [ $EXIT_CODE -eq 0 ]
then
  echo Tests were successful.
  exit 0
else
  echo Tests have failed.
  exit 1
fi
