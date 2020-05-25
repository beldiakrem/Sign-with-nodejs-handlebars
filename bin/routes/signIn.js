var express = require('express');
var router = express.Router();
var url = require('url');
var verifyCall = require('../tools/verify');

//var config = require('../config/config.json'); //testing
/* GET home page. */
router.get('/', function (req, res, next) {
     res.render('signin',)
});
     router.post('/', function(req, res){
          var body = req.body;
      
          var res_body = {
              email: body.email,
              password: body.password,
          };
      
          // res.render('store', res_body);
      
});



module.exports = router;
