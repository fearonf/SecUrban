/**
 * Created by frances.fearon on 11/05/2017.
 */
var mongoose = require('mongoose');

/*var questionSchema = new mongoose.Schema( {
    questionNumber: {
    type: Number,
        min : 0,
        max : 100,
        required: true
    },
    answer: String,
    comments: String
});
*/




var sessionSchema = new mongoose.Schema({
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
    objectQuestions: {
        answer1: String,
        comments1: String,
        answer2: String,
        comments2:String
    },
    peopleQuestions: {
        answer27: String,
        comments27: String,
        answer28: String,
        comments28:String
    },

    locationQuestions: {

        answer32: String,
        comments32: String,
        answer33: String,
        comments33: String
    },
    surroundingsQuestions:{

        answer39: String,
        comments39: String,
        answer40: String,
        comments40: String
    },

    measuresQuestions:{

        answer51: String,
        comments51: String,
        answer52: String,
        comments52: String,
        answer69: String,
        comments69: String,
        answer71: String,
        comments71: String
    }

});




//COMPILE the schema into a model for use by the application
// arguments are: model name, schema name, db Collection name
//Note: the db Collection name is not actually required, if not supplied,
// compiler will use a lower case, pluralised version of the model name: 'Hotel' => 'hotels'

mongoose.model('Session',sessionSchema, 'sessions');

