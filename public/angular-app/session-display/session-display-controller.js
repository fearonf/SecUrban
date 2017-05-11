/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionController',SessionController);

function SessionController($route,$routeParams,sessionDataFactory, AuthFactory,jwtHelper,$window) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;

//this is called when a particular session is selected from the list of Sessions returned (from sessions.html)
    sessionDataFactory.sessionDisplay(id).then(function(response) {

        console.log(response);
        vm.session = response.data;

    });




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

        var postData = {
            name: vm.session.name,


            objectDescription : vm.session.objectDescription,
            informationDescription : vm.session.informationDescription,
            timeStamp: vm.session.timeStamp,
            objectQuestions: {
                answer1: vm.session.objectQuestions.answer1,

                comments1: vm.session.objectQuestions.comments1,
                answer2: vm.session.objectQuestions.answer2,
                comments2: vm.session.objectQuestions.comments2
            },
            peopleQuestions: {
                answer27: vm.session.answer27,
                comments27: vm.session.comments27,
                answer28: vm.session.answer28,
                comments28: vm.session.comments28
            },
            locationQuestions: {
                answer32: vm.session.answer32,
                comments32: vm.session.comments32,
                answer33: vm.session.answer33,
                comments33: vm.session.comments33
            },

            surroundingsQuestions: {
                answer39: vm.session.answer39,
                comments39: vm.session.comments39,
                answer40: vm.session.answer40,
                comments40: vm.session.comments40
            },
            measuresQuestions: {
                answer51: vm.session.answer51,
                comments51: vm.session.comments51,
                answer52: vm.session.answer52,
                comments52: vm.session.comments52,
                answer69: vm.session.answer69,
                comments69: vm.session.comments69,
                answer71: vm.session.answer71,
                comments71: vm.session.comments71
            }

        };


        if(vm.addForm.$valid) {

            sessionDataFactory.putSession(id,postData).then(function(response) {
                console.log(response);
                if (response.status === 204)
                {
                    $route.reload();
                }
            })
                .catch(function(error) {
                    console.log(error);
                });

        }
        else {

            vm.isSubmitted = true;
            console.log("invalid data");
        }

    };

    vm.deleteSession = function() {


        sessionDataFactory.deleteSession(id).then(function(response) {
            console.log(response);
            if (response.status === 204)
            {
                //  $route.reload();  don't reload, sessionid is no longer valid...
            }
        })
            .catch(function(error) {
                console.log(error);
            });



    };


}


