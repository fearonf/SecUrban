/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('meanhotel')
    .controller('RegisterController',RegisterController);

function RegisterController($http) {
    var vm = this;

    // vm.register is called directly from the register.html when 'submit' form
    // collect user information from the form
    // create a user object and pass it to the http end point

    vm.register = function() {
        var user = {
            username: vm.username,
            password: vm.password
        };

    // if username or password not entered, set error message
        if(!vm.username || !vm.password) {
            vm.error = 'Please add a username and password.';
        }  else {
            if (!(vm.password == vm.passwordRepeat)) {
                vm.error = 'Please make sure the passwords match.';
            } else {


                // code added for firebase............CREATE A NEW USER USING FIREBASE   any email/password will do
                var email = vm.username;
                var password = vm.password;
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log(errorMessage);
                });
                console.log("user created?");

               // $http.post('/api/users/register',user).then(function(result) {
               //     console.log(result);
               //     vm.message = 'Successful registration, please login.';
               //     vm.error = '';
               // }).catch(function(error) {
               //     console.log(error);
               // });
            }
        }

    }
};
