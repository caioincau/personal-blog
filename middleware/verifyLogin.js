
module.exports = function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    console.log("logado?" + req.isAuthenticated());
    
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};