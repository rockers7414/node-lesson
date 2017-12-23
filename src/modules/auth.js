'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('./user');

class Auth {
  static getAccessToken(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.getUserByEmail(email);
        
        if (!user || user.email !== email || user.password !== password) {
          reject('email and password is not correct');
        }

        const cert = fs.readFileSync(process.cwd() + '/credentials/demo');
        const payload = {
          name: user.firstName,
          email: user.email,
          admin: await user.isAdmin()
        };
        const token = jwt.sign(payload, cert, { algorithm: 'RS256'});

        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  static authenticate(accessToken) {
    try {
      const cert = fs.readFileSync(process.cwd() + '/credentials/demo.pem');
      const payload = jwt.verify(accessToken, cert, { algorithms: ['RS256'] });

      return payload;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Auth;
