'use strict';

var bcrypt   = require('bcrypt-nodejs');
var md5 = require('md5');

module.exports = (app, db, passport) => {

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('login', { title: 'Express', message: req.flash('loginMessage') });
	});

	// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/users', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.get('/register', function(req, res, next) {
	  res.render('register', { title: 'Express' });
	});

	app.post('/register', function(req, res, next) {
	  const first_name = req.body.first_name;
	  const last_name = req.body.last_name;
	  const username = req.body.username;
	  const password = md5(req.body.password);
	  db.users.create({first_name: first_name, last_name: last_name,
	  username: username, password: password}).then(user =>{
	  	res.redirect('/')
	  }).catch(error => {
	  	console.log(error)
	  	res.render('register', { title: 'Express' });
	  });
	  
	});

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
