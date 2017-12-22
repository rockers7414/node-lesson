'use strict';

const router = require('express').Router();

const Response = require('../objects/response');
const Error = require('../objects/error');

const User = require('../modules/user');

router.get('/', async (req, res) => {
  try {
    const index = req.query.index ? parseInt(req.query.index) : 0;
    const offset = req.query.offset ? parseInt(req.query.offset) : 10;
    const users = await User.getUsers(index, offset);

    res.status(200).send(new Response.Collection(users));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

router.put('/', async (req, res) => {
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

    res.status(200).send(new Response.Data(user));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

module.exports = router;
