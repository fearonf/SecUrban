/**
 * Created by frances.fearon on 11/05/2017.
 */
var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema( {
  /*  questionNumber: {
  //  type: Number,
  //      min : 0,
  //      max : 100,
  //      required: true
  //  },
  */
    answer: String,
    comments: String
});





var sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    objectDescription: String,
    informationDescription: String,
    timestamp: {
        //type: String
        type: Date,
        "default": Date.now
    },


    objectQuestions: {
        answer1: String,
        comments1: String,
        answer2: String,
        comments2:String,
        answer3: String,
        comments3: String,
        answer4: String,
        comments4:String,
        answer5: String,
        comments5: String,
        answer6: String,
        comments6:String,
        answer7: String,
        comments7: String,
        answer8: String,
        comments8:String,
        answer9: String,
        comments9: String,
        answer10: String,
        comments10:String,
        answer11: String,
        comments11: String,
        answer12: String,
        comments12:String,
        answer13: String,
        comments13: String,
        answer14: String,
        comments14:String,
        answer15: String,
        comments15: String,
        answer16: String,
        comments16:String,
        answer17: String,
        comments17: String,
        answer18: String,
        comments18:String,
        answer19: String,
        comments19: String,
        answer20: String,
        comments20:String,
        answer21: String,
        comments21: String,
        answer22: String,
        comments22:String,
        answer23: String,
        comments23: String,
        answer24: String,
        comments24:String,
        answer25: String,
        comments25: String,
        answer26: String,
        comments26:String


    },

    peopleQuestions: {
        answer27: String,
        comments27: String,
        answer28: String,
        comments28:String,
        answer29: String,
        comments29: String,
        answer30: String,
        comments30:String,
        answer31: String,
        comments31: String

    },

    locationQuestions: {

        answer32: String,
        comments32: String,
        answer33: String,
        comments33: String,
        answer34: String,
        comments34: String,
        answer35: String,
        comments35: String,
        answer36: String,
        comments36: String,
        answer37: String,
        comments37: String,
        answer38: String,
        comments38: String

    },
    surroundingsQuestions:{

        answer39: String,
        comments39: String,
        answer40: String,
        comments40: String,
        answer41: String,
        comments41: String,
        answer42: String,
        comments42: String,
        answer43: String,
        comments43: String,
        answer44: String,
        comments44: String,
        answer45: String,
        comments45: String,
        answer46: String,
        comments46: String,
        answer47: String,
        comments47: String,
        answer48: String,
        comments48: String,
        answer49: String,
        comments49: String,
        answer50: String,
        comments50: String
    },

    measuresQuestions:{

        answer51: String,
        comments51: String,
        answer52: String,
        comments52: String,
        answer53: String,
        comments53: String,
        answer54: String,
        comments54: String,
        answer55: String,
        comments55: String,
        answer56: String,
        comments56: String,
        answer57: String,
        comments57: String,
        answer58: String,
        comments58: String,
        answer59: String,
        comments59: String,
        answer60: String,
        comments60: String,
        answer61: String,
        comments61: String,
        answer62: String,
        comments62: String,
        answer63: String,
        comments63: String,
        answer64: String,
        comments64: String,
        answer65: String,
        comments65: String,
        answer66: String,
        comments66: String,
        answer67: String,
        comments67: String,
        answer68: String,
        comments68: String,
        answer69: String,
        comments69: String,
        answer70: String,
        comments70: String,
        answer71: String,
        comments71: String,
        answer72: String,
        comments72: String,
        answer73: String,
        comments73: String,
        answer74: String,
        comments74: String,
        answer75: String,
        comments75: String,
        answer76: String,
        comments76: String


    }

});




//COMPILE the schema into a model for use by the application
// arguments are: model name, schema name, db Collection name
//Note: the db Collection name is not actually required, if not supplied,
// compiler will use a lower case, pluralised version of the model name: 'Hotel' => 'hotels'

mongoose.model('Session',sessionSchema, 'sessions');

