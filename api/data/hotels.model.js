var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema( {
    name : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        min : 0,
        max : 5,
        required: true
    },
    review : {
        type: String,
        required: true
    },
    createdOn : {
        type: Date,
        "default" : Date.now
    }

});

var roomSchema = new mongoose.Schema( {
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number

});


var hotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    stars : {
        type: Number,
        min : 0,
        max : 5,
        "default": 0
    },
    services : [String],
    description: String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        // Always store coordinates Longitude (E/W), Latitude (N/S) order
        coordinates: {
            type: [Number],
            //additional property for location based searches - mongoose auto applies it
            index: '2dsphere'

        }

    }


});

//COMPILE the schema into a model for use by the application
// arguments are: model name, schema name, db Collection name
//Note: the db Collection name is not actually required, if not supplied,
// compiler will use a lower case, pluralised version of the model name: 'Hotel' => 'hotels'

mongoose.model('Hotel',hotelSchema, 'hotels');
