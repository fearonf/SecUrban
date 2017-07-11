/**
 * Created by frances.fearon on 11/05/2017.
 */

var mongoose = require('mongoose');
var Session = mongoose.model('Session');


module.exports.sessionsGetAll = function (req, res) {

    //req.user is put into the req by the .authenticate function called at time of login.
    //in users.controllers.js
    //i.e. req.user = decoded.username (from the jwt.verify (token..) when decoded
    //req.user is only present in this get,  if authenticate is called before GetAll function.
    // the function GetAllByUserId( below ) will always have the userId supplied....
    //console.log('Requested by: ' + req.user);


    var offset = 0;
    var count = 100;
    //var maxCount = 100;

    // check if query string is present...***leaving this code in , in case we need to limit the number of returns
    // in future.....


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


    //find is done using the MODEL itself...
    //done as...find all..skip some, limit to some and then execute this query...
//if any err returned from exec function, report error and status 500 (internal server err)


    Session

        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, sessions) {
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
module.exports.sessionsGetAllByUserId = function (req, res) {


// userId is included as a parameter for this get request

    var offset = 0;
    var count = 100;
    // var maxCount = 100;

    // check if query string is present...***leaving this code in, in case we need to limit the number of returns
    // in the future...


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


    //done as...find all..skip some, limit to some and then execute this query...
//if any err returned from exec function, report error and status 500 (internal server err)
    var userId = req.params.userId;

    console.log("GET sessions for userId ", userId);

    Session
        .find({"userId": userId})   //find sessions only with the "userId" = userId as supplied in req

        .skip(offset)
        .limit(count)
        .exec(function (err, sessions) {
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

    console.log("GET sessionId ", sessionId);

    Session
        .findById(sessionId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
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


module.exports.sessionsAddOne = function (req, res) {


    Session
        .create({
            userId: req.body.userId,
            name: req.body.name,
            objectDescription: req.body.objectDescription,
            informationDescription: req.body.informationDescription,
            timestamp: req.body.timestamp,


            questions: req.body.questions


        }, function (err, session) {
            if (err) {
                console.log("Error creating session");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Session created", session);
                res
                    .status(201)
                    .json(session);
            }

        });

};

module.exports.sessionsUpdateOne = function (req, res) {

    var sessionId = req.params.sessionId;

    console.log("GET sessionId ", sessionId);

    Session
        .findById(sessionId)
        // .select("-reviews -rooms")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
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
            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.userId = req.body.userId;
                doc.name = req.body.name;
                doc.objectDescription = req.body.objectDescription;
                doc.informationDescription = req.body.informationDescription;
                doc.timestamp = req.body.timestamp;
                doc.questions = req.body.questions;


                doc.save(function (err, sessionUpdated) {
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


module.exports.sessionsDeleteOne = function (req, res) {

    var sessionId = req.params.sessionId;

    Session
        .findByIdAndRemove(sessionId)
        .exec(function (err, session) {
            if (err) {
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


