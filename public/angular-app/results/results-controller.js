/**
 * Created by frances.fearon on 15/06/2017.
 */
angular.module('secur')
    .controller('ResultsController',ResultsController);

function ResultsController($routeParams,sessionDataFactory,$window, jwtHelper) {
    var vm = this;


    var userId;
    var myChart;
    vm.compareSession = '';


    const futureAnalyticsUser = 'future@gmail.com';





    // This is the list of question numbers to consider for each classification:
    // Note: the question number 'n' from the assessement will correspond the answer in slot 'n-1' of the array of answers (array start at zero)
    // a value of '1' in all slots listed means 100%; so the 100% value is equal to the length of tha array in each case.


    var burglary = [1, 2, 3, 29, 30, 31, 33, 34, 39, 51, 57, 58, 62, 64];
    var ramRaid = [7, 11, 31, 32, 40, 52, 65];
    var pickPocketing = [13, 15, 16, 17, 27, 31, 41, 57, 60, 66];
    var robbery = [10, 27, 30, 31, 36, 42, 56, 57, 60, 67];
    var raid = [5, 8, 9, 31, 49, 52, 59, 76];
    var vehicleTheft = [4, 6, 12, 30, 31, 33, 34, 43, 53, 54, 55, 57, 68];
    var assault = [13, 14, 15, 17, 18, 31, 44, 54, 55, 56, 57, 60, 61, 69];
    var sexualAssault = [12, 13, 17, 28, 31, 35, 45, 54, 55, 56, 57, 60, 61, 70];
    var vandalism = [5, 13, 15, 19, 31, 37, 46, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 71];
    var graffiti = [5, 20, 31, 37, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 74];
    var massKilling = [15, 16, 26, 50, 56, 60, 75];
    var destructionByRiot = [13, 15, 17, 18, 31, 38, 47, 60, 72];
    var destructionByFanatic = [21, 22, 23, 24, 25, 26, 50, 56, 60, 73];

    var burglaryWeights = [1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1];
    var ramRaidWeights = [1,1,1,1,1,-1,-1];
    var pickPocketingWeights = [1,1,1,1,1,1,1,-1,-1,-1];
    var robberyWeights = [1,1,1,1,1,1,-1,-1,-1,-1];
    var raidWeights = [1,1,1,1,1,-1,-1,-1];
    var vehicleTheftWeights = [1,1,1,1,1,1,1,1,-0.33,-0.33,-0.33,-1,-1];
    var assaultWeights = [1,1,1,1,1,1,1,-0.25,-0.25,-0.5,-1,-0.5,-0.5,-1];
    var sexualAssaultWeights = [1,1,1,1,1,1,1,-0.25,-0.25,-0.5,-1,-0.5,-0.5,-1];
    var vandalismWeights = [1,1,1,1,1,1,1,-0.333,-0.333,-0.167,-0.167,-1,-0.25,-0.25,-0.25,-0.25,-1,-1,-1];
    var graffitiWeights = [1,1,1,1,1,-0.25,-0.25,-0.25,-0.25,-1,-0.25,-0.25,-0.25,-0.25,-1,-1,-1];
    var massKillingWeights = [1,1,1,1,-1,-1,-1];
    var destructionByRiotWeights = [1,1,1,1,1,1,1,-1,-1];
    var destructionByFanaticWeights = [1,1,1,1,1,1,1,-1,-1,-1];

    //calculate the maximum figure - the total of the questions with positive weights
    var max = 0;
    burglaryWeights.forEach(addToMax);
    burglaryMax = max;
    max = 0;
    ramRaidWeights.forEach(addToMax);
    ramRaidMax = max;
    max = 0;
    pickPocketingWeights.forEach(addToMax);
    pickPocketingMax = max;
    max = 0;
    robberyWeights.forEach(addToMax);
    robberyMax = max;
    max = 0;
    vehicleTheftWeights.forEach(addToMax);
    vehicleTheftMax = max;
    max = 0;
    assaultWeights.forEach(addToMax);
    assaultMax = max;
    max = 0;
    sexualAssaultWeights.forEach(addToMax);
    sexualAssaultMax = max;
    max = 0;
    raidWeights.forEach(addToMax);
    raidMax = max;
    max = 0;
    vandalismWeights.forEach(addToMax);
    vandalismMax = max;
    max = 0;
    graffitiWeights.forEach(addToMax);
    graffitiMax = max;
    max = 0;
    massKillingWeights.forEach(addToMax);
    massKillingMax = max;
    max = 0;
    destructionByRiotWeights.forEach(addToMax);
    destructionByRiotMax = max;
    max = 0;
    destructionByFanaticWeights.forEach(addToMax);
    destructionByFanaticMax = max;

    vm.name = "";


    label1 = "Burglary (residential)";
    label2 = "Ram raid";
    label3 = "Pickpocketing";

    label4 = "Robbery";
    label5 = "Vehicle theft";
    label6 = "Assault";
    label7 = "Sexual Assault";
    label8 = "Vandalism";
    label9 = "Destruction by riot";

    label10 = "Destruction by fanatic";
    label11 = "Graffiti";
    label12 = "Mass killing";
    label13 = "Raid";

    vm.test1 = 15;
    vm.test2 = 6;
    vm.test3 = 70;
    vm.test4 = 88;
    vm.test5 = 9;
    vm.test6 = 22

    vm.test7 = 1;
    vm.test8 = 66;
    vm.test9 = 77;
    vm.test10 = 24;
    vm.test11 = 9;
    vm.test12 = 11;
    vm.test13 = 4;

    vm.questionArray = [];


    if($window.sessionStorage.token) {
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        userId = decodedToken.email;
        console.log(vm.loggedInUser);
    }


    if (userId == futureAnalyticsUser)
    { sessionDataFactory.sessionListAll().then(function (response) {
        vm.sessions = response.data;
        console.log(response);

    })

    }else {
        sessionDataFactory.sessionList(userId).then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        });
    }




    var id = ($routeParams.id || null); // get id passed from session details screen.
    console.log("This is the id received");
    console.log(id);


     sessionDataFactory.sessionDisplay(id).then(function (response) {

         console.log(response);

         vm.session = response.data;
         //save session details before being overwritten by second assessement
         vm.session1 = response.data;






         // Calculate a full set of results for the current assessement (vm.session)

         CalculateResults();
          vm.graphOutput = [graphItem1, graphItem2, graphItem3, graphItem4, graphItem5, graphItem6, graphItem7, graphItem8,
                graphItem9, graphItem10, graphItem11, graphItem12, graphItem13];

         vm.graphOutputSorted = [graphItem1, graphItem2, graphItem3, graphItem4, graphItem5, graphItem6, graphItem7, graphItem8,
             graphItem9, graphItem10, graphItem11, graphItem12, graphItem13];

         vm.graphOutputSorted.sort(function(a, b){return b.value - a.value});





     });







    function addToMax(item, index) {
        if(item > 0) {
            max = max + item;
        }
    };



    // Calculate a set of results for the current assessemtent (vm.session)
        function CalculateResults() {


            //  convert the answers  into numbers using the conversion table : 'No' = 0; 'Yes' = 1; etc
            var questionArray = [];

        for (i = 0; i < 16; i++)
        {
            if (vm.session.questions[i].answer == "Yes") {
                questionArray[i] = 1
            } else {
                questionArray[i] = 0
            }
        }
            ;


            if (vm.session.questions[16].answer == "Sometimes") {
                questionArray[16] = 0.5
            }
            else if (vm.session.questions[16].answer == "Frequently") {
                questionArray[16] = 1
            }
            else {
                questionArray[16] = 0
            }
            ;
            if (vm.session.questions[17].answer == "Sometimes") {
                questionArray[17] = 0.5
            }
            else if (vm.session.questions[17].answer == "Frequently") {
                questionArray[17] = 1
            }
            else {
                questionArray[17] = 0
            }
            ;

            for (i = 18; i < 63; i++)
            {
                if (vm.session.questions[i].answer == "Yes") {
                    questionArray[i] = 1
                } else {
                    questionArray[i] = 0
                }
            }
            ;




            if (vm.session.questions[63].answer == "Typical for banks and high-risk offices") {
                questionArray[63] = 1
            }
            else if (vm.session.questions[63].answer == "Typical for villas/offices") {
                questionArray[63] = 0.75
            }
            else if (vm.session.questions[63].answer == "Typical for modern residence") {
                questionArray[63] = 0.5
            }
            else if (vm.session.questions[63].answer == "Typical for 50s style residence") {
                questionArray[63] = 0.25
            }
            else {
                questionArray[63] = 0
            }
            ;

            if (vm.session.questions[64].answer == "Adequate measures") {
                questionArray[64] = 1
            }
            else {
                questionArray[64] = 0
            }
            ;

            if (vm.session.questions[65].answer  == "Minimisation of crowds and/or distractions") {
                questionArray[65] = 1
            }
            else {
                questionArray[65] = 0
            }
            ;

            if (vm.session.questions[66].answer == "More than one type of measure adequately") {
                questionArray[66] = 1
            }
            else if (vm.session.questions[66].answer  == "Either Directing traffic flows, Target removal or control of disinhibitors") {
                questionArray[66] = 0.5
            }
            else {
                questionArray[66] = 0
            }
            ;

            if (vm.session.questions[67].answer  == "More than one type of measure adequately") {
                questionArray[67] = 1
            }
            else if (vm.session.questions[67].answer  == "Either Directing traffic flows, Access control or Target removal") {
                questionArray[67] = 0.5
            }
            else {
                questionArray[67] = 0
            }
            ;

            if (vm.session.questions[68].answer  == "More than one type of measure adequately") {
                questionArray[68] = 1
            }
            else if (vm.session.questions[68].answer  == "Either Directing traffic flows, Target removal or Removing means") {
                questionArray[68] = 0.5
            }
            else {
                questionArray[68] = 0
            }
            ;


            if (vm.session.questions[69].answer  == "More than one type of measure adequately") {
                questionArray[69] = 1
            }
            else if (vm.session.questions[69].answer  == "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control") {
                questionArray[69] = 0.5
            }
            else {
                questionArray[69] = 0
            }
            ;


            if (vm.session.questions[70].answer  == "More than one type of measure adequately") {
                questionArray[70] = 1
            }
            else if (vm.session.questions[70].answer  == "Either Directing traffic flows, Target removal or Removing means") {
                questionArray[70] = 0.5
            }
            else {
                questionArray[70] = 0
            }
            ;

            if (vm.session.questions[71].answer  == "More than one type of measure adequately") {
                questionArray[71] = 1
            }
            else if (vm.session.questions[71].answer  == "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening") {
                questionArray[71] = 0.5
            }
            else {
                questionArray[71] = 0
            }
            ;

            if (vm.session.questions[72].answer  == "More than one type of measure adequately") {
                questionArray[72] = 1
            }
            else if (vm.session.questions[72].answer  == "Either Target hardening, Directing traffic flows, Access control or Screening") {
                questionArray[72] = 0.5
            }
            else {
                questionArray[72] = 0
            }
            ;


            if (vm.session.questions[73].answer  == "More than one type of measure adequately") {
                questionArray[73] = 1
            }
            else if (vm.session.questions[73].answer  == "Either Target hardening, Directing traffic flows, Target removal or Deflection") {
                questionArray[73] = 0.5
            }
            else {
                questionArray[73] = 0
            }
            ;


            if (vm.session.questions[74].answer  == "More than one type of measure adequately") {
                questionArray[74] = 1
            }
            else if (vm.session.questions[74].answer  == "Either Target hardening, Target removal, Access control or Screening") {
                questionArray[74] = 0.5
            }
            else {
                questionArray[74] = 0
            }
            ;

            if (vm.session.questions[75].answer == "More than one type of measure adequately") {
                questionArray[75] = 1
            }
            else if (vm.session.questions[75].answer  == "Either Directing traffic flows or Facilitating compliance") {
                questionArray[75] = 0.5
            }
            else {
                questionArray[75] = 0
            }
            ;





            // each element in the array is a question number, take one off this number to give the index to the question array (zero start array)
            //...then add the score (for this question) to the running total.
            var total = 0;
            var weightsArray = burglaryWeights;
            burglary.forEach(addToTotal);

            //calculate the percentage
            burglaryPercent = total / burglaryMax * 100;

            total = 0;
            weightsArray = ramRaidWeights;
            ramRaid.forEach(addToTotal);
            ramRaidPercent = total / ramRaidMax * 100;

            total = 0;
            weightsArray = pickPocketingWeights;
            pickPocketing.forEach(addToTotal);
            pickPocketingPercent = total / pickPocketingMax * 100;

            total = 0;
            weightsArray = robberyWeights;
            robbery.forEach(addToTotal);
            robberyPercent = total / robberyMax * 100;


            total = 0;
            weightsArray = raidWeights;
            raid.forEach(addToTotal);
            raidPercent = total /  raidMax * 100;

            total = 0;
            weightsArray = vehicleTheftWeights;
            vehicleTheft.forEach(addToTotal);
            vehicleTheftPercent = total / vehicleTheftMax * 100;

            total = 0;
            weightsArray = assaultWeights;
            assault.forEach(addToTotal);
            assaultPercent = total /  assaultMax * 100;

            total = 0;
            weightsArray = sexualAssaultWeights;
            sexualAssault.forEach(addToTotal);
            sexualAssaultPercent = total /  sexualAssaultMax * 100;

            total = 0;
            weightsArray = vandalismWeights;
            vandalism.forEach(addToTotal);
            vandalismPercent = total / vandalismMax * 100;

            total = 0;
            weightsArray = graffitiWeights;
            graffiti.forEach(addToTotal);
            graffitiPercent = total / graffitiMax * 100;

            total = 0;
            weightsArray = massKillingWeights;
            massKilling.forEach(addToTotal);
            massKillingPercent = total /  massKillingMax * 100;

            total = 0;
            weightsArray = destructionByRiotWeights;
            destructionByRiot.forEach(addToTotal);
            destructionByRiotPercent = total /destructionByRiotMax * 100;

            total = 0;
            weightsArray = destructionByFanaticWeights;
            destructionByFanatic.forEach(addToTotal);
            destructionByFanaticPercent = total /destructionByFanaticMax * 100;



            function addToTotal(item, index) {

                total = total + questionArray[item - 1] * weightsArray[index];
            }








            graphItem1 = {
                label: label1,
                value: burglaryPercent
            };
            graphItem2 = {
                label: label2,
                value: ramRaidPercent
            };
            graphItem3 = {
                label: label3,
                value: pickPocketingPercent
            }
            graphItem4 = {
                label: label4,
                value: robberyPercent
            };
            graphItem5 = {
                label: label5,
                value: vehicleTheftPercent
            };
            graphItem6 = {
                label: label6,
                value: assaultPercent
            };
            graphItem7 = {
                label: label7,
                value: sexualAssaultPercent
            };
            graphItem8 = {
                label: label8,
                value: vandalismPercent
            };
            graphItem9 = {
                label: label9,
                value: destructionByRiotPercent
            }
            graphItem10 = {
                label: label10,
                value: destructionByFanaticPercent
            };
            graphItem11 = {
                label: label11,
                value: graffitiPercent
            };
            graphItem12 = {
                label: label12,
                value: massKillingPercent
            };
            graphItem13 = {
                label: label13,
                value: raidPercent
            }





        }







    vm.Graph = function () {


        console.log(vm.compareSession);

        //var id2 = vm.compareSession._id;



        sessionDataFactory.sessionDisplay(vm.compareSession._id).then(function (response) {

            console.log(response);

            vm.session = response.data;


            // Calculate a full set of results for the second assessement (vm.session)

            CalculateResults();

            vm.graphOutputReference = [graphItem1, graphItem2, graphItem3, graphItem4, graphItem5, graphItem6, graphItem7, graphItem8,
                graphItem9, graphItem10, graphItem11, graphItem12, graphItem13];

            DrawGraph();
            SortandGraph();
            GraphCompare();

        });
    }


