/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('secur')
    .controller('RegisterController', RegisterController);

function RegisterController($http, $route) {
    var vm = this;

    // vm.register is called directly from the register.html when 'submit' form
    // form validation ensures that email/password and company have been set before submit.
    // create a user object and pass it to the http end point


    vm.register = function () {

        vm.error = '';
        vm.message = '';

        var user = {
            username: vm.username,
            password: vm.password,
            name: vm.name,
            company: vm.company
        };


        // code added for firebase............CREATE A NEW USER USING FIREBASE
        var email = vm.username;
        var password = vm.password;
        //When firebase is called here...
        // if error returned is : 'The email is already in use...'
        // a Post failure (400) is returned first and this causes the screen to refresh
        // then the error message is returned but is not seen on the screen.
        // For other errors: There is no POST error, The error message is returned , vm.error is set and the error is seen on screen.
        //To get around this:
        //initialise error message to 'The email is already in use...'  If another error is returned it will
        // overwrite this error message.
        vm.error = 'The email address is already in use by another account.'

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            console.log("user created in firebase");


            //Create a new user in the secur database too, for user profile

            $http.post('/api/users/register', user).then(function (result) {


                vm.message = 'Registration successful';
                vm.error = '';

                $('#registerError')

                    .transition('hide')
                ;


            }).catch(function (error) {
                console.log(error);


            })

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;


            vm.error = errorMessage;
            vm.message = '';
            console.log(vm.error);
            $('#registerError')

                .transition('show')
            ;

        });


    }
};
