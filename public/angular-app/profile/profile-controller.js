/**
 * Created by frances.fearon on 19/05/2017.
 */

angular.module('secur')
    .controller('ProfileController',ProfileController);

function ProfileController() {
    var vm = this;
    vm.name = "";
    vm.message = "message in modal";
    vm.choices = ["","Yes", "No", "Not Sure"];
    vm.testfield = 'blank';

    // vm.register is called directly from the register.html when 'submit' form
    // collect user information from the form
    // create a user object and pass it to the http end point

    vm.Register = function () {
        console.log("in profile controller going to delete");
        console.log(vm.testfield);
        console.log(vm.username);



    };
}










