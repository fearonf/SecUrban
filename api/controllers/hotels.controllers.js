
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// new function to be called if lat/long query string is present (called below...)
var runGeoQuery = function(req,res) {

    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    if(isNaN(lng) || isNaN(lat)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring, lat and lng should be numbers"
            });
        return;
    }


    //create a geoJSON point
    // type is "Point",  and coordinates are an ARRAY in order of: lng,lat

    var point = {
        type: "Point",
        coordinates: [lng,lat]
    };

    //specify the fact that it is spherical
    // the max distance specifys the max distance from the centre point to search (in metres)
    //if you want a small zoomed in scale, give a small distance (your locations are close together)
    //num is the number of records returned
    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5

    };

    //use mongoose's geoNear method, pass in the point and geoOptions defined above.
    // geoNear function doesn't allow you to chain .exec on to it, instead use a
    // callback function
    // NOTE: you only get geoNear results if you have added '2dsphere' to the coordinates
    // in the schema for this document ****

    Hotel
        .geoNear(point,geoOptions,function(err,results,stats) {
            if(err) {
                console.log('Error getting geolocations: ');
                res
                    .status(500)
                    .json(err);
            } else {
                console.log('Geo results ', results);
                console.log('Geo stats ', stats);

                res
                    .status(200)
                    .json(results);
            }

        });

};


module.exports.hotelsGetAll = function (req, res) {

    //req.user is put into the req by the .authenticate function called at time of login.
    //in users.controllers.js
    //i.e. req.user = decoded.username (from the jwt.verify (token..) when decoded
    //only present here if authenticate is called before display all tho
    console.log('Requested by: ' + req.user);


    var offset = 0;
    var count = 5;
    var maxCount = 20;

    // check if query string is present...
    //check for existence of lat and long query string (?lat=46.7&lat=19.45)
    //if they exist, call a new function (declared above) to deal with this query
    //pass the new function the req and res objects
    // then call 'return' to stop code continuing after this function is called

    if(req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req,res);
        return;
    }

    // check if a query string is present...
    // if so, check if offset and/or count are present, if so use them to limit results

    if(req.query && req.query.offset) {
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



    //find is done using the MODEL itself...  ( Hotel )
    //done as...find all..skip some, limit to some and then execute this query...
//if any err returned from exec function, report error and status 500 (internal server err)

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err,hotels) {
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found Hotels", hotels.length); //array length
                res
                    .json(hotels);
            }

        });


};


module.exports.hotelsGetOne = function (req, res) {


//hotelId is taken from the PARAMETER  as entered: localHost:300/api/hotels/12334
// the name 'hotelId' has been assigned in index.js in the relevant 'router' paragraph

//the returned data is placed into the 'doc' variable, which is just created here (not before this point)
// for error handling: set an object at start with default and status (called 'response')
// then fill these variables if error encountered
// return the eventual values in 'res' at end

    var hotelId = req.params.hotelId;

    console.log("GET hotelId ",hotelId);

    Hotel
        .findById(hotelId)
        .exec(function(err,doc){
            var response = {
                status: 200,
                message : doc
            };
            if(err) {
                console.log("Error finding hotel");

                    response.status = 500;
                    response.message = err;

            } else if (!doc) {
                console.log("Hotel Id not found");

                    response.status = 404;
                    response.message = {
                        "message": "Hotel Id not found"
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



module.exports.hotelsAddOne = function (req,res) {


    Hotel
        .create({
            name: req.body.name,
            description : req.body.description,
            stars: parseInt(req.body.stars,10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }

        }, function(err, hotel) {
        if (err) {
            console.log("Error creating hotel");
            res
                .status(400)
                .json(err);
        } else {
            console.log("Hotel created",hotel);
            res
                .status(201)
                .json(hotel);
        }

        });

};

module.exports.hotelsUpdateOne = function(req,res) {

    var hotelId = req.params.hotelId;

    console.log("GET hotelId ",hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec(function(err,doc){
            var response = {
                status: 200,
                message : doc
            };
            if(err) {
                console.log("Error finding hotel");

                response.status = 500;
                response.message = err;

            } else if (!doc) {
                console.log("Hotel Id not found");

                response.status = 404;
                response.message = {
                    "message": "Hotel Id not found"
                };
            }
            if(response.status !=200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                    doc.name = req.body.name;
                    doc.description = req.body.description;
                    doc.stars = parseInt(req.body.stars,10);
                    doc.services = _splitArray(req.body.services);
                    doc.photos = _splitArray(req.body.photos);
                    doc.currency=  req.body.currency;
                    doc.location = {
                        address: req.body.address,
                        coordinates: [
                            parseFloat(req.body.lng),
                            parseFloat(req.body.lat)
                        ]
                    };
                 doc.save(function(err,hotelUpdated) {
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



module.exports.hotelsDeleteOne = function(req,res) {

    var hotelId = req.params.hotelId;

    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function(err,hotel) {
            if(err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Hotel deleted, id", hotelId);
                res
                    .status(204)
                    .json();
            }

        });

};

//