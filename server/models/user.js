const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// use mongooose schema to employ custom models
var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// following custom method defines exactly what we send back to user in JSON value
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject(); 

    // only want to send back to user id and email (not password and token etc)
    return _.pick(userObject, ['_id', 'email']);
};


// create an instance method
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123secret').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

// create a static instance to use in server.js for checking token received
// it is a model method (not an instance method) so straight function
UserSchema.statics.findByToken = function (token) {

    // create a variable with the model as the this binding; hence capitalised User
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123secret');
    } catch(e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        return Promise.reject();
        }

    // with success of the try 
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function(next) {
    // middleware will only move onto 'save' once next is called
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});


var User = mongoose.model('User', UserSchema);


module.exports = {User};