var express = require('express');

var router = express.Router();   // instantiate a Router and name it 'router'

//take in the files where the controller code is  -- refer to them in 'router' paragraphs below

var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlSessions = require('../controllers/sessions.controllers.js');
//--------------------------------------------------------------------------------
// This is like a list of functions to call depending on route in to application...
// ie. for the route "localhost:3000/json"              call THIS function
// ...note have a SEPARATE  function call for different methods (.get  .post )
// also can list more than one function to be called: ie.authentication first, then
// call the real function...
//----------------------------------------------------------------------------------



router
    .route('/sessions')
    .get(ctrlSessions.sessionsGetAll) //controller name + method name from controller file
    // adding the step ctrlUsers.authenticate in front of the Get Step will check that the user is logged on
    // before allowing the Get step to continue. (using Firebase) in case request didn't come from a client.
  //   .get(ctrlUsers.authenticate,ctrlSessions.sessionsGetAll)
    .post(ctrlSessions.sessionsAddOne);  // if method is post, use this


router
    .route('/sessions/:userId')
    .get(ctrlSessions.sessionsGetAllByUserId) //controller name + method name from controller file

    // adding the step ctrlUsers.authenticate in front of the Get Step will check that the user is logged on
    // before allowing the Get step to continue. (using Firebase) in case request didn't come from a client.

   //    .get(ctrlUsers.authenticate,ctrlSessions.sessionsGetAllByUserId)



//sessionId is NAMED here as the parameter entered, and this name is PICKED UP  in sessions.controllers.js
router
    .route('/session/:sessionId')        // add parameter name :sessionId i.e. 'localhost:3000/api/sessions/12345'
    .get(ctrlSessions.sessionsGetOne)
    .put(ctrlSessions.sessionsUpdateOne)
    .delete(ctrlSessions.sessionsDeleteOne);








//Authentication routes     Note: login route is only used as an alternative to using Firebase.

router
   .route('/users/register')
   .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);


module.exports = router;   // export so it can be used in the main application app.js.
