/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('secur')
    .controller('LoginController', LoginController);

function LoginController($http,$location,$window, AuthFactory, jwtHelper,$route) {
    var vm = this;

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };



  /* vm.isLoggedIn = function() {
       firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
               // User is signed in
            //   console.log("is logged in has returned a true");
            //   console.log(user);

              return true;
           } else {
               // No user is signed in.
               return false;
           }
       })

    };
    */

    vm.login = function() {

        console.log ("in login function");
        console.log(vm.username);
        //if username and password exist..create user object to send to backend
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password :vm.password
            };


           ///LOGIN USING FIREBASE          ***********************

            var email = vm.username;
            var password = vm.password;
          //  vm.authData = null;

            firebase.auth().signInWithEmailAndPassword(email, password).then (function(response) {

                console.log("User has signed in....");
                console.log(response);
                AuthFactory.isLoggedIn = true;
                vm.authData = response;
                vm.error = '';
                $window.sessionStorage.token = response.Yd;
                AuthFactory.isLoggedIn = true;

                //store the session storage token in a variable and then decode it
                //can now use the stuff you get from the token
                var token = $window.sessionStorage.token;
                var decodedToken = jwtHelper.decodeToken(token);
                vm.loggedInUser = decodedToken.email;
                vm.error = '';
                console.log(decodedToken);
                console.log(vm.loggedInUser);

            //THIS reloads the page - showing the new options that are available now that user is logged in ...

                $route.reload();




            })
            .catch(function(error) {
                // Handle Errors here.

                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage);
                vm.error = 'Incorrect username or password';
               // $location.path( "/" );
               $route.reload();

            })



         /*   $http.post('/api/users/login', user).then(function(response){
                //if login response received (ie not error) and = 'success', store the token in the session storage
                //note: the 'success' tag was added in the json return response in users.controllers.js
                // picked up from here in auth-interceptor.js
                // and set logged in to 'true//'

                if (response.data.success) {

                    //***THIS is where the Token is STORED  in the $window.sessionStorage ***

                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    console.log(response);
                    //store the session storage token in a variable and then decode it
                    //can now use the stuff you get from the token
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                    vm.error = '';



                }
            })
                .catch(function(error) {
                    console.log(error);
                    vm.error = 'Incorrect username or password';
                })
*/
        }


    };
    vm.logout = function() {

        //logout with FIREBASE **************
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("sign out was successful");
            //vm.message = null;
           // vm.error = null;
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });






        //set logged in to false and delete the session storage token
        //also, redirect the user to the root path
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;

        //THIS relocates to main page after logoff !!!!!!!!!!!!!
       $window.location.href = '/';



    }


    // not connected with authorisation - keeps track of the current active
    vm.isActiveTab = function(url) {
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }

}