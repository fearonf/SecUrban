/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('secur').directive('mhNavigation',mhNavigation);

function mhNavigation() {

    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'

    };
}
