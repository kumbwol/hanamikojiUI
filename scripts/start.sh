#!/bin/bash

# Absolute or relative path to the backend output file
AGENT_OUT="./engine/hanamikoji/agent_out.json"

# Cleanup any stale UI or backend processes
echo "Cleaning up old processes..."

# Kill any processes using port 3000 (UI-related processes)
lsof -ti :3000 | xargs -r kill

# Kill any processes related to the UI server (webpack or filesystemIO)
pkill -f webpack
pkill -f filesystemIO.js
pkill -f engine.py

# Remove old agent_out.json if it exists
if [ -f "$AGENT_OUT" ]; then
    echo "Removing stale $AGENT_OUT"
    rm "$AGENT_OUT"
fi

# Start the Python backend
(
    cd ./engine/hanamikoji || exit 1
    source venv/bin/activate
    python ./engine.py &
)

# Wait for the backend to create agent_out.json
echo "Waiting for backend to create $AGENT_OUT..."
until [ -f "$AGENT_OUT" ]; do
    printf '.'
    sleep 1
done
echo
echo "Backend is ready."

# Start the UI server (from the project root)
(
    cd . || exit 1
    npm run start &
    npm run filesystemIO &
)

# Wait for all background processes to end
wait

