var express = require('express');
var router = express.Router();
const registerChecker = require('../utils/validation/register');
const loginChecker = require('../utils/validation/login');

var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INDEX');
});

// Signup
router.post('/', function (req, res, next) {

  const signUpInfo = req.body;
  const { errors, isValid } = registerChecker(signUpInfo);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  userController.signUp(signUpInfo)
    .then(user => {
      res.status(200).json({
        data: user
      });
    })
    .catch(err => {
      const statusCode = err.status;
      const message = err.message;
      res.status(statusCode).json({
        message: message
      });
    });
});

router.post('/login', function (req, res, next) {
  const loginInfo = req.body;

  const { errors, isValid } = loginChecker(loginInfo);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  userController
    .login(loginInfo)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

module.exports = router;
