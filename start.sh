#!/usr/bin/env sh

# Function to check if consumer is up
is_consumer_up() {
  nc -z localhost 3000
}

if is_consumer_up; then
  echo "Consumer service detected. Starting app..."
  bun start
else
  echo "Consumer service not running."
fi