/**
 * Created by frances.fearon on 19/05/2017.
 */

angular.module('secur')
    .controller('ProfileController', ProfileController);

function ProfileController() {
    var vm = this;
    console.log("In profile controller");
    vm.filledPercentage = 9;




    vm.objectButton = function() {

        //set which group of questions to show and save this in case of reentry, will return to same point
        vm.showFlag = 1;
        vm.filledPercentage = 9;
        console.log("in object button");
        $('#messagetoclose')

            .transition('fade')
        ;


    }


}





