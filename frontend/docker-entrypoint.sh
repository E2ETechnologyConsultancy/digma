#!/bin/sh
echo "Installing frontend dependencies..."
npm install
echo "Starting frontend development server (exposed) ..."
# pass --host 0.0.0.0 so Vite is reachable from outside the container
npm run dev -- --host 0.0.0.0 --port 5173