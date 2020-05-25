var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const User = require('../models/User')
const secretKey = 'something'

// var adminAuth = require('./../auth/adminAuth')

//  GET users  
/* router.get('/signup', (req, res) => {
  User.find()
  .then(data => res.render('signup',  data ))
  .catch(err=> res.status(400).send({err: 'Could not get all users'}));
}); */

// CREATE USER
router.post('/signup', (req, res) => {
  console.log('req  CREATE USER', req.body)
  let user = new User();
  const userObj = req.body;
  let { firstName, lastName, email, password, role } = userObj
  user.firstName = firstName
  user.lastName = lastName
  user.email = email
  user.role = role

  User.findOne({ email }).then(userData => {
    console.log('userData', userData)
    if (userData) {
      return res.status(400).json({err: 'Email exsists'});
    }else {
      bcrypt.hash(password, 2, function(err, hash) {
        user.password = hash
        user.save()
        .then(data => res.send(data))
        .catch(err => res.status(400).send({err: 'Could not create user'}))
      })
    }
  });
});

// GET SINGLE USER
router.get('/:userId', (req, res) => {

  User.findById(userId)
  .then(userData => res.send(userData))
  .catch(() => res.status(400).json({err: 'User does not exist'}))

});

// SINGLE LOGIN

router.get('/signin', function(req, res) {
  res.render('signin', { message: req.flash('loginMessage') });
});

// const authTokens = {};
router.post('/signin', (req, res) => {

  let { email, password } = req.body

  // find user and if everything is found decrypt password
  User.findOne({email: email}).then(userData => {
    if (userData == null) {
    res.status(400).json({err: 'Email does not exist'});
    }else {
      let dbPassword = userData.password
      let {_id, firstName, lastName, email, role} = userData

      bcrypt.compare(password, dbPassword).then(result => {
            if (result === false) {
              return res.status(400).json({err: 'This is the wrong password'});
            }


            let jwtData = {};
            jwtData._id = _id
            jwtData.firstName = firstName
            jwtData.lastName = lastName
            jwtData.email = email
            jwtData.role = role

            let token = jwt.sign(jwtData, secretKey)
            res.json({token})
          
      })
    }
  })
});



router.delete("/:userId", (req, res) => {
  User.findOneAndDelete(req.params.userId)
    .then(data => res.send({ success: true }))
    .catch(err => res.send({ success: false }));
});





module.exports = router;
