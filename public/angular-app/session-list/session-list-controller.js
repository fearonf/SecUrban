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


    //***************just seeing that i can get the token stuff here: Yes

    // var token = $window.sessionStorage.token;
    //  var decodedToken = jwtHelper.decodeToken(token);
    //  vm.loggedInUser = decodedToken.email;
    // console.log(decodedToken);

    ///**************************************************************


    sessionDataFactory.sessionList().then(function(response) {
        vm.sessions = response.data;
        console.log(response);

    });



    vm.isLoggedIn = function() {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };




    vm.addSession = function() {
        // console.log("do they feel safe? ",vm.safe);
        /*   var postData = {
         name: vm.name
         //
         //
         //more session fields here...............


         };
         */


        //  if(vm.addForm.$valid) {
        //      sessionDataFactory.postNewSession(postData).then(function(response)
        //          console.log(response);
        //           if (response.status === 201)
        //            {
        //                $route.reload();
        //            }
        //     })
        //             .catch(function(error) {
        //             console.log(error);
        //             });
//
        //      }
        //     else {
//
//           vm.isSubmitted = true;
//           console.log("invalid data");
//       }

    }

}
