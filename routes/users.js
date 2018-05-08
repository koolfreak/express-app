'use strict';

module.exports = (app, db, passport) => {
	
	/* GET users listing. */
	app.get('/users', isLoggedIn, function(req, res) {
	  res.render('user/index');
	});

	app.get('/users/list', isLoggedIn, function(req, res) {
		  db.users.findAll()
	      .then(users => {
	      	var data = new Array();
	      	for (var i = users.length - 1; i >= 0; i--) {
	      		var u = users[i];
	      		data.push(u._list())
	      	}
	        res.json({data: data});
	      });
	});

	app.get('/users/register', function(req, res, next) {
	  res.send('respond with a resource');
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