DrawGraph = function() {


        var ctx = document.getElementById("Chart1").getContext('2d');
        var myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label,vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label,vm.graphOutput[9].label, vm.graphOutput[10].label,vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutput[0].value, vm.graphOutput[1].value, vm.graphOutput[2].value, vm.graphOutput[3].value, vm.graphOutput[4].value,
                        vm.graphOutput[5].value,vm.graphOutput[6].value, vm.graphOutput[7].value, vm.graphOutput[8].value,vm.graphOutput[9].value, vm.graphOutput[10].value,vm.graphOutput[11].value, vm.graphOutput[12].value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                    {
                        label: vm.session.name,
                        data: [vm.graphOutputReference[0].value, vm.graphOutputReference[1].value, vm.graphOutputReference[2].value, vm.graphOutputReference[3].value, vm.graphOutputReference[4].value,
                            vm.graphOutputReference[5].value,vm.graphOutputReference[6].value, vm.graphOutputReference[7].value, vm.graphOutputReference[8].value,vm.graphOutputReference[9].value, vm.graphOutputReference[10].value,vm.graphOutputReference[11].value, vm.graphOutputReference[12].value],

                        backgroundColor: 'rgba(255, 206, 86, 0.4)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    } ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Indication that attention is required'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }
        });


    };

    vm.GraphOneSession = function () {



        var ctx = document.getElementById("Chart1").getContext('2d');

         var myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label,vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label,vm.graphOutput[9].label, vm.graphOutput[10].label,vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutput[0].value, vm.graphOutput[1].value, vm.graphOutput[2].value, vm.graphOutput[3].value, vm.graphOutput[4].value,
                        vm.graphOutput[5].value,vm.graphOutput[6].value, vm.graphOutput[7].value, vm.graphOutput[8].value,vm.graphOutput[9].value, vm.graphOutput[10].value,vm.graphOutput[11].value, vm.graphOutput[12].value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
                     ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Indication that attention is required'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }
        });



        //Call function to draw the sorted version of this graph.

        SortandGraphOneSession();
    };

    SortandGraph = function () {
      

       // vm.graphOutput.sort(function(a, b){return b.value - a.value});

        vm.sortGraphOutput = [];
        for (i = 0; i < vm.graphOutput.length; i++)
        {
            vm.sortGraphOutput[i] =
                {
                    current:vm.graphOutput[i],
                    reference: vm.graphOutputReference[i]
                }
        }


        vm.sortGraphOutput.sort(function(a,b) {return b.current.value - a.current.value});




        var ctx = document.getElementById("Chart2").getContext('2d');
        var myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.sortGraphOutput[0].current.label, vm.sortGraphOutput[1].current.label, vm.sortGraphOutput[2].current.label, vm.sortGraphOutput[3].current.label, vm.sortGraphOutput[4].current.label,
                    vm.sortGraphOutput[5].current.label,vm.sortGraphOutput[6].current.label, vm.sortGraphOutput[7].current.label, vm.sortGraphOutput[8].current.label,vm.sortGraphOutput[9].current.label, vm.sortGraphOutput[10].current.label,vm.sortGraphOutput[11].current.label, vm.sortGraphOutput[12].current.label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.sortGraphOutput[0].current.value, vm.sortGraphOutput[1].current.value, vm.sortGraphOutput[2].current.value, vm.sortGraphOutput[3].current.value, vm.sortGraphOutput[4].current.value,
                        vm.sortGraphOutput[5].current.value,vm.sortGraphOutput[6].current.value, vm.sortGraphOutput[7].current.value, vm.sortGraphOutput[8].current.value,vm.sortGraphOutput[9].current.value, vm.sortGraphOutput[10].current.value,vm.sortGraphOutput[11].current.value, vm.sortGraphOutput[12].current.value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                    {
                        label: vm.session.name,
                        data: [vm.sortGraphOutput[0].reference.value, vm.sortGraphOutput[1].reference.value, vm.sortGraphOutput[2].reference.value, vm.sortGraphOutput[3].reference.value, vm.sortGraphOutput[4].reference.value,
                            vm.sortGraphOutput[5].reference.value,vm.sortGraphOutput[6].reference.value, vm.sortGraphOutput[7].reference.value, vm.sortGraphOutput[8].reference.value,vm.sortGraphOutput[9].reference.value, vm.sortGraphOutput[10].reference.value,vm.sortGraphOutput[11].reference.value, vm.sortGraphOutput[12].reference.value],

                        backgroundColor: 'rgba(255, 206, 86, 0.4)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    } ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Indication that attention is required'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }
        });




    };

    SortandGraphOneSession = function () {





        var ctx = document.getElementById("Chart2").getContext('2d');
        var  myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutputSorted[0].label, vm.graphOutputSorted[1].label, vm.graphOutputSorted[2].label, vm.graphOutputSorted[3].label, vm.graphOutputSorted[4].label,
                    vm.graphOutputSorted[5].label,vm.graphOutputSorted[6].label, vm.graphOutputSorted[7].label, vm.graphOutputSorted[8].label,vm.graphOutputSorted[9].label, vm.graphOutputSorted[10].label,vm.graphOutputSorted[11].label, vm.graphOutputSorted[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutputSorted[0].value, vm.graphOutputSorted[1].value, vm.graphOutputSorted[2].value, vm.graphOutputSorted[3].value, vm.graphOutputSorted[4].value,
                        vm.graphOutputSorted[5].value,vm.graphOutputSorted[6].value, vm.graphOutputSorted[7].value, vm.graphOutputSorted[8].value,vm.graphOutputSorted[9].value, vm.graphOutputSorted[10].value,vm.graphOutputSorted[11].value, vm.graphOutputSorted[12].value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]

            },
            options: {
                title: {
                    display: true,
                    text: 'Indication that attention is required'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }
        });




    };


    GraphCompare = function () {

        var ctx = document.getElementById("Chart3").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label,vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label,vm.graphOutput[9].label, vm.graphOutput[10].label,vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: 'Comparison with reference scanario',

                    data: [vm.graphOutput[0].value - vm.graphOutputReference[0].value, vm.graphOutput[1].value - vm.graphOutputReference[1].value,vm.graphOutput[2].value - vm.graphOutputReference[2].value,vm.graphOutput[3].value - vm.graphOutputReference[3].value
                        ,vm.graphOutput[4].value - vm.graphOutputReference[4].value,vm.graphOutput[5].value - vm.graphOutputReference[5].value,
                    vm.graphOutput[6].value - vm.graphOutputReference[6].value,vm.graphOutput[7].value - vm.graphOutputReference[7].value,vm.graphOutput[8].value - vm.graphOutputReference[8].value,vm.graphOutput[9].value - vm.graphOutputReference[9].value,
                        vm.graphOutput[10].value - vm.graphOutputReference[10].value,vm.graphOutput[11].value - vm.graphOutputReference[11].value,
                        vm.graphOutput[12].value - vm.graphOutputReference[12].value ],
                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {

                scales: {
                    yAxes: [{

                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }
        });


    };



    vm.Graph3 = function () {

        var ctx = document.getElementById("myChart").getContext('2d');

        var original = Chart.defaults.global.legend.onClick;
        Chart.defaults.global.legend.onClick = function (e, legendItem) {
            update_caption(legendItem);
            original.call(this, e, legendItem);
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [{
                    label: 'apples',
                    backgroundColor: "rgba(153,255,51,1)",
                    data: [12, 19, 3, 17, 28, 24, 7],
                }, {
                    label: 'oranges',
                    backgroundColor: "rgba(255,153,0,1)",
                    data: [30, 29, 5, 5, 20, 3, 10],
                }]
            }
        });

        var labels = {
            "apples": true,
            "oranges": true
        };

        var caption = document.getElementById("caption");

        var update_caption = function (legend) {
            labels[legend.text] = legend.hidden;

            var selected = Object.keys(labels).filter(function (key) {
                return labels[key];
            });

            var text = selected.length ? selected.join(" & ") : "nothing";

            caption.innerHTML = "The chart is displaying " + text;
        };
    }

    vm.ChooseWhatToDo = function() {
        console.log("CHoosing which set of graphs to do now...");
        console.log("vm.compareSession" + vm.compareSession);
        if(!vm.compareSession)
        {
            vm.GraphOneSession();
        }
        else
        {
            vm.Graph();
        }
    }



}