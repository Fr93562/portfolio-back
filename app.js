"use strict";

// url de l'api http://localhost:3000/

let Api = require('./api_modules/core/Api');
let logs = require('./api_modules/services/logs');

let server = require('./src/configs/server');
let cors = require('./src/configs/cors');
let router = require('./src/routes/router');

logs.message('App starts.');

Api.start(server.port, router, cors);

logs.message('App is ready.');
