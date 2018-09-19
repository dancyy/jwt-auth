const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterData = data => {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if(!Validator.isLength(data.username, {min: 3, max: 15})) {
    errors.username = 'username must be longer than 3 characters and less than 15'
  }
  if(Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.username = 'Email field is required';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Check your email';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  if(!Validator.isLength({min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters long';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required'
  }
  if (!Validator.isLength({ min: 6, max: 30 })) {
    errors.confirmPassword = 'Confirm Password must be between 6 and 30 characters long';
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }

};

module.exports = validateRegisterData;
