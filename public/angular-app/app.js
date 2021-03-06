/**
 * Created by frances.fearon on 26/04/2017.
 */
angular.module('secur', ['ngRoute','angular-jwt']).config(config).run(run);


function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider

        .when('/', {
        templateUrl: 'angular-app/main/main.html',
        //access property tells if authorisation (token) required or not
        // see in the 'run' function below....this property is checked for true/false
        //before allow jump to next route...
        access: {
            restricted: false
        }

    })
        .when('/home', {
            templateUrl: 'angular-app/main/home.html',

            access: {
                restricted: false
            }

        })


        .when('/sessions',{
            templateUrl: 'angular-app/session-list/sessions.html',
            controller: SessionsController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }

        })

        .when('/session/:id',  {

            templateUrl: 'angular-app/session-display/session.html',

            controller: SessionController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }

        })
        .when('/session',  {

            templateUrl: 'angular-app/session-display/session.html',
            controller: SessionController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }

        })
        .when('/register' , {

        templateUrl: 'angular-app/register/register.html',
        controller: RegisterController,
        controllerAs: 'vm',
            access: {
                restricted: false
            }
    })
        .when('/profile', {
            templateUrl: 'angular-app/profile/profile.html',
            controller: ProfileController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })

        .when('/results/:id', {
            templateUrl: 'angular-app/results/results.html',
            controller: ResultsController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })

            //if no paths match, just redirect to root of application
        .otherwise( {
            redirectTo: '/'

    });




}

function run($rootScope, $location, $window, AuthFactory) {

    //listening on the rootScope for an event called $routeChangeStart

    $rootScope.$on('$routeChangeStart', function(event,nextRoute,currentRoute){

        //first check if access to the next route has to be checked at all...(i.e. 'access: {restricted:t/f})
        //if the 'access' parameter of the next route EXISTS (i.e. set to true/false)
        // ...and we don't have a token;
        // and user is not logged in
        // don't allow access to the event i.e. don't navigate to that path
        //...and redirect the user to the root.
        console.log('At route change');
        console.log("This is the token...:" + $window.sessionStorage.token); //whole token (encoded) avail here
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token
        && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }

    })

}
