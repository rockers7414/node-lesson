'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const Response = require('./objects/response');
const Error = require('./objects/error');
const AuthUtil = require('./modules/auth');

const auth = require('./v1/auth');
const user = require('./v1/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function checkAccessToken(req, res, next) {
  if (!/^\/api\/v1\/auth\/?.*/.test(req.path)) {
    const accessToken = req.get('authorization');

    if (!accessToken) {
      return res.status(401).send(new Response.Error(new Error.NoAccessToken()));
    }

    try {
      const result = AuthUtil.authenticate(accessToken.split(' ').pop());
      if (result) {
        req.tag = result;
      }
    } catch (err) {
      return res.status(401).send(new Response.Error(new Error.InvalidToken()));
    }
  }
  next();
}
app.use(checkAccessToken);

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = server;
