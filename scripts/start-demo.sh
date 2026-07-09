#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -f "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  source "$HOME/.nvm/nvm.sh"
  nvm use 14 >/dev/null
fi

if ! mongosh --quiet --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
  echo "Starting MongoDB..."
  sudo mkdir -p /data/db /var/log/mongodb
  sudo -u mongodb mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --fork --bind_ip 127.0.0.1
  sleep 2
fi

if [ ! -f dist/index.html ]; then
  echo "Building Angular app..."
  npm run build
fi

export PORT="${PORT:-8080}"
echo "Starting CMS on 0.0.0.0:${PORT}"
node server.js
