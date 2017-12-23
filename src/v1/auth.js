'use strict';

const router = require('express').Router();

const Response = require('../objects/response');
const Error = require('../objects/error');

const Auth = require('../modules/auth');
const User = require('../modules/user');

router.post('/register', async (req, res) => {
  try {
    // TODO: should check the request parameter.
    let user = await User.getUserByEmail(req.body.email);

    if (!user) {
      user = await new User(req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password);
    }

    await user.save();

    res.status(200).send(new Response.Data(true));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

router.post('/token', async (req, res) => {
  try {
    const token = req.get('authorization');

    if (!token) {
      res.status(401).send(new Response.Error(new Error.AuthenticationFailed()));
    }

    const credentials = new Buffer(token.split(' ').pop(), 'base64')
      .toString('ascii').split(':');
    const accessToken = await Auth.getAccessToken(credentials[0], credentials[1]);

    res.status(200).send(new Response.Data(accessToken));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

module.exports = router;
