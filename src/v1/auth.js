'use strict';

const router = require('express').Router();

const Response = require('../objects/response');
// const Error = require('../objects/error');

router.post('/register', (req, res) => {
  const result = new Response.Data('hello world');
  res.send(result);
});

router.get('/token', (req, res) => {
  const result = new Response.Data('hello world');
  res.send(result);
});

module.exports = router;
