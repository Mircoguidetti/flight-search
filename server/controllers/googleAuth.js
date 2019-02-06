const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    app.get('/logout', (req, res) => {
        req.logout();
        req.flash('error', 'You have been logged out');
        res.redirect('/');
    });
};