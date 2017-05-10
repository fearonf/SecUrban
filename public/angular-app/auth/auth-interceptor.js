/**
 * Created by frances.fearon on 03/05/2017.
 */
//SEE app.js where this is added to the very top as push('AuthInterceptor') for every restricted:true route
angular.module('meanhotel')
    .factory('AuthInterceptor', AuthInterceptor);

//This will intercept the http requests that we make
// and if they are going to an endpoint that requires a token,
// it will automatically attach that token to the request


function AuthInterceptor($q,$window, AuthFactory,$location) {
//like data-factory, has to return an object
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config) {
        //if the configuration has headers, use those, or use an empty object
        config.headers = config.headers || {};
        //if token is stored in session storage for browser...get it
        if ($window.sessionStorage.token) {
            /// attach a new authorization header with the token ****NOTE: 'Bearer ' (with ONE space after Bearer!!'
            config.headers.Authorization = 'Bearer '+ $window.sessionStorage.token;
        }
        //return the new config
        return config;

    }

    function response(response) {
        if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn = true;
        }
        //if resonse from back end if a 401 = unauthorised
        if (response.status === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);

    }
    function  responseError(rejection) {
        // 401 is unauthorised and 403 is 'no token provided'
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            //set location to the root of the application
            $location.path('/');
        }
        return $q.reject(rejection);


    }


}


