var express = require('express');
var router = express.Router();
var url = require('url');
var verifyCall = require('../tools/verify');

//var config = require('../config/config.json'); //testing
/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('signup', { title: 'signUp' });
   });
   
   router.post('/', function(req, res){
       var body = req.body;
   
       var res_body = {
           first_name: body.first_name,
           last_name: body.last_name,
           email: body.email
       };
   
    //    res.render('index', res_body);
   });
   
   module.exports = router;
