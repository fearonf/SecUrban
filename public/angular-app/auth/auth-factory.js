/**
 * Created by frances.fearon on 03/05/2017.
 */
angular.module('secur')
    .factory('AuthFactory', AuthFactory);

function AuthFactory() {
    return {
        auth: auth
    };

    var auth = {
        isLoggedIn: false
    };

}