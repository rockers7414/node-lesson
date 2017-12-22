'use strict';

const ObjectID = require('mongodb').ObjectID;
const Database = require('../libs/database');
const Page = require('../objects/page');

class User {
  static getUsers(index, offset) {
    return new Promise(async(resolve, reject) => {
      try {
        const collection = await Database.getCollection('users');
        const total = await collection.count();
        const users = await collection.find().skip(index).limit(offset).toArray();

        resolve(new Page(index, offset, users, total));
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await Database.getCollection('users');
        const queryResult = await collection.findOne({ email: email });
        let user = null;

        if (queryResult) {
          user = new User(queryResult.firstName, queryResult.lastName, queryResult.email, queryResult.password);
          user._id = queryResult._id;
        }

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.block = false;
  }

  save() {
    return new Promise(async(resolve, reject) => {
      try {
        const collection = await Database.getCollection('users');
        const id = this._id ? this._id : new ObjectID();
        const updateResult = await collection.updateOne({ _id: id }, { $set: this }, { upsert: true });

        if (!this._id) {
          this._id = updateResult.upsertedId._id;
        }

        resolve(this);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = User;
