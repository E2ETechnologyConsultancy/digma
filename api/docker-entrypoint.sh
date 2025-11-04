#!/bin/sh
echo "Running database migrations..."
npm run migrate
echo "Starting API server..."
npm start