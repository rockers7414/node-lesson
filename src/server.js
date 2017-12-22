'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const auth = require('./v1/auth');
const user = require('./v1/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = server;
