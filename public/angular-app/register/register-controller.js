/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('secur')
    .controller('RegisterController',RegisterController);

function RegisterController($http,$route) {
    var vm = this;

    // vm.register is called directly from the register.html when 'submit' form
    // collect user information from the form
    // create a user object and pass it to the http end point

    vm.register = function() {
        console.log("in register controller");
       vm.error = '';
       vm.message='';
      //  console.log (vm.registerForm.$valid);
       // console.log (vm.registerForm.$dirty);
        var user = {
            username: vm.username,
            password: vm.password,
            company: vm.company
        };

    // if username or password not entered, set error message
        if(!vm.username || !vm.password) {
            vm.error = 'Please add a username and password.';
        }  else {
            if (!(vm.password == vm.passwordRepeat)) {
                vm.error = 'Please make sure the passwords match.';
            } else {
                if (!vm.company) {
                    vm.error = 'Please enter company';
                } else {


                    // code added for firebase............CREATE A NEW USER USING FIREBASE   any email/password will do
                    var email = vm.username;
                    var password = vm.password;
                    vm.error = "just before firebase call";
                   // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
                        console.log("user created in firebase");

                        //Create a new user in the secur database too, for user profile

                         $http.post('/api/users/register',user).then(function(result) {
                             console.log("User profile added to secur database too")
                             console.log(result);
                             vm.message = 'Successful registration, please login.';

                         }).catch(function(error) {
                             console.log(error);

                         })



                    }) .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        // ...

                        vm.error = errorMessage;
                        vm.message='';
                        console.log(vm.error);

                    });


                }
            }
        }

    }
};
