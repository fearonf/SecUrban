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
    var count = 10;
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
      //  .find({"name":"test"})   find sessions only with the "name" "test" (use this format userid or company if this is required?)
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
            timestamp: req.body.timestamp,

            objectQuestions: {
                answer1: req.body.objectQuestions.answer1,
                comments1: req.body.objectQuestions.comments1,
                answer2: req.body.objectQuestions.answer2,
                comments2: req.body.objectQuestions.comments2,
                answer3: req.body.objectQuestions.answer3,
                comments3: req.body.objectQuestions.comments3,
                answer4: req.body.objectQuestions.answer4,
                comments4: req.body.objectQuestions.comments4,
                answer5: req.body.objectQuestions.answer5,
                comments5: req.body.objectQuestions.comments5,
                answer6: req.body.objectQuestions.answer6,
                comments6: req.body.objectQuestions.comments6,
                answer7: req.body.objectQuestions.answer7,
                comments7: req.body.objectQuestions.comments7,
                answer8: req.body.objectQuestions.answer8,
                comments8: req.body.objectQuestions.comments8,
                answer9: req.body.objectQuestions.answer9,
                comments9: req.body.objectQuestions.comments9,
                answer10: req.body.objectQuestions.answer10,
                comments10: req.body.objectQuestions.comments10,
                answer11: req.body.objectQuestions.answer11,
                comments11: req.body.objectQuestions.comments11,
                answer12: req.body.objectQuestions.answer12,
                comments12: req.body.objectQuestions.comments12,
                answer13: req.body.objectQuestions.answer13,
                comments13: req.body.objectQuestions.comments13,
                answer14: req.body.objectQuestions.answer14,
                comments14: req.body.objectQuestions.comments14,
                answer15: req.body.objectQuestions.answer15,
                comments15: req.body.objectQuestions.comments15,
                answer16: req.body.objectQuestions.answer16,
                comments16: req.body.objectQuestions.comments16,
                answer17: req.body.objectQuestions.answer17,
                comments17: req.body.objectQuestions.comments17,
                answer18: req.body.objectQuestions.answer18,
                comments18: req.body.objectQuestions.comments18,
                answer19: req.body.objectQuestions.answer19,
                comments19: req.body.objectQuestions.comments19,
                answer20: req.body.objectQuestions.answer20,
                comments20: req.body.objectQuestions.comments20,
                answer21: req.body.objectQuestions.answer21,
                comments21: req.body.objectQuestions.comments21,
                answer22: req.body.objectQuestions.answer22,
                comments22: req.body.objectQuestions.comments22,
                answer23: req.body.objectQuestions.answer23,
                comments23: req.body.objectQuestions.comments23,
                answer24: req.body.objectQuestions.answer24,
                comments24: req.body.objectQuestions.comments24,
                answer25: req.body.objectQuestions.answer25,
                comments25: req.body.objectQuestions.comments25,
                answer26: req.body.objectQuestions.answer26,
                comments26: req.body.objectQuestions.comments26
            },
            peopleQuestions: {
                answer27: req.body.peopleQuestions.answer27,
                comments27: req.body.peopleQuestions.comments27,
                answer28: req.body.peopleQuestions.answer28,
                comments28: req.body.peopleQuestions.comments28,
                answer29: req.body.peopleQuestions.answer29,
                comments29: req.body.peopleQuestions.comments29,
                answer30: req.body.peopleQuestions.answer30,
                comments30: req.body.peopleQuestions.comments30,
                answer31: req.body.peopleQuestions.answer31,
                comments31: req.body.peopleQuestions.comments31

            },
            locationQuestions: {
                answer32: req.body.locationQuestions.answer32,
                comments32: req.body.locationQuestions.comments32,
                answer33: req.body.locationQuestions.answer33,
                comments33: req.body.locationQuestions.comments33,
                answer34: req.body.locationQuestions.answer34,
                comments34: req.body.locationQuestions.comments34,
                answer35: req.body.locationQuestions.answer35,
                comments35: req.body.locationQuestions.comments35,
                answer36: req.body.locationQuestions.answer36,
                comments36: req.body.locationQuestions.comments36,
                answer37: req.body.locationQuestions.answer37,
                comments37: req.body.locationQuestions.comments37,
                answer38: req.body.locationQuestions.answer38,
                comments38: req.body.locationQuestions.comments38

            },

            surroundingsQuestions: {
                answer39: req.body.surroundingsQuestions.answer39,
                comments39: req.body.surroundingsQuestions.comments39,
                answer40: req.body.surroundingsQuestions.answer40,
                comments40: req.body.surroundingsQuestions.comments40,
                answer41: req.body.surroundingsQuestions.answer41,
                comments41: req.body.surroundingsQuestions.comments41,
                answer42: req.body.surroundingsQuestions.answer42,
                comments42: req.body.surroundingsQuestions.comments42,
                answer43: req.body.surroundingsQuestions.answer43,
                comments43: req.body.surroundingsQuestions.comments43,
                answer44: req.body.surroundingsQuestions.answer44,
                comments44: req.body.surroundingsQuestions.comments44,
                answer45: req.body.surroundingsQuestions.answer45,
                comments45: req.body.surroundingsQuestions.comments45,
                answer46: req.body.surroundingsQuestions.answer46,
                comments46: req.body.surroundingsQuestions.comments46,
                answer47: req.body.surroundingsQuestions.answer47,
                comments47: req.body.surroundingsQuestions.comments47,
                answer48: req.body.surroundingsQuestions.answer48,
                comments48: req.body.surroundingsQuestions.comments48,
                answer49: req.body.surroundingsQuestions.answer49,
                comments49: req.body.surroundingsQuestions.comments49,
                answer50: req.body.surroundingsQuestions.answer50,
                comments50: req.body.surroundingsQuestions.comments50
            },
            measuresQuestions: {
                answer51: req.body.measuresQuestions.answer51,
                comments51: req.body.measuresQuestions.comments51,
                answer52: req.body.measuresQuestions.answer52,
                comments52: req.body.measuresQuestions.comments52,
                answer53: req.body.measuresQuestions.answer53,
                comments53: req.body.measuresQuestions.comments53,
                answer54: req.body.measuresQuestions.answer54,
                comments54: req.body.measuresQuestions.comments54,
                answer55: req.body.measuresQuestions.answer55,
                comments55: req.body.measuresQuestions.comments55,
                answer56: req.body.measuresQuestions.answer56,
                comments56: req.body.measuresQuestions.comments56,
                answer57: req.body.measuresQuestions.answer57,
                comments57: req.body.measuresQuestions.comments57,
                answer58: req.body.measuresQuestions.answer58,
                comments58: req.body.measuresQuestions.comments58,
                answer59: req.body.measuresQuestions.answer59,
                comments59: req.body.measuresQuestions.comments59,
                answer60: req.body.measuresQuestions.answer60,
                comments60: req.body.measuresQuestions.comments60,
                answer61: req.body.measuresQuestions.answer61,
                comments61: req.body.measuresQuestions.comments61,
                answer62: req.body.measuresQuestions.answer62,
                comments62: req.body.measuresQuestions.comments62,
                answer63: req.body.measuresQuestions.answer63,
                comments63: req.body.measuresQuestions.comments63,
                answer64: req.body.measuresQuestions.answer64,
                comments64: req.body.measuresQuestions.comments64,
                answer65: req.body.measuresQuestions.answer65,
                comments65: req.body.measuresQuestions.comments65,
                answer66: req.body.measuresQuestions.answer66,
                comments66: req.body.measuresQuestions.comments66,
                answer67: req.body.measuresQuestions.answer67,
                comments67: req.body.measuresQuestions.comments67,
                answer68: req.body.measuresQuestions.answer68,
                comments68: req.body.measuresQuestions.comments68,
                answer69: req.body.measuresQuestions.answer69,
                comments69: req.body.measuresQuestions.comments69,
                answer70: req.body.measuresQuestions.answer70,
                comments70: req.body.measuresQuestions.comments70,
                answer71: req.body.measuresQuestions.answer71,
                comments71: req.body.measuresQuestions.comments71,
                answer72: req.body.measuresQuestions.answer72,
                comments72: req.body.measuresQuestions.comments72,
                answer73: req.body.measuresQuestions.answer73,
                comments73: req.body.measuresQuestions.comments73,
                answer74: req.body.measuresQuestions.answer74,
                comments74: req.body.measuresQuestions.comments74,
                answer75: req.body.measuresQuestions.answer75,
                comments75: req.body.measuresQuestions.comments75,
                answer76: req.body.measuresQuestions.answer76,
                comments76: req.body.measuresQuestions.comments76

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
                doc.timestamp = req.body.timestamp;
                doc.objectQuestions = {
                    answer1: req.body.objectQuestions.answer1,
                    comments1: req.body.objectQuestions.comments1,
                    answer2: req.body.objectQuestions.answer2,
                    comments2: req.body.objectQuestions.comments2,
                    answer3: req.body.objectQuestions.answer3,
                    comments3: req.body.objectQuestions.comments3,
                    answer4: req.body.objectQuestions.answer4,
                    comments4: req.body.objectQuestions.comments4,
                    answer5: req.body.objectQuestions.answer5,
                    comments5: req.body.objectQuestions.comments5,
                    answer6: req.body.objectQuestions.answer6,
                    comments6: req.body.objectQuestions.comments6,
                    answer7: req.body.objectQuestions.answer7,
                    comments7: req.body.objectQuestions.comments7,
                    answer8: req.body.objectQuestions.answer8,
                    comments8: req.body.objectQuestions.comments8,
                    answer9: req.body.objectQuestions.answer9,
                    comments9: req.body.objectQuestions.comments9,
                    answer10: req.body.objectQuestions.answer10,
                    comments10: req.body.objectQuestions.comments10,
                    answer11: req.body.objectQuestions.answer11,
                    comments11: req.body.objectQuestions.comments11,
                    answer12: req.body.objectQuestions.answer12,
                    comments12: req.body.objectQuestions.comments12,
                    answer13: req.body.objectQuestions.answer13,
                    comments13: req.body.objectQuestions.comments13,
                    answer14: req.body.objectQuestions.answer14,
                    comments14: req.body.objectQuestions.comments14,
                    answer15: req.body.objectQuestions.answer15,
                    comments15: req.body.objectQuestions.comments15,
                    answer16: req.body.objectQuestions.answer16,
                    comments16: req.body.objectQuestions.comments16,
                    answer17: req.body.objectQuestions.answer17,
                    comments17: req.body.objectQuestions.comments17,
                    answer18: req.body.objectQuestions.answer18,
                    comments18: req.body.objectQuestions.comments18,
                    answer19: req.body.objectQuestions.answer19,
                    comments19: req.body.objectQuestions.comments19,
                    answer20: req.body.objectQuestions.answer20,
                    comments20: req.body.objectQuestions.comments20,
                    answer21: req.body.objectQuestions.answer21,
                    comments21: req.body.objectQuestions.comments21,
                    answer22: req.body.objectQuestions.answer22,
                    comments22: req.body.objectQuestions.comments22,
                    answer23: req.body.objectQuestions.answer23,
                    comments23: req.body.objectQuestions.comments23,
                    answer24: req.body.objectQuestions.answer24,
                    comments24: req.body.objectQuestions.comments24,
                    answer25: req.body.objectQuestions.answer25,
                    comments25: req.body.objectQuestions.comments25,
                    answer26: req.body.objectQuestions.answer26,
                    comments26: req.body.objectQuestions.comments26
                };
                doc.peopleQuestions = {
                    answer27: req.body.peopleQuestions.answer27,
                    comments27: req.body.peopleQuestions.comments27,
                    answer28: req.body.peopleQuestions.answer28,
                    comments28: req.body.peopleQuestions.comments28,
                    answer29: req.body.peopleQuestions.answer29,
                    comments29: req.body.peopleQuestions.comments29,
                    answer30: req.body.peopleQuestions.answer30,
                    comments30: req.body.peopleQuestions.comments30,
                    answer31: req.body.peopleQuestions.answer31,
                    comments31: req.body.peopleQuestions.comments31

                };
                doc.locationQuestions = {
                    answer32: req.body.locationQuestions.answer32,
                    comments32: req.body.locationQuestions.comments32,
                    answer33: req.body.locationQuestions.answer33,
                    comments33: req.body.locationQuestions.comments33,
                    answer34: req.body.locationQuestions.answer34,
                    comments34: req.body.locationQuestions.comments34,
                    answer35: req.body.locationQuestions.answer35,
                    comments35: req.body.locationQuestions.comments35,
                    answer36: req.body.locationQuestions.answer36,
                    comments36: req.body.locationQuestions.comments36,
                    answer37: req.body.locationQuestions.answer37,
                    comments37: req.body.locationQuestions.comments37,
                    answer38: req.body.locationQuestions.answer38,
                    comments38: req.body.locationQuestions.comments38

                };

                doc.surroundingsQuestions = {
                    answer39: req.body.surroundingsQuestions.answer39,
                    comments39: req.body.surroundingsQuestions.comments39,
                    answer40: req.body.surroundingsQuestions.answer40,
                    comments40: req.body.surroundingsQuestions.comments40,
                    answer41: req.body.surroundingsQuestions.answer41,
                    comments41: req.body.surroundingsQuestions.comments41,
                    answer42: req.body.surroundingsQuestions.answer42,
                    comments42: req.body.surroundingsQuestions.comments42,
                    answer43: req.body.surroundingsQuestions.answer43,
                    comments43: req.body.surroundingsQuestions.comments43,
                    answer44: req.body.surroundingsQuestions.answer44,
                    comments44: req.body.surroundingsQuestions.comments44,
                    answer45: req.body.surroundingsQuestions.answer45,
                    comments45: req.body.surroundingsQuestions.comments45,
                    answer46: req.body.surroundingsQuestions.answer46,
                    comments46: req.body.surroundingsQuestions.comments46,
                    answer47: req.body.surroundingsQuestions.answer47,
                    comments47: req.body.surroundingsQuestions.comments47,
                    answer48: req.body.surroundingsQuestions.answer48,
                    comments48: req.body.surroundingsQuestions.comments48,
                    answer49: req.body.surroundingsQuestions.answer49,
                    comments49: req.body.surroundingsQuestions.comments49,
                    answer50: req.body.surroundingsQuestions.answer50,
                    comments50: req.body.surroundingsQuestions.comments50
                };
                doc.measuresQuestions = {
                    answer51: req.body.measuresQuestions.answer51,
                    comments51: req.body.measuresQuestions.comments51,
                    answer52: req.body.measuresQuestions.answer52,
                    comments52: req.body.measuresQuestions.comments52,
                    answer53: req.body.measuresQuestions.answer53,
                    comments53: req.body.measuresQuestions.comments53,
                    answer54: req.body.measuresQuestions.answer54,
                    comments54: req.body.measuresQuestions.comments54,
                    answer55: req.body.measuresQuestions.answer55,
                    comments55: req.body.measuresQuestions.comments55,
                    answer56: req.body.measuresQuestions.answer56,
                    comments56: req.body.measuresQuestions.comments56,
                    answer57: req.body.measuresQuestions.answer57,
                    comments57: req.body.measuresQuestions.comments57,
                    answer58: req.body.measuresQuestions.answer58,
                    comments58: req.body.measuresQuestions.comments58,
                    answer59: req.body.measuresQuestions.answer59,
                    comments59: req.body.measuresQuestions.comments59,
                    answer60: req.body.measuresQuestions.answer60,
                    comments60: req.body.measuresQuestions.comments60,
                    answer61: req.body.measuresQuestions.answer61,
                    comments61: req.body.measuresQuestions.comments61,
                    answer62: req.body.measuresQuestions.answer62,
                    comments62: req.body.measuresQuestions.comments62,
                    answer63: req.body.measuresQuestions.answer63,
                    comments63: req.body.measuresQuestions.comments63,
                    answer64: req.body.measuresQuestions.answer64,
                    comments64: req.body.measuresQuestions.comments64,
                    answer65: req.body.measuresQuestions.answer65,
                    comments65: req.body.measuresQuestions.comments65,
                    answer66: req.body.measuresQuestions.answer66,
                    comments66: req.body.measuresQuestions.comments66,
                    answer67: req.body.measuresQuestions.answer67,
                    comments67: req.body.measuresQuestions.comments67,
                    answer68: req.body.measuresQuestions.answer68,
                    comments68: req.body.measuresQuestions.comments68,
                    answer69: req.body.measuresQuestions.answer69,
                    comments69: req.body.measuresQuestions.comments69,
                    answer70: req.body.measuresQuestions.answer70,
                    comments70: req.body.measuresQuestions.comments70,
                    answer71: req.body.measuresQuestions.answer71,
                    comments71: req.body.measuresQuestions.comments71,
                    answer72: req.body.measuresQuestions.answer72,
                    comments72: req.body.measuresQuestions.comments72,
                    answer73: req.body.measuresQuestions.answer73,
                    comments73: req.body.measuresQuestions.comments73,
                    answer74: req.body.measuresQuestions.answer74,
                    comments74: req.body.measuresQuestions.comments74,
                    answer75: req.body.measuresQuestions.answer75,
                    comments75: req.body.measuresQuestions.comments75,
                    answer76: req.body.measuresQuestions.answer76,
                    comments76: req.body.measuresQuestions.comments76

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


