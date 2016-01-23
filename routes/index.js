var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Project = require('../models/project')
var mongoose = require('mongoose');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* My projects page */
router.get('/my_projects', function(req, res){
  Project.find({}, function(err, projects){
    projects_length = projects.length;
    res.render('my_projects', {projects_length: projects_length});
  });
});

/* New User form */
router.get('/register', function(req, res){
  var key = process.env.LOWES_API_KEY;
  var url = "http://api.lowes.com/customer/registration?api_key="+key;
	res.render('register', {fail: "hi", key: key});
});

router.post('/new_user', function(req,res,next){
	var email = req.body.email;
	var password1 = req.body.password1;
	var password2 = req.body.password2;
	var phone = req.body.phone;
	var zipCode = req.body.zipCode;
	var address1 = req.body.address1;
	var address2 = req.body.address2;
	var state = req.body.state;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var new_user = new User({
    email: email,
    password1: password1,
    password2: password2, 
    phone: phone, 
    zipCode: zipCode, 
    address1: address1, 
    address2: address2, 
    state: state, 
    firstName: firstName, 
    lastName: lastName
  });

var lowes_user = {
    phoneUS: phone,
    password1: password1,
    password2: password2, 
    email1: email,
    zipCode: zipCode,
    firstName: firstName, 
    lastName: lastName,
    state: state,  
    address1: address1, 
    address2: address2   
  };
var key = process.env.LOWES_API_KEY;
var url = "http://api.lowes.com/customer/registration?api_key="+key;
// $.ajax({
//   url: url,
//   dataType: "json",
//   method: "POST",
//   data: lowes_user,
//   success: function(data, textStatus, jqXHR){
//     res.json(data);
//   },
//   error: function(XMLHttpRequest, textStatus, errorThrown){
//       alert("Status: " + textStatus); alert("Error: " + errorThrown);
//   }
// });

  new_user.save(function(err) {
    if (err) {
      res.redirect('/register', {fail: err, email: email});
    } else {
      console.log('User saved successfully');
      res.redirect('/');
    }
  }); 
});

module.exports = router;

