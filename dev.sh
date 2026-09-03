#!/bin/bash

# MEOCY Development Server Script
# Starts both Next.js frontend and Express backend concurrently

echo "🚀 Starting MEOCY Development Servers..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo "⚠️  .env.local not found!"
  echo "Please create .env.local with your configuration:"
  echo "  cp .env.example .env.local"
  echo "  # Edit .env.local with your credentials"
  exit 1
fi

echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
(npm run dev) &
FRONTEND_PID=$!

sleep 2

(npm run api:dev) &
BACKEND_PID=$!

# Handle Ctrl+C
trap "kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; echo 'Servers stopped.'; exit 0" INT

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
