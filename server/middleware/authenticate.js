// middleware function to make a route private
var {User} = require('./../models/user'); 


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
            // success case not run, but catch will still be run after Promise.reject
        }
        // success case of finding user
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};