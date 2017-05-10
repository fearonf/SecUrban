//add in the mongoose modelling tool with its functions
// and the model so you can refer to the model's 'fields' (called 'paths' in mongoose)


var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//GET all reviews for a hotel
//first , get the hotel (parent) document for the hotel, by id as before (in hotel controller)
// then take out the 'reviews' document from the parent.
// this one takes the entire 'reviews' document

//by adding the 'select' you limit the return to just the 'reviews' sub-document
// i.e. the rest of the hotel data is NOT available after this call

// NOTE: See reviewsAddOne for another appoach to sending back reviews OR an
// empty array if no reviews exist (from tutorial...)

module.exports.reviewsGetAll = function(req, res) {
    var hotelId = req.params.hotelId;

    console.log("GET hotelId ",hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')  //return ONLY the 'reviews' sub-document
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("Hotel Id not found in database " , hotelId);
                response.status = 404;
                response.message = {"message" : "Hotel id not found "+ hotelId };

                // this next part not tested with a hotel with no reviews...
               } else  {

                response.message = doc.reviews ? doc.reviews : [];

            }

            res
                .status(response.status)
                .json(response.message);

        });

};

//GET single review for a hotel
//note: sub-documents are all ARRAYS so you have to get the sub-document by index
// you can't just pass a key to the particular review.
// using the '   .id  ' method from mongoose to do this. Note it is a METHOD !!!

module.exports.reviewsGetOne = function(req, res) {

    var hotelId  = req.params.hotelId;
    var reviewId = req.params.reviewId;


    console.log("GET reviewId " +reviewId + " for hotelId "+hotelId);

    Hotel
       .findById(hotelId)
        .select('reviews')  //return ONLY the 'reviews' sub-document
        .exec(function(err,hotel){
            var response = {
                status :200,
                message:  null
            }
            if (err) {
                console.log ("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                response.status = 404;
                response.message = { "message": "Hotel not found"};

            } else {
                console.log("Returned hotel ", hotel);
                var review = hotel.reviews.id(reviewId);
                if (review == null) {
                    response.status = 404;
                    response.message = { "message": "Review not found"};
                }
                else {
                    response.status = 200;
                    response.message = review;
                }
            }
            res
                .status(response.status)
                .json(response.message);


        });

};


// new function added to add the review once hotel has been found in reviewsAddOne
//this function received the doc from reviewsAddOne which is a hotel document
// this is mapped on to the 'hotel' in the header here...
// its mapped on to the hotel schema

//hotel = an instance of the Hotel model
//Hotel = the actual model

var _addReview = function(req, res, hotel) {

    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating,10),
        review: req.body.review
        //don't need to add the dateCreated as default is set in mongoose schema
    });

    hotel.save(function(err,hotelUpdated){
        if (err) {
            res
                .status(500)
                .json(err);
            console.log(err);
        } else {
            res
                .status(201)
               // .json(hotelUpdated);
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });

};


// note the last bit sends....
//...either the reviews that have been found...
//... OR an empty array []
module.exports.reviewsAddOne = function(req, res) {

    var hotelId = req.params.hotelId;

    console.log("In reviewsaddone get hotelId ",hotelId);


    Hotel
        .findById(hotelId)
        .select('reviews')  //return ONLY the 'reviews' sub-document
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("Hotel Id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel id not found " + id
                };

            }

            // if document found (hotel exists) call a new function to add review
            // otherwise, fall thru to return error and json

            if (doc) {
                 _addReview(req,res,doc);

            } else {

                res
                    .status(response.status)
                    .json(response.message);
            }
//

        });

};

module.exports.reviewsUpdateOne = function(req,res) {

    var hotelId  = req.params.hotelId;
    var reviewId = req.params.reviewId;


    console.log("GET reviewId " +reviewId + " for hotelId "+hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')  //return ONLY the 'reviews' sub-document
       // .select("-rooms")     //include parent and reviews only
        .exec(function(err,hotel){
            var thisReview;
            var response = {
                status :200,
                message:  null
            };
            if (err) {
                console.log ("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                response.status = 404;
                response.message = { "message": "Hotel not found"};

            } else {
                //get the review
                //thisReview = hotel.reviews.id(reviewId);
                //if review doesn't exist returns null
                var review = hotel.reviews.id(reviewId);
                if(review == null) {
               // if (!thisReview) {

                    response.status = 404;
                    response.message = {"message": "Review not found"};
                }
            }


                if (response.status != 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {

                    //correct review found, update it

                    // update the instance of the model with the req.body values...
                    ///... review fields only..

                     //update the 'review' variable which is the selected review


                    console.log("Review before change  ",review);

                        review.name = req.body.name;
                        review.rating = parseInt(req.body.rating,10);
                        review.review = req.body.review;
                        //review.createdOn = Date.now();  can update date too here.
                        hotel.save(function(err,hotelUpdated) {

                            if (err) {
                                res
                                    .status(500)
                                    .json(err);
                        }else {
                                res
                                    .status(204)
                                    .json();
                            }

                });
            }

        });
};


module.exports.reviewsDeleteOne = function(req,res) {

    var hotelId  = req.params.hotelId;
    var reviewId = req.params.reviewId;


    console.log("GET reviewId " +reviewId + " for hotelId "+hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')  //return ONLY the 'reviews' sub-document (his version)
        // .select("-rooms")     //include parent and reviews only
        .exec(function(err,hotel){
            var thisReview;
            var response = {
                status :200,
                message:  null
            };
            if (err) {
                console.log ("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                response.status = 404;
                response.message = { "message": "Hotel not found"};

            } else {
                //get the review
                thisReview = hotel.reviews.id(reviewId);
                //if review doesn't exist returns null

                if(!thisReview) {

                    response.status = 404;
                    response.message = {"message": "Review not found"};
                }
            }


            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {

                //correct review found, delete it
                //find by id and remove this review from the array in one action....

                hotel.reviews.id(reviewId).remove();

                // then save the parent (and the childern at the same time)

                hotel.save(function(err,hotelUpdated) {

                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    }else {
                        res
                            .status(204)
                            .json();
                    }

                });
            }

        });
};






