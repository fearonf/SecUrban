/**
 * Created by frances.fearon on 11/05/2017.
 */

var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var Hotel = mongoose.model('Hotel');





module.exports.sessionsGetAll = function (req, res) {

    //req.user is put into the req by the .authenticate function called at time of login.
    //in users.controllers.js
    //i.e. req.user = decoded.username (from the jwt.verify (token..) when decoded
    //only present here if authenticate is called before display all tho
    //console.log('Requested by: ' + req.user);


    var offset = 0;
    var count = 5;
    var maxCount = 20;

    // check if query string is present...
    //check for existence of lat and long query string (?lat=46.7&lat=19.45)
    //if they exist, call a new function (declared above) to deal with this query
    //pass the new function the req and res objects
    // then call 'return' to stop code continuing after this function is called



    // check if a query string is present...
    // if so, check if offset and/or count are present, if so use them to limit results

   /* if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10); // 10 is just normal integer to be returned
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    //check if offset and count are numbers...
    //if not, return a status 400(bad request) and a message
    //MUST include the 'return;' here to stop falling thru and trying
    // to format and send ANOTHER response

    if(isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring, count and offset should be numbers"
            });
        return;
    }

    //don't allow unlimited count of records to return, can be abused

    if (count > maxCount) {
        res
            .status(400)
            .json( {
                "message" : "Count limit of "+maxCount + " exceeded"
            });
        return;
    }
*/


    //find is done using the MODEL itself...  ( Hotel )
    //done as...find all..skip some, limit to some and then execute this query...
//if any err returned from exec function, report error and status 500 (internal server err)

    Session
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err,sessions) {
            if (err) {
                console.log("Error finding sessions");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found Sessions", sessions.length); //array length
                res
                    .json(sessions);
            }

        })


};


module.exports.sessionsGetOne = function (req, res) {


//sessionId is taken from the PARAMETER  as entered: localHost:300/api/sessions/12334
// the name 'sessionId' has been assigned in index.js in the relevant 'router' paragraph

//the returned data is placed into the 'doc' variable, which is just created here (not before this point)
// for error handling: set an object at start with default and status (called 'response')
// then fill these variables if error encountered
// return the eventual values in 'res' at end

    var sessionId = req.params.sessionId;

    console.log("GET sessionId ",sessionId);

    Session
        .findById(sessionId)
        .exec(function(err,doc){
            var response = {
                status: 200,
                message : doc
            };
            if(err) {
                console.log("Error finding session");

                response.status = 500;
                response.message = err;

            } else if (!doc) {
                console.log("Session Id not found");

                response.status = 404;
                response.message = {
                    "message": "Session Id not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });


};

// this is a helper function to split a string into an array
// the string's elements are delimited by ';'    (eg "Wifi;Pool")
// if you use the native 'split' function, and you pass in an empty string...
// ...it will return an array with one empty OBJECT
// instead, this will return just an empty array: "[]"
var _splitArray = function(input) {
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
        // output = input.split(",");


    } else {
        output = [];
    }
    return output;
};



module.exports.sessionsAddOne = function (req,res) {


    Session
        .create({
            name: req.body.name,
            objectDescription : req.body.objectDescription,
            informationDescription : req.body.informationDescription,
            timeStamp: req.body.timeStamp,
            objectQuestions: {
                answer1: req.body.answer1,
                comments1: req.body.comments1,
                answer2: req.body.answer2,
                comments2: req.body.comments2
            },
            peopleQuestions: {
                answer27: req.body.answer27,
                comments27: req.body.comments27,
                answer28: req.body.answer28,
                comments28: req.body.comments28
            },
            locationQuestions: {
                answer32: req.body.answer32,
                comments32: req.body.comments32,
                answer33: req.body.answer33,
                comments33: req.body.comments33
            },

            surroundingsQuestions: {
                answer39: req.body.answer39,
                comments39: req.body.comments39,
                answer40: req.body.answer40,
                comments40: req.body.comments40
            },
            measuresQuestions: {
                answer51: req.body.answer51,
                comments51: req.body.comments51,
                answer52: req.body.answer52,
                comments52: req.body.comments52,
                answer69: req.body.answer69,
                comments69: req.body.comments69,
                answer71: req.body.answer71,
                comments71: req.body.comments71
            }

        }, function(err, session) {
            if (err) {
                console.log("Error creating session");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Session created",session);
                res
                    .status(201)
                    .json(session);
            }

        });

};

module.exports.sessionsUpdateOne = function(req,res) {

    var sessionId = req.params.sessionId;

    console.log("GET sessionId ",sessionId);

    Session
        .findById(sessionId)
       // .select("-reviews -rooms")
        .exec(function(err,doc){
            var response = {
                status: 200,
                message : doc
            };
            if(err) {
                console.log("Error finding session");

                response.status = 500;
                response.message = err;

            } else if (!doc) {
                console.log("session Id not found");

                response.status = 404;
                response.message = {
                    "message": "session Id not found"
                };
            }
            if(response.status !=200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {

                doc.name = req.body.name;
                doc.objectDescription = req.body.objectDescription;
                doc.informationDescription = req.body.informationDescription;
                doc.timeStamp = req.body.timeStamp;
                doc.objectQuestions = {
                    answer1: req.body.objectQuestions.answer1,
                    comments1: req.body.objectQuestions.comments1,
                    answer2: req.body.objectQuestions.answer2,
                    comments2: req.body.objectQuestions.comments2
                };
                doc.peopleQuestions = {
                    answer27: req.body.objectQuestions.answer27,
                    comments27: req.body.objectQuestions.comments27,
                    answer28: req.body.objectQuestions.answer28,
                    comments28: req.body.objectQuestions.comments28
                };
                doc.locationQuestions = {
                    answer32: req.body.objectQuestions.answer32,
                    comments32: req.body.objectQuestions.comments32,
                    answer33: req.body.objectQuestions.answer33,
                    comments33: req.body.objectQuestions.comments33
                };

                doc.surroundingsQuestions = {
                    answer39: req.body.objectQuestions.answer39,
                    comments39: req.body.objectQuestions.comments39,
                    answer40: req.body.objectQuestions.answer40,
                    comments40: req.body.objectQuestions.comments40
                };
                doc.measuresQuestions = {
                    answer51: req.body.objectQuestions.answer51,
                    comments51: req.body.objectQuestions.comments51,
                    answer52: req.body.objectQuestions.answer52,
                    comments52: req.body.objectQuestions.comments52,
                    answer69: req.body.objectQuestions.answer69,
                    comments69: req.body.objectQuestions.comments69,
                    answer71: req.body.objectQuestions.answer71,
                    comments71: req.body.objectQuestions.comments71
                } ;


                doc.save(function(err,sessionUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);

                    } else {
                        res
                            .status(204)
                            .json();
                    }

                });
            }

        });
};



module.exports.sessionsDeleteOne = function(req,res) {

    var sessionId = req.params.sessionId;

    Session
        .findByIdAndRemove(sessionId)
        .exec(function(err,session) {
            if(err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Session deleted, id", sessionId);
                res
                    .status(204)
                    .json();
            }

        });

};


