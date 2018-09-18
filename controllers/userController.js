const User = require('../models/User');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: (params) => {
    return new Promise((resolve, reject) => {
      // check if email already exists
      User
        .findOne({ email: params.email })
        .then(user => {
          if(user) {
            let errors = {};
            errors.message = 'Email already exists';
            erros.status = 400;
            return reject(errors);
          } else {
            const newUser = new User({
              username: params.username, 
              email: params.email,
              password: params.password
            });

            bcyrpt.genSalt(10, (err, salt) => {
              if (err) {
                reject(err);
              }
              bcyrpt.hash(newUser.password, salt, (err, hashedPassword) => {
                if (err) {
                  reject(err);
                } else {
                  newUser.password = hashedPassword;

                  newUser
                    .save()
                    .then(user => resolve(user))
                    .catch(err => reject(err));
                }
              });
            });
          }
        });
    });
  }
};