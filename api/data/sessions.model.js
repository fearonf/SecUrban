/**
 * Created by frances.fearon on 11/05/2017.
 */
var mongoose = require('mongoose');


var sessionSchema = new mongoose.Schema({
    userId: String,
    name: {
        type: String,
        required: true
    },

    objectDescription: String,
    informationDescription: String,
    timestamp: {

        type: Date,
        "default": Date.now
    },
    questions: {}


});


//COMPILE the schema into a model for use by the application
// arguments are: model name, schema name, db Collection name
//Note: the db Collection name is not actually required, if not supplied,
// compiler will use a lower case, pluralised version of the model name: 'Session' => 'sessions'

mongoose.model('Session', sessionSchema, 'sessions');

