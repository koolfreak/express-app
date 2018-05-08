
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, db) {

	 // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        db.users.findById(id).then(user => {
            done(null, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
        if (username)
            username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            db.users.findOne({where: {'username': username }}).then(user => {
                // if there are any errors, return the error
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Invalid username or password'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Invalid username or password'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

};