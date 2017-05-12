//require the mongoose modelling tool and the database connection string

var mongoose = require('mongoose');
//var dburl = 'mongodb://localhost:27017/meanhotel';
var dburl = 'mongodb://localhost:27017/secur';


//connect to database using mongoose connect method and pass connection string
mongoose.connect(dburl);

// then listen for events...three types: connected, disconnected, error
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to '+dburl);

});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');

});

//if error connecting, log the error in the console
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connecton error '+ err);

});

//this is to handle 'cntl c' termination of app, and it closes the database
// may not fire in Windows?, really for linux and os/x applications
//seems to pick this up when 'cntl c' used i windows when app running ...
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected throughh app termination (SIGINT)');
            process.exit(0);
    });
});

//this handles a termination from a service provider such as heroku (or firebase?)
process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected throughh app termination (SIGTERM)');
        process.exit(0);
    });
});

//this is for termination due to reset of nodemon (may not fire this in windows, only unix)
//tried this and it doesn't get picked up  when reset nodemon -- database connects ok tho.
process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected throughh app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});


// BRING IN SCHEMAS AND MODELS

require('./hotels.model.js');
require('./users.model');
require('./sessions.model');
