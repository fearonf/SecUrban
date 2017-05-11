/**
 * Created by frances.fearon on 26/04/2017.
 */

angular.module('secur')
    .controller('HotelsController',HotelsController);

//function HotelsController(hotelDataFactory,$route) {

// Ive added the $window and jwthelper just to decode the token and get the stuff from it
    function HotelsController(hotelDataFactory,$route,$window, jwtHelper,AuthFactory) {

    var vm = this;
    vm.title = 'MEAN Hotel App';
    vm.isSubmitted = false;


    //***************just seeing that i can get the token stuff here: Yes

   // var token = $window.sessionStorage.token;
  //  var decodedToken = jwtHelper.decodeToken(token);
  //  vm.loggedInUser = decodedToken.email;
  // console.log(decodedToken);

    ///**************************************************************


    hotelDataFactory.hotelList().then(function(response) {
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




        vm.addHotel = function() {
      // console.log("do they feel safe? ",vm.safe);
    /*   var postData = {
           name: vm.name,
           stars: vm.stars,
           services: vm.services,
           description: vm.description,
           currency: vm.currency,
           lng: vm.longitude,
           lat: vm.latitude

           };
           */


     //  if(vm.addForm.$valid) {
     //      hotelDataFactory.postNewHotel(postData).then(function(response)
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