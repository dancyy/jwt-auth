var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INDEX');
});

// Signup
router.post('/', function (req, res, next) {
  const signUpInfo = req.body;
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

module.exports = router;
