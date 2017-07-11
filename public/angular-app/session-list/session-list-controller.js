/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionsController', SessionsController);


function SessionsController(sessionDataFactory, $route, $window, jwtHelper, AuthFactory) {

    var vm = this;
    vm.title = 'Secur App';
    vm.isSubmitted = false;
    var userId;
    const futureAnalyticsUser = 'future@gmail.com';
    //initialise the sidebar option to show 'object questions' part of survey, when a session is chosen from the list
    vm.showFlag = 1;
    $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);


    //*************** get the token stuff here
    if ($window.sessionStorage.token) {
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        userId = decodedToken.email;
        console.log(vm.loggedInUser);
    }

    ///**************************************************************

    if (userId == futureAnalyticsUser) {
        sessionDataFactory.sessionListAll().then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        })

    } else {
        sessionDataFactory.sessionList(userId).then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        });
    }


    vm.isLoggedIn = function () {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };


}
