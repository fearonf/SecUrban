/**
 * Created by frances.fearon on 02/05/2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


//*************FIREBASE AUTHENTICATION  used for auth function only NOT FOR LOGIN***************
var admin = require("firebase-admin");

//var serviceAccount = require("path/to/serviceAccountKey.json");
var serviceAccount = require("../data/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://meanfire-9a689.firebaseio.com"
});


//***************************************************************


module.exports.register = function(req,res) {
    console.log('registering user');

    var username = req.body.username;

    //if name is there in the body, take it , otherwise name=null
    var name = req.body.name || null;
    //var password = req.body.password;
    var company = req.body.company ;

    User
        .create({
            username: username,
            name: name,
            // encrypt the password using bcrypt-nodejs
            // this method hashes the password in a synchronous way
            //password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            company: company

    },function(err,user) {
        if (err) {
            console.log("Error creating user");
            res
                .status(400)
                .json(err);
        } else {
        console.log("user created",user);
        res
            .status(201)
            .json(user);

    }

        });


};

module.exports.login = function(req,res) {
    console.log("logging in user...");
    var username = req.body.username;
    var password = req.body.password;

    //username was set as 'unique' in model so ok to use 'findOne'

    User
        .findOne( {
        username: username
    })
        .exec(function(err,user) {
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json(err);
            } else {
                //find() returns [] if no entry is found...
                //note: findOne() returns 'null' if no entry is found, need to CHECK for this

               // if(!user) {console.log("user not found")}
               // else{

                //this compares the saved (encrypted ) password and the encrypted input pw
                if (bcrypt.compareSync(password,user.password)) {
                console.log('User found', user);

                // user authenticated....generate token
                    //params are: username from database, 'a secret', time to expire (=one hour here)
                    var token = jwt.sign(
                        {username: user.username},
                        's3cr3t',
                        {expiresIn: 3600});

                res
                    .status(200)
                    .json({success: true, token: token});
            } else {
                    res
                        .status(401)
                        .json('Unauthorised');
                }
            }
            // }

        });


};

module.exports.authenticate = function(req, res, next) {
    // NOTE:: the next() function here is critical - it allows the route to continue on ....***
    // json token has to be sent as part of the authorisation header
    // first make sure that there is an authorization header present

    var headerExists = req.headers.authorization;
    if (headerExists) {

        //  format is --> Authorization Bearer xxx
        // i.e. 'Bearer zywe456..........'
        var token = req.headers.authorization.split(' ')[1];
        console.log("THis is the token received");
        console.log(token);


        // FIREBASE PART WHERE TOKEN IS DECODED AND VERIFIED

        admin.auth().verifyIdToken(token)
            .then(function(decodedToken) {
                req.user = decodedToken.uid;
                console.log(decodedToken);
                next();
                // ...
            }).catch(function(error) {
            // Handle error
            console.log(error);
        });





        //TUTORIAL PART WHERE TOKEN IS DECODED AND VERIFIED

   //     jwt.verify(token,'s3cr3t',function(error, decoded) {
  //          if (error) {
  //              console.log(error);
  //              res
  //                  .status(401)
  //                  .json('Unauthorised');
  //          } else {
  //              //can access properties that are in the payload of the token...
  //              // ...as added in login function, when token was setup initially
  //              //any properties stored in the payload of the token can be captured here...
  //              // uername is stored in a variable for passing to the next controller...hotels.GetAll
  //              req.user = decoded.username;
  //              //go on to the next middleware function ....auth is ok...
  //              //this will now launch the next route on this list in route/index.js
  //              //...ie AFTER ctrlUsers.authenticate
  //              next();
  //          }
  //      });
    // if header doesn't exist....handle this...
    }  else {
        console.log('No token provided');
        res
            .status(403)
            .json('No token provided');

    }

};