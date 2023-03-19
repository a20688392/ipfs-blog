#!/bin/sh
npx typeorm -d /dist/src/config/data-source.js migration:show
npx typeorm -d /dist/src/config/data-source.js migration:run
node /dist/src/main.js