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
  },
  login: (params) => {
    const email = params.email;
    const password = params.password;
    return new Promise((resolve, reject) => {
      User
        .findOne({ email })
        .then(user => {
          if(!user) {
            let error = {};
            errors.message = 'User not found';
            errors.status = 404;
            reject(errors);
          } 

          // compare the passwords
          bcrypt
            .compare(password, user.password)
            .then(isAuth => {
              if(!isAuth){
                let error = {};
                errors.message = 'Check your username and password';
                errors.status = 403;
                reject(errors);
              } else {
                const payLoad = {
                  id: user._id,
                  email: user.email,
                  username: user.username
                }

                jwt.sign(payload, process.env.SUPER_SECRET_CODE, {
                  expiresIn: 4500
                }, (err, token) => {
                  if(err) {
                    console.log(err);
                    reject(err);
                  }
                  let success = {};
                  success.confirmation = 'Success!';
                  success.token = 'Bearer ' + token;
                  resolve(success);
                });
              }
            })
        })
    });
  }
};