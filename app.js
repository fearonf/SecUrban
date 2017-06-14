//open the connection ONCE when the application starts.....
// and just reuse it then (using 'get' method in controller...


require('./api/data/db.js');

var express = require('express'); //delivered
var app = express();
var path = require('path'); //delivered func



// body parser reads the body (fields) of the form and passes to controller (req.body)
var bodyParser = require('body-parser');


var routes = require('./api/routes');

app.set('port',3000); //set the port this app will listen on .

//when this app.use function is BEFORE the express static, you see  ALL the get requests for the static files in the log
//eg. bootstrap, css images etc
//this logs an entry for every request made...

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});



//NOTE STATIC FILES ---------------------------------------------------------------------------------
//will put static information in here to pass via express i.e. public folder
//ie put all your static stuff in the public folder and point to it once
// then express will look in this folder first for any route

app.use(express.static(path.join(__dirname, 'public'))); //accepts localhost:3000
app.use('/node_modules',express.static(__dirname + '/node_modules'));


//---------------------------------------------------------------------------------------
//body parser use is put here because it is to be run BEFORE any of the routing calls
//body parser is about collecting data from a form and passing it in to app (post)
// in sessions.controllers.js, the data is picked up from  req.body

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//NOTE: POINT to routes folder -----------------------------------------------------------
//this will look in 'routes' folder for ALL routes in to application
//app.use('/',routes);

// this will only look in 'routes' folder for routes '/api'

app.use('/api',routes);





//assign app.listen object(returned from function) to a variable..can access properties then
var server = app.listen(app.get('port'),function () {//callback function when app.listen is finished running
    var port = server.address().port; //extract port number from server object returned from app.listen
    console.log("Magic happens on port " + port);

});


