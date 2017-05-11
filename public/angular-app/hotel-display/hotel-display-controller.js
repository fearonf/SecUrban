/**
 * Created by frances.fearon on 26/04/2017.
 */
angular.module('secur')
    .controller('HotelController',HotelController);

function HotelController($route,$routeParams,hotelDataFactory, AuthFactory,jwtHelper,$window) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;

//this is called when a particular hotel is selected from the list of hotels returned (from hotels.html)
    hotelDataFactory.hotelDisplay(id).then(function(response) {

        console.log(response);
         vm.session = response.data;
        // vm.stars = _getStarRating(response.data.stars);


    });


    //this is a function to take the number, stars
    // and to generate an array of length stars
    // ie if the stars = '4' you'll get an array of length 4 (with four 'null' values in it)
   function _getStarRating(stars) {


       return new Array(stars);
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

   //this is called from the input form submit part of the hotel.html
    // where  ng-submit="vm.addReview()"
    //** note: vm.isSubmitted is in order to catch the fact that the form has been submitted
    //...from this point on, error messages will be shown on screen

   vm.addReview = function() {

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

    vm.updateHotel = function() {

        var postData = {
            name: vm.hotel.name,
            stars: vm.hotel.stars,
            services: vm.hotel.services,
            description: vm.hotel.description,
            currency: vm.hotel.currency,
            lng: vm.hotel.location.coordinates[0],
            lat: vm.hotel.location.coordinates[1]

        };


          if(vm.addForm.$valid) {
              hotelDataFactory.putHotel(id,postData).then(function(response) {
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

    vm.deleteHotel = function() {


            hotelDataFactory.deleteHotel(id).then(function(response) {
                console.log(response);
                if (response.status === 204)
                {
                  //  $route.reload();  don't reload, hotelid is no longer valid...
                }
            })
                .catch(function(error) {
                    console.log(error);
                });



    };


}

