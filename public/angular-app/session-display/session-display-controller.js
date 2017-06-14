/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionController',SessionController);

function SessionController($route,$routeParams,sessionDataFactory, AuthFactory,jwtHelper,$window, $location) {
    var vm = this;
    console.log('start of session controller');
    var id = ($routeParams.id || null);
    vm.isSubmitted = false;
    vm.choices = ["","Yes", "No"];
    vm.sometimes = ["","No","Sometimes","Frequently"];
    vm.choicesQ64 = ["","Typical for shed","Typical for '50s style residence","Typical for modern residence", "Typical for villas/offices","Typical for banks and high-risk offices"];
    vm.choicesQ65 = ["","No or minimal measures","Adequate measures"];
    vm.choicesQ66 = ["","No Target removal measures","Minimisation of crowds and/or distractions"]
    vm.choicesQ67 = ["","No Directing traffic flows, Target removal or Control of disinhibitors measures taken",
        "Either Directing traffic flows, Target removal or control of disinhibitors","More than one type of measure adequately"];
    vm.choicesQ68 = ["","No Directing traffic flows, Access control or Target removal measures taken","Either Directing traffic flows, Access control or Target removal"];
    vm.choicesQ69 = ["","No Directing traffic flows, Target removal or Removing means measures taken","Either Directing traffic flows, Target removal or Removing means"];

    vm.choicesQ70 = ["","No target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control measures taken",
    "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control","More than one type of measure adequately"];
    vm.choicesQ71 = ["","No Directing traffic flows, Target removal or Removing means measures taken","Either Directing traffic flows, Target removal or Removing means "];
    vm.choicesQ72 = ["","No Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening measures taken",
        "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening "];
    vm.choicesQ73 = ["","No Target hardening, Directing traffic flows, Access control or Screening measures taken","Either Target hardening, Directing traffic flows, Access control or Screening"];
    vm.choicesQ74 = ["","No Target hardening, Directing traffic flows, Target removal or Deflection measures taken","Either Target hardening, Directing traffic flows, Target removal or Deflection "];
    vm.choicesQ75 = ["","No Target hardening, Target removal, Access control or Screening measures taken","Either Target hardening, Target removal, Access control or Screening "];
    vm.choicesQ76 = ["","No Directing traffic flows or Facilitating compliance measures taken","Either Directing traffic flows or Facilitating compliance "];
    vm.showObjectQuestions = false;
    vm.showPeopleQuestions = false;
    vm.showLocationQuestions = false;
    vm.showSurroundingsQuestions = false;
    vm.showMeasuresQuestions = false;
    vm.today = false;

//this is called when a particular session is selected from the list of Sessions returned (from sessions.html)
    if(id) {
        sessionDataFactory.sessionDisplay(id).then(function (response) {

            console.log(response);
            vm.session = response.data;

            //keep this its for loading the returned answers into an array for the algotithm
        //    var questionArray = [String];
        //    questionArray[0] = vm.session.objectQuestions.answer1;
        //    console.log("questionArray[0] " + questionArray[0]);


        })
    } else {
        vm.session = {};
        vm.session.objectQuestions  = {};
        vm.session.objectQuestions.answer1 = '';
        vm.session.objectQuestions.answer2 = '';
        vm.session.objectQuestions.answer3 = '';
        vm.session.objectQuestions.answer4 = '';

        vm.session.objectQuestions.answer5 = '';
        vm.session.objectQuestions.answer6 = '';
        vm.session.objectQuestions.answer7 = '';
        vm.session.objectQuestions.answer8 = '';
        vm.session.objectQuestions.answer9 = '';
        vm.session.objectQuestions.answer10 = '';
        vm.session.objectQuestions.answer11 = '';
        vm.session.objectQuestions.answer12 = '';

        vm.session.objectQuestions.answer13 = '';
        vm.session.objectQuestions.answer14 = '';
        vm.session.objectQuestions.answer15 = '';
        vm.session.objectQuestions.answer16 = '';
        vm.session.objectQuestions.answer17 = '';
        vm.session.objectQuestions.answer18 = '';
        vm.session.objectQuestions.answer19 = '';
        vm.session.objectQuestions.answer20 = '';
        vm.session.objectQuestions.answer21 = '';
        vm.session.objectQuestions.answer22 = '';
        vm.session.objectQuestions.answer23 = '';
        vm.session.objectQuestions.answer24 = '';

        vm.session.objectQuestions.answer25 = '';
        vm.session.objectQuestions.answer26 = '';


        vm.session.peopleQuestions = {};
        vm.session.peopleQuestions.answer27 = '';
        vm.session.peopleQuestions.answer28 = '';
        vm.session.peopleQuestions.answer29 = '';
        vm.session.peopleQuestions.answer30 = '';
        vm.session.peopleQuestions.answer31 = '';


        vm.session.locationQuestions = {};
        vm.session.locationQuestions.answer32 = '';
        vm.session.locationQuestions.answer33 = '';
        vm.session.locationQuestions.answer34 = '';
        vm.session.locationQuestions.answer35 = '';
        vm.session.locationQuestions.answer36 = '';
        vm.session.locationQuestions.answer37 = '';
        vm.session.locationQuestions.answer38 = '';


        vm.session.surroundingsQuestions = {};
        vm.session.surroundingsQuestions.answer39 = '';
        vm.session.surroundingsQuestions.answer40 = '';
        vm.session.surroundingsQuestions.answer41 = '';
        vm.session.surroundingsQuestions.answer42 = '';
        vm.session.surroundingsQuestions.answer43 = '';
        vm.session.surroundingsQuestions.answer44 = '';
        vm.session.surroundingsQuestions.answer45 = '';
        vm.session.surroundingsQuestions.answer46 = '';
        vm.session.surroundingsQuestions.answer47 = '';
        vm.session.surroundingsQuestions.answer48 = '';
        vm.session.surroundingsQuestions.answer49 = '';
        vm.session.surroundingsQuestions.answer50 = '';

        vm.session.measuresQuestions = {};
        vm.session.measuresQuestions.answer51 = '';
        vm.session.measuresQuestions.answer52 = '';
        vm.session.measuresQuestions.answer53 = '';
        vm.session.measuresQuestions.answer54 = '';
        vm.session.measuresQuestions.answer55 = '';
        vm.session.measuresQuestions.answer56 = '';
        vm.session.measuresQuestions.answer57 = '';
        vm.session.measuresQuestions.answer58 = '';
        vm.session.measuresQuestions.answer59 = '';
        vm.session.measuresQuestions.answer60 = '';
        vm.session.measuresQuestions.answer61 = '';
        vm.session.measuresQuestions.answer62 = '';
        vm.session.measuresQuestions.answer63 = '';
        vm.session.measuresQuestions.answer64 = '';
        vm.session.measuresQuestions.answer65 = '';
        vm.session.measuresQuestions.answer66 = '';
        vm.session.measuresQuestions.answer67 = '';
        vm.session.measuresQuestions.answer68 = '';
        vm.session.measuresQuestions.answer69 = '';
        vm.session.measuresQuestions.answer70 = '';
        vm.session.measuresQuestions.answer71 = '';
        vm.session.measuresQuestions.answer72 = '';
        vm.session.measuresQuestions.answer73 = '';
        vm.session.measuresQuestions.answer74 = '';
        vm.session.measuresQuestions.answer75 = '';
        vm.session.measuresQuestions.answer76 = '';


        vm.timestamp = Date.now();
        vm.session.timestamp = vm.timestamp;
    };


//
    vm.objectButton = function() {
    console.log ("objbuttonpressed");
    vm.showObjectQuestions = true;
    vm.showPeopleQuestions = false;
    vm.showLocationQuestions = false;
    vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;

}

    vm.peopleButton = function() {

        console.log ("pplbuttonpressed");
        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = true;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;


    }

    vm.locationButton = function() {

        vm.showLocationQuestions = true;
        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;

    }

    vm.surroundingsButton = function() {

        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = true;
        vm.showMeasuresQuestions = false;

    }
    vm.measuresButton = function() {

        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = true;

    }

    // added to check user is logged in before adding a review
    // code is the same as in  the login-controller.js controller

    vm.isLoggedIn = function() {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    //this is called from the input form submit part of the session.html
    // where  ng-submit="vm.addReview()"
    //** note: vm.isSubmitted is in order to catch the fact that the form has been submitted
    //...from this point on, error messages will be shown on screen

   /* vm.addReview = function() {

        //capture the user name from the token (in session storage)

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        //var username = token.username;
        var username = token.email;

        var postData = {
            //use username from the token instead of entered field
            // name: vm.name,
            name: username,
            rating: vm.rating,
            review: vm.review
        };

        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id,postData).then(function(response) {
                console.log(response);
                // if(response.status === 200) {  //it is 201 for a successful posting not 200
                if (response.status === 201) {

                    $route.reload();

                }
            })
                .catch(function(error) {
                    console.log(error);
                });
        }else {
            vm.isSubmitted = true;
        }
    };

    */

    vm.updateSession = function() {

        console.log(vm.session.timestamp);
        console.log(vm.timestamp);
        if(vm.today) {
            vm.session.timestamp = Date.now();
        }
        if (!vm.session.objectQuestions)
        {
            vm.session.objectQuestions = {};
        };
        if (!vm.session.peopleQuestions)
        {
            vm.session.peopleQuestions = {};
        };
        if (!vm.session.locationQuestions)
        {
            vm.session.locationQuestions = {};
        };
        if (!vm.session.surroundingsQuestions)
        {
            vm.session.surroundingsQuestions = {};
        };
        if (!vm.session.measuresQuestions)
        {
            vm.session.measuresQuestions = {};
        };


        var postData = {

            name: vm.session.name,


            objectDescription : vm.session.objectDescription,
            informationDescription : vm.session.informationDescription,
            timestamp: vm.session.timestamp,

            objectQuestions: {
                answer1: vm.session.objectQuestions.answer1,
                comments1: vm.session.objectQuestions.comments1,
                answer2: vm.session.objectQuestions.answer2,
                comments2: vm.session.objectQuestions.comments2,
                answer3: vm.session.objectQuestions.answer3,
                comments3: vm.session.objectQuestions.comments3,
                answer4: vm.session.objectQuestions.answer4,
                comments4: vm.session.objectQuestions.comments4,
                answer5: vm.session.objectQuestions.answer5,
                comments5: vm.session.objectQuestions.comments5,
                answer6: vm.session.objectQuestions.answer6,
                comments6: vm.session.objectQuestions.comments6,
                answer7: vm.session.objectQuestions.answer7,
                comments7: vm.session.objectQuestions.comments7,
                answer8: vm.session.objectQuestions.answer8,
                comments8: vm.session.objectQuestions.comments8,
                answer9: vm.session.objectQuestions.answer9,
                comments9: vm.session.objectQuestions.comments9,
                answer10: vm.session.objectQuestions.answer10,
                comments10: vm.session.objectQuestions.comments10,
                answer11: vm.session.objectQuestions.answer11,
                comments11: vm.session.objectQuestions.comments11,
                answer12: vm.session.objectQuestions.answer12,
                comments12: vm.session.objectQuestions.comments12,
                answer13: vm.session.objectQuestions.answer13,
                comments13: vm.session.objectQuestions.comments13,
                answer14: vm.session.objectQuestions.answer14,
                comments14: vm.session.objectQuestions.comments14,
                answer15: vm.session.objectQuestions.answer15,
                comments15: vm.session.objectQuestions.comments15,
                answer16: vm.session.objectQuestions.answer16,
                comments16: vm.session.objectQuestions.comments16,
                answer17: vm.session.objectQuestions.answer17,
                comments17: vm.session.objectQuestions.comments17,
                answer18: vm.session.objectQuestions.answer18,
                comments18: vm.session.objectQuestions.comments18,
                answer19: vm.session.objectQuestions.answer19,
                comments19: vm.session.objectQuestions.comments19,
                answer20: vm.session.objectQuestions.answer20,
                comments20: vm.session.objectQuestions.comments20,
                answer21: vm.session.objectQuestions.answer21,
                comments21: vm.session.objectQuestions.comments21,
                answer22: vm.session.objectQuestions.answer22,
                comments22: vm.session.objectQuestions.comments22,
                answer23: vm.session.objectQuestions.answer23,
                comments23: vm.session.objectQuestions.comments23,
                answer24: vm.session.objectQuestions.answer24,
                comments24: vm.session.objectQuestions.comments24,
                answer25: vm.session.objectQuestions.answer25,
                comments25: vm.session.objectQuestions.comments25,
                answer26: vm.session.objectQuestions.answer26,
                comments26: vm.session.objectQuestions.comments26
            },
            peopleQuestions: {
                answer27: vm.session.peopleQuestions.answer27,
                comments27: vm.session.peopleQuestions.comments27,
                answer28: vm.session.peopleQuestions.answer28,
                comments28: vm.session.peopleQuestions.comments28,
                answer29: vm.session.peopleQuestions.answer29,
                comments29: vm.session.peopleQuestions.comments29,
                answer30: vm.session.peopleQuestions.answer30,
                comments30: vm.session.peopleQuestions.comments30,
                answer31: vm.session.peopleQuestions.answer31,
                comments31: vm.session.peopleQuestions.comments31

            },
            locationQuestions: {
                answer32: vm.session.locationQuestions.answer32,
                comments32: vm.session.locationQuestions.comments32,
                answer33: vm.session.locationQuestions.answer33,
                comments33: vm.session.locationQuestions.comments33,
                answer34: vm.session.locationQuestions.answer34,
                comments34: vm.session.locationQuestions.comments34,
                answer35: vm.session.locationQuestions.answer35,
                comments35: vm.session.locationQuestions.comments35,
                answer36: vm.session.locationQuestions.answer36,
                comments36: vm.session.locationQuestions.comments36,
                answer37: vm.session.locationQuestions.answer37,
                comments37: vm.session.locationQuestions.comments37,
                answer38: vm.session.locationQuestions.answer38,
                comments38: vm.session.locationQuestions.comments38


            },

            surroundingsQuestions: {
                answer39: vm.session.surroundingsQuestions.answer39,
                comments39: vm.session.surroundingsQuestions.comments39,
                answer40: vm.session.surroundingsQuestions.answer40,
                comments40: vm.session.surroundingsQuestions.comments40,
                answer41: vm.session.surroundingsQuestions.answer41,
                comments41: vm.session.surroundingsQuestions.comments41,
                answer42: vm.session.surroundingsQuestions.answer42,
                comments42: vm.session.surroundingsQuestions.comments42,
                answer43: vm.session.surroundingsQuestions.answer43,
                comments43: vm.session.surroundingsQuestions.comments43,
                answer44: vm.session.surroundingsQuestions.answer44,
                comments44: vm.session.surroundingsQuestions.comments44,
                answer45: vm.session.surroundingsQuestions.answer45,
                comments45: vm.session.surroundingsQuestions.comments45,
                answer46: vm.session.surroundingsQuestions.answer46,
                comments46: vm.session.surroundingsQuestions.comments46,
                answer47: vm.session.surroundingsQuestions.answer47,
                comments47: vm.session.surroundingsQuestions.comments47,
                answer48: vm.session.surroundingsQuestions.answer48,
                comments48: vm.session.surroundingsQuestions.comments48,
                answer49: vm.session.surroundingsQuestions.answer49,
                comments49: vm.session.surroundingsQuestions.comments49,
                answer50: vm.session.surroundingsQuestions.answer50,
                comments50: vm.session.surroundingsQuestions.comments50
            },
            measuresQuestions: {
                answer51: vm.session.measuresQuestions.answer51,
                comments51: vm.session.measuresQuestions.comments51,
                answer52: vm.session.measuresQuestions.answer52,
                comments52: vm.session.measuresQuestions.comments52,
                answer53: vm.session.measuresQuestions.answer53,
                comments53: vm.session.measuresQuestions.comments53,
                answer54: vm.session.measuresQuestions.answer54,
                comments54: vm.session.measuresQuestions.comments54,
                answer55: vm.session.measuresQuestions.answer55,
                comments55: vm.session.measuresQuestions.comments55,
                answer56: vm.session.measuresQuestions.answer56,
                comments56: vm.session.measuresQuestions.comments56,
                answer57: vm.session.measuresQuestions.answer57,
                comments57: vm.session.measuresQuestions.comments57,
                answer58: vm.session.measuresQuestions.answer58,
                comments58: vm.session.measuresQuestions.comments58,
                answer59: vm.session.measuresQuestions.answer59,
                comments59: vm.session.measuresQuestions.comments59,
                answer60: vm.session.measuresQuestions.answer60,
                comments60: vm.session.measuresQuestions.comments60,
                answer61: vm.session.measuresQuestions.answer61,
                comments61: vm.session.measuresQuestions.comments61,
                answer62: vm.session.measuresQuestions.answer62,
                comments62: vm.session.measuresQuestions.comments62,
                answer63: vm.session.measuresQuestions.answer63,
                comments63: vm.session.measuresQuestions.comments63,
                answer64: vm.session.measuresQuestions.answer64,
                comments64: vm.session.measuresQuestions.comments64,
                answer65: vm.session.measuresQuestions.answer65,
                comments65: vm.session.measuresQuestions.comments65,
                answer66: vm.session.measuresQuestions.answer66,
                comments66: vm.session.measuresQuestions.comments66,
                answer67: vm.session.measuresQuestions.answer67,
                comments67: vm.session.measuresQuestions.comments67,
                answer68: vm.session.measuresQuestions.answer68,
                comments68: vm.session.measuresQuestions.comments68,
                answer69: vm.session.measuresQuestions.answer69,
                comments69: vm.session.measuresQuestions.comments69,
                answer70: vm.session.measuresQuestions.answer70,
                comments70: vm.session.measuresQuestions.comments70,
                answer71: vm.session.measuresQuestions.answer71,
                comments71: vm.session.measuresQuestions.comments71,
                answer72: vm.session.measuresQuestions.answer72,
                comments72: vm.session.measuresQuestions.comments72,
                answer73: vm.session.measuresQuestions.answer73,
                comments73: vm.session.measuresQuestions.comments73,
                answer74: vm.session.measuresQuestions.answer74,
                comments74: vm.session.measuresQuestions.comments74,
                answer75: vm.session.measuresQuestions.answer75,
                comments75: vm.session.measuresQuestions.comments75,
                answer76: vm.session.measuresQuestions.answer76,
                comments76: vm.session.measuresQuestions.comments76



            }

        };


       // if(vm.addForm.$valid) {
            if(id) {

            sessionDataFactory.putSession(id,postData).then(function(response) {
                console.log(response);
                if (response.status === 204)
                {


                 //   $window.location.href = '#!/session/'+vm.session._id;
                      $route.reload();
                }
            })
                .catch(function(error) {
                    console.log(error);
                });

        }
        else {

                sessionDataFactory.postNewSession(postData).then(function(response) {
                    console.log(response);
                    console.log(response.data._id);
                    if (response.status === 201)
                    {

                       // this works, but the back arrow gets confused...
                   //     $window.location.href = '#!/session/'+response.data._id;
                   //     $route.reload();

                    // trying this to see if 'back' button will work by REPLACING the path in the history
                        $location.path( '/session/'+response.data._id).replace();
                    }
                })
                    .catch(function(error) {
                        console.log(error);
                    });

           // vm.isSubmitted = true;
           // console.log("invalid data");
        }

    };

    vm.deleteSession = function() {

        console.log("about to delete the session");
        console.log(id);

        sessionDataFactory.deleteSession(id).then(function(response) {
            console.log(response);
            if (response.status === 204)
            {
                //this works, but the back arrow gets confused .... trying replace() instead...seems better.
              //  $window.location.href = '#!/sessions';

              //   $route.reload();  // sessionid is no longer valid...load sessions list route instead
                $location.path( '/sessions').replace();
            }
        })
            .catch(function(error) {
                console.log(error);
            });



    };


}


