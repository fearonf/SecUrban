/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionsController',SessionsController);

//function HotelsController(hotelDataFactory,$route) {

// Ive added the $window and jwthelper just to decode the token and get the stuff from it
function SessionsController(sessionDataFactory,$route,$window, jwtHelper,AuthFactory) {

    var vm = this;
    vm.title = 'Secur App';
    vm.isSubmitted = false;
    var userId;
    const futureAnalyticsUser = 'future@gmail.com';


    //***************just seeing that i can get the token stuff here: Yes
    if($window.sessionStorage.token) {
         var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.email;
          userId = decodedToken.email;
         console.log(vm.loggedInUser);
    }

    ///**************************************************************

    if (userId == futureAnalyticsUser)
    { sessionDataFactory.sessionListAll().then(function (response) {
        vm.sessions = response.data;
        console.log(response);

    })

    }else {
        sessionDataFactory.sessionList(userId).then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        });
    }



    vm.isLoggedIn = function() {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };






}
