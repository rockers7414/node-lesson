'use strict';

const router = require('express').Router();

const Response = require('../objects/response');
const Error = require('../objects/error');

const User = require('../modules/user');

router.get('/', async (req, res) => {
  try {
    if (!req.tag.admin) {
      return res.status(403).send(new Response.Error(new Error.PermissionDenied()));
    }

    const index = req.query.index ? parseInt(req.query.index) : 0;
    const offset = req.query.offset ? parseInt(req.query.offset) : 10;
    const users = await User.getUsers(index, offset);

    res.status(200).send(new Response.Collection(users));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await User.getUserByEmail(req.tag.email);
    delete user['password'];

    res.status(200).send(new Response.Data(user));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

router.put('/', async (req, res) => {
  try {
    if (!req.tag.admin) {
      return res.status(403).send(new Response.Error(new Error.PermissionDenied()));
    }

    // TODO: should check the request parameter.
    let user = await User.getUserByEmail(req.body.email);

    if (!user) {
      user = new User(req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password);
    }

    await user.save();

    delete user['password'];
    res.status(200).send(new Response.Data(user));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

router.put('/:_id', async (req, res) => {
  try {
    if (!req.tag.admin) {
      return res.status(403).send(new Response.Error(new Error.PermissionDenied()));
    }

    const user = await User.getUserById(req.params._id);

    if (!user) {
      return res.status(404).send(new Response.Error(new Error.ResourceNotFound()));
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();

    delete user['password'];
    res.status(200).send(new Response.Data(user));
  } catch (err) {
    res.status(500).send(new Response.Error(new Error.UnknownError()));
  }
});

module.exports = router;
