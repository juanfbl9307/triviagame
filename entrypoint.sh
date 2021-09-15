#!/bin/bash

sleep 10
npm install knex -g
node migrate.js
npm run devStart