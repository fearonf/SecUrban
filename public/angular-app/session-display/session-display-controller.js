/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionController',SessionController);

function SessionController($route,$routeParams,sessionDataFactory, AuthFactory,jwtHelper,$window, $location) {
    var vm = this;
    console.log('start of session controller');
    var id = ($routeParams.id || null);
    vm.isSubmitted = false;
   vm.choices = ["","Yes", "No"];


    vm.sometimes = ["","No","Sometimes","Frequently"];
    vm.choicesQ64 = ["","Typical for shed","Typical for '50s style residence","Typical for modern residence", "Typical for villas/offices","Typical for banks and high-risk offices"];
    vm.choicesQ65 = ["","No or minimal measures","Adequate measures"];
    vm.choicesQ66 = ["","No Target removal measures","Minimisation of crowds and/or distractions"]
    vm.choicesQ67 = ["","No Directing traffic flows, Target removal or Control of disinhibitors measures taken",
        "Either Directing traffic flows, Target removal or control of disinhibitors","More than one type of measure adequately"];
    vm.choicesQ68 = ["","No Directing traffic flows, Access control or Target removal measures taken","Either Directing traffic flows, Access control or Target removal","More than one type of measure adequately"];
    vm.choicesQ69 = ["","No Directing traffic flows, Target removal or Removing means measures taken","Either Directing traffic flows, Target removal or Removing means","More than one type of measure adequately"];

    vm.choicesQ70 = ["","No target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control measures taken",
    "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control","More than one type of measure adequately"];
    vm.choicesQ71 = ["","No Directing traffic flows, Target removal or Removing means measures taken","Either Directing traffic flows, Target removal or Removing means","More than one type of measure adequately"];
    vm.choicesQ72 = ["","No Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening measures taken",
        "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening","More than one type of measure adequately"];
    vm.choicesQ73 = ["","No Target hardening, Directing traffic flows, Access control or Screening measures taken","Either Target hardening, Directing traffic flows, Access control or Screening","More than one type of measure adequately"];
    vm.choicesQ74 = ["","No Target hardening, Directing traffic flows, Target removal or Deflection measures taken","Either Target hardening, Directing traffic flows, Target removal or Deflection","More than one type of measure adequately"];
    vm.choicesQ75 = ["","No Target hardening, Target removal, Access control or Screening measures taken","Either Target hardening, Target removal, Access control or Screening","More than one type of measure adequately"];
    vm.choicesQ76 = ["","No Directing traffic flows or Facilitating compliance measures taken","Either Directing traffic flows or Facilitating compliance","More than one type of measure adequately"];



    vm.today = false;
    vm.filledPercentage = 100;


//get the survey 'section of the questions' that was displayed before now....this is to return to the same part
    // of the assesement when leave the screen (useful for next/prev buttons later )

    vm.showFlag = $window.localStorage && $window.localStorage.getItem('my-storage');





    if($window.sessionStorage.token) {
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        userId = decodedToken.email;
        console.log(vm.loggedInUser);
    } else {
        console.log("no token decoded, not logged in ");
    }



//this is called when a particular session is selected from the list of Sessions returned (from sessions.html)
    if(id) {
        sessionDataFactory.sessionDisplay(id).then(function (response) {

            console.log(response);
            vm.session = response.data;




        })
    } else {


        vm.session = {};
        vm.session.questions = [];

        //initialise the answer to blank as otherwise will get double blank answer first time through for dropdown
         for(i = 0; i < 76; i++)
         {

             vm.session.questions[i] = {};
             vm.session.questions[i].answer = "";
         }




        vm.timestamp = Date.now();
        vm.session.timestamp = vm.timestamp;

        vm.showFlag = 1;
        $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);



    };


//
    vm.objectButton = function() {

        //set which group of questions to show and save this in case of reentry, will return to same point
        vm.showFlag = 1;
         $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);


}

    vm.peopleButton = function() {


        vm.showFlag = 2;
        $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);


    }

    vm.locationButton = function() {


        vm.showFlag = 3;
        $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);

    }

    vm.surroundingsButton = function() {


        vm.showFlag = 4;
        $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);

    }
    vm.measuresButton = function() {


        vm.showFlag = 5;
        $window.localStorage && $window.localStorage.setItem('my-storage', vm.showFlag);

    }



    vm.isLoggedIn = function() {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };



    vm.updateSession = function() {

        // check for these details here in case update is called from select field rather than update button
        if (vm.session.name  && vm.session.objectDescription && vm.session.informationDescription) {

            if (vm.today) {
                vm.session.timestamp = Date.now();
            }


            var postData = {
                userId: vm.loggedInUser,
                name: vm.session.name,


                objectDescription: vm.session.objectDescription,
                informationDescription: vm.session.informationDescription,
                timestamp: vm.session.timestamp,


                questions: vm.session.questions

            };

                    // if id is present this is not a new assessement so use put to update
                    // if no id, this is a new assessement, create using  post

            if (id) {

                sessionDataFactory.putSession(id, postData).then(function (response) {
                    console.log(response);
                    if (response.status === 204) {


                        //   $window.location.href = '#!/session/'+vm.session._id;
                        //    $route.reload();
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
            else {

                sessionDataFactory.postNewSession(postData).then(function (response) {
                    console.log(response);
                    console.log(response.data._id);
                    if (response.status === 201) {

                        // once you've posted a new session, re enter via the session/id path so further updates are 'put'
                        //...rather than 'post'
                        // 'back' button will work by REPLACING the path in the history
                        $location.path('/session/' + response.data._id).replace();
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });


            }

        }
    };

    vm.deleteSession = function() {



        sessionDataFactory.deleteSession(id).then(function(response) {

            if (response.status === 204)
            {


                // sessionid is no longer valid...load sessions list route instead
                $location.path( '/sessions').replace();
            }
        })
            .catch(function(error) {
                console.log(error);
            });



    };

    vm.verifyProgress= function() {



        // Get the div you want to look in.
        var divPartOne = document.getElementById("formPartOne");
        var divMain = document.getElementById("assessementForm");

        // Get all the input fields inside your div
        var inputs = divPartOne.getElementsByTagName('input');
        var selects = divMain.getElementsByTagName('select');

        // Get the number of the found inputs.
        var totalInputs = inputs.length + selects.length;

        // Loop through them and check which of them has a value.
        var inputsWithValue = 0;
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].value !== '')
                inputsWithValue += 1;
        for (var i = 0; i < selects.length; i++) {


            if (selects[i].value !== '?' && selects[i].value !== '' && selects[i].value !=='string:')
                inputsWithValue += 1;
        }

        // Calculate the percentage.
        var filledPercentage = (inputsWithValue / totalInputs) * 100;


        $('#progressBar')
            .progress('set percent',filledPercentage);

        vm.filledPercentage = filledPercentage;
        if (vm.filledPercentage == 100)
        {
            $location.path( '/results/'+ id);


        }
        else
        {
            $('#progressMessage')

                .transition('fade')
            ;
        }




    }


}


