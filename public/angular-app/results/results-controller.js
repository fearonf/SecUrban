/**
 * Created by frances.fearon on 15/06/2017.
 */
angular.module('secur')
    .controller('ResultsController', ResultsController);

function ResultsController($routeParams, sessionDataFactory, $window, jwtHelper) {
    var vm = this;


    var userId;
    var myChart;
    var myChart2;
    var myChart3;
    vm.compareSession = '';
    vm.showQuestionList = false;
    vm.showCompareGraph = false;


    const futureAnalyticsUser = 'future@gmail.com';


    // This is the list of question numbers to consider for each classification:
    // Note: the question number 'n' from the assessement will correspond the answer in slot 'n-1' of the array of answers (array index starts at zero)


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

    var burglaryWeights = [1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1];
    var ramRaidWeights = [1, 1, 1, 1, 1, -1, -1];
    var pickPocketingWeights = [1, 1, 1, 1, 1, 1, 1, -1, -1, -1];
    var robberyWeights = [1, 1, 1, 1, 1, 1, -1, -1, -1, -1];
    var raidWeights = [1, 1, 1, 1, 1, -1, -1, -1];
    var vehicleTheftWeights = [1, 1, 1, 1, 1, 1, 1, 1, -0.33, -0.33, -0.33, -1, -1];
    var assaultWeights = [1, 1, 1, 1, 1, 1, 1, -0.25, -0.25, -0.5, -1, -0.5, -0.5, -1];
    var sexualAssaultWeights = [1, 1, 1, 1, 1, 1, 1, -0.25, -0.25, -0.5, -1, -0.5, -0.5, -1];
    var vandalismWeights = [1, 1, 1, 1, 1, 1, 1, -0.333, -0.333, -0.167, -0.167, -1, -0.25, -0.25, -0.25, -0.25, -1, -1, -1];
    var graffitiWeights = [1, 1, 1, 1, 1, -0.25, -0.25, -0.25, -0.25, -1, -0.25, -0.25, -0.25, -0.25, -1, -1, -1];
    var massKillingWeights = [1, 1, 1, 1, -1, -1, -1];
    var destructionByRiotWeights = [1, 1, 1, 1, 1, 1, 1, -1, -1];
    var destructionByFanaticWeights = [1, 1, 1, 1, 1, 1, 1, -1, -1, -1];


    //******************************************************************************************************************
    //calculate the maximum figure - at present, using the total of the questions with positive weights
    //this is just the max positive number that a score can be... - this calculation of 'what is 100%' will change
    // depending on last bit of algorithm when this is available.
    //******************************************************************************************************************

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


    vm.questionArray = [];


    if ($window.sessionStorage.token) {
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        userId = decodedToken.email;
        console.log(vm.loggedInUser);
    }


    if (userId == futureAnalyticsUser) {
        sessionDataFactory.sessionListAll().then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        })

    } else {
        sessionDataFactory.sessionList(userId).then(function (response) {
            vm.sessions = response.data;
            console.log(response);

        });
    }


    var id = ($routeParams.id || null); // get id passed from session details screen.


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

        vm.graphOutputSorted.sort(function (a, b) {
            return b.value - a.value
        });

        //save the relevant list of questions for this session;
        vm.burglaryRelevantQuestions = burglaryRelevantQuestions;
        vm.ramRaidRelevantQuestions = ramRaidRelevantQuestions;
        vm.pickPocketingRelevantQuestions = pickPocketingRelevantQuestions;
        vm.robberyRelevantQuestions = robberyRelevantQuestions;
        vm.raidRelevantQuestions = raidRelevantQuestions;
        vm.vehicleTheftRelevantQuestions = vehicleTheftRelevantQuestions;
        vm.assaultRelevantQuestions = assaultRelevantQuestions;
        vm.sexualAssaultRelevantQuestions = sexualAssaultRelevantQuestions;
        vm.vandalismRelevantQuestions = vandalismRelevantQuestions;
        vm.graffitiRelevantQuestions = graffitiRelevantQuestions;
        vm.massKillingRelevantQuestions = massKillingRelevantQuestions;
        vm.destructionByRiotRelevantQuestions = destructionByRiotRelevantQuestions;
        vm.destructionByFanaticRelevantQuestions = destructionByFanaticRelevantQuestions;


        vm.ChooseWhatToDo();


    });


    function addToMax(item, index) {
        if (item > 0) {
            max = max + item;
        }
    };


    // Calculate a set of results for the current assessemtent (vm.session)
    function CalculateResults() {

        //reset questions that depend on other questions (if user has saved answers that shouldn't be included in calculations)
        //Note: these must be blanked out here so that they will excluded later from the 'relevantQuestions' array.

        // if answer 1 is blank or 'No' answers 2,3,4,39,51,53,58,64 are not valid so set all of it to space (including the comments)
        //if answer 5 is blank or 'No' answers 6,7,8,9,49,52,59,76 are not valid
        //if answer 10 is blank or 'No' answers 11,32,40,65 are not valid
        //if answer 12 is blank or 'No' answer 55 is not valid
        //if answer 51,52,53,54,55,56 are all blank  or 'No' answer 57 is not valid


        if (vm.session.questions[0].answer != 'Yes') {

            vm.session.questions[1] = '';
            vm.session.questions[2] = '';
            vm.session.questions[3] = '';
            vm.session.questions[38] = '';
            vm.session.questions[50] = '';
            vm.session.questions[52] = '';
            vm.session.questions[57] = '';
            vm.session.questions[63] = '';
        }
        ;
        if (vm.session.questions[4].answer != 'Yes') {

            vm.session.questions[5] = '';
            vm.session.questions[6] = '';
            vm.session.questions[7] = '';
            vm.session.questions[8] = '';
            vm.session.questions[48] = '';
            vm.session.questions[51] = '';
            vm.session.questions[58] = '';
            vm.session.questions[75] = '';
        }
        ;
        if (vm.session.questions[9].answer != 'Yes') {

            vm.session.questions[10] = '';
            vm.session.questions[31] = '';
            vm.session.questions[39] = '';
            vm.session.questions[64] = '';
        }
        ;
        if (vm.session.questions[11].answer != 'Yes') {

            vm.session.questions[54] = '';
        }
        ;

        if (vm.session.questions[50].answer != 'Yes' && vm.session.questions[51].answer != 'Yes' && vm.session.questions[52].answer != 'Yes' &&
            vm.session.questions[53].answer != 'Yes' && vm.session.questions[54].answer != 'Yes' && vm.session.questions[55].answer != 'Yes') {

            vm.session.questions[56] = '';
        }
        ;


        //  convert the answers  into numbers using the conversion table : 'No' = 0; 'Yes' = 1; etc
        var questionArray = [];

        for (i = 0; i < 16; i++) {
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

        for (i = 18; i < 63; i++) {
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
        else if (vm.session.questions[63].answer == "Typical for '50s style residence") {
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

        if (vm.session.questions[65].answer == "Minimisation of crowds and/or distractions") {
            questionArray[65] = 1
        }
        else {
            questionArray[65] = 0
        }
        ;

        if (vm.session.questions[66].answer == "More than one type of measure adequately") {
            questionArray[66] = 1
        }
        else if (vm.session.questions[66].answer == "Either Directing traffic flows, Target removal or control of disinhibitors") {
            questionArray[66] = 0.5
        }
        else {
            questionArray[66] = 0
        }
        ;

        if (vm.session.questions[67].answer == "More than one type of measure adequately") {
            questionArray[67] = 1
        }
        else if (vm.session.questions[67].answer == "Either Directing traffic flows, Access control or Target removal") {
            questionArray[67] = 0.5
        }
        else {
            questionArray[67] = 0
        }
        ;

        if (vm.session.questions[68].answer == "More than one type of measure adequately") {
            questionArray[68] = 1
        }
        else if (vm.session.questions[68].answer == "Either Directing traffic flows, Target removal or Removing means") {
            questionArray[68] = 0.5
        }
        else {
            questionArray[68] = 0
        }
        ;


        if (vm.session.questions[69].answer == "More than one type of measure adequately") {
            questionArray[69] = 1
        }
        else if (vm.session.questions[69].answer == "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control") {
            questionArray[69] = 0.5
        }
        else {
            questionArray[69] = 0
        }
        ;


        if (vm.session.questions[70].answer == "More than one type of measure adequately") {
            questionArray[70] = 1
        }
        else if (vm.session.questions[70].answer == "Either Directing traffic flows, Target removal or Removing means") {
            questionArray[70] = 0.5
        }
        else {
            questionArray[70] = 0
        }
        ;

        if (vm.session.questions[71].answer == "More than one type of measure adequately") {
            questionArray[71] = 1
        }
        else if (vm.session.questions[71].answer == "Either Target hardening, Directing traffic flows, Removing means, Controlling disinhibitors, Access control or Screening") {
            questionArray[71] = 0.5
        }
        else {
            questionArray[71] = 0
        }
        ;

        if (vm.session.questions[72].answer == "More than one type of measure adequately") {
            questionArray[72] = 1
        }
        else if (vm.session.questions[72].answer == "Either Target hardening, Directing traffic flows, Access control or Screening") {
            questionArray[72] = 0.5
        }
        else {
            questionArray[72] = 0
        }
        ;


        if (vm.session.questions[73].answer == "More than one type of measure adequately") {
            questionArray[73] = 1
        }
        else if (vm.session.questions[73].answer == "Either Target hardening, Directing traffic flows, Target removal or Deflection") {
            questionArray[73] = 0.5
        }
        else {
            questionArray[73] = 0
        }
        ;


        if (vm.session.questions[74].answer == "More than one type of measure adequately") {
            questionArray[74] = 1
        }
        else if (vm.session.questions[74].answer == "Either Target hardening, Target removal, Access control or Screening") {
            questionArray[74] = 0.5
        }
        else {
            questionArray[74] = 0
        }
        ;

        if (vm.session.questions[75].answer == "More than one type of measure adequately") {
            questionArray[75] = 1
        }
        else if (vm.session.questions[75].answer == "Either Directing traffic flows or Facilitating compliance") {
            questionArray[75] = 0.5
        }
        else {
            questionArray[75] = 0
        }
        ;


        // each element in the array is a question number, take one off this number to give the index to the question array (zero start array)
        //...then add the score (for this question) to the running total.

        var relevantQuestions = [];
        var total = 0;
        var weightsArray = burglaryWeights;
        burglary.forEach(addToTotal);

        //calculate the percentage
        burglaryPercent = total / burglaryMax * 100;
        burglaryRelevantQuestions = relevantQuestions;


        relevantQuestions = [];
        total = 0;
        weightsArray = ramRaidWeights;
        ramRaid.forEach(addToTotal);
        ramRaidPercent = total / ramRaidMax * 100;
        ramRaidRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = pickPocketingWeights;
        pickPocketing.forEach(addToTotal);
        pickPocketingPercent = total / pickPocketingMax * 100;
        pickPocketingRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = robberyWeights;
        robbery.forEach(addToTotal);
        robberyPercent = total / robberyMax * 100;
        robberyRelevantQuestions = relevantQuestions;


        relevantQuestions = [];
        total = 0;
        weightsArray = raidWeights;
        raid.forEach(addToTotal);
        raidPercent = total / raidMax * 100;
        raidRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = vehicleTheftWeights;
        vehicleTheft.forEach(addToTotal);
        vehicleTheftPercent = total / vehicleTheftMax * 100;
        vehicleTheftRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = assaultWeights;
        assault.forEach(addToTotal);
        assaultPercent = total / assaultMax * 100;
        assaultRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = sexualAssaultWeights;
        sexualAssault.forEach(addToTotal);
        sexualAssaultPercent = total / sexualAssaultMax * 100;
        sexualAssaultRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = vandalismWeights;
        vandalism.forEach(addToTotal);
        vandalismPercent = total / vandalismMax * 100;
        vandalismRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = graffitiWeights;
        graffiti.forEach(addToTotal);
        graffitiPercent = total / graffitiMax * 100;
        graffitiRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = massKillingWeights;
        massKilling.forEach(addToTotal);
        massKillingPercent = total / massKillingMax * 100;
        massKillingRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = destructionByRiotWeights;
        destructionByRiot.forEach(addToTotal);
        destructionByRiotPercent = total / destructionByRiotMax * 100;
        destructionByRiotRelevantQuestions = relevantQuestions;

        relevantQuestions = [];
        total = 0;
        weightsArray = destructionByFanaticWeights;
        destructionByFanatic.forEach(addToTotal);
        destructionByFanaticPercent = total / destructionByFanaticMax * 100;
        destructionByFanaticRelevantQuestions = relevantQuestions;


        function addToTotal(item, index) {

            total = total + questionArray[item - 1] * weightsArray[index];

            //if the corresponding answer in the question array  is not blank (i.e. has been answered) add this question number (subscript+1) to the list of
            // relevant questions for this assessement/classification combination
            //Note:

            if (vm.session.questions[item - 1].answer) {
                relevantQuestions.push(item);
            }
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


    DrawGraph = function () {
        // if a chart already exists in this space, destroy it to prevent overlay

        if (myChart) {

            myChart.destroy();
        }

        var ctx = document.getElementById("Chart1").getContext('2d');


        myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label, vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label, vm.graphOutput[9].label, vm.graphOutput[10].label, vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutput[0].value, vm.graphOutput[1].value, vm.graphOutput[2].value, vm.graphOutput[3].value, vm.graphOutput[4].value,
                        vm.graphOutput[5].value, vm.graphOutput[6].value, vm.graphOutput[7].value, vm.graphOutput[8].value, vm.graphOutput[9].value, vm.graphOutput[10].value, vm.graphOutput[11].value, vm.graphOutput[12].value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                    {
                        label: vm.session.name,
                        data: [vm.graphOutputReference[0].value, vm.graphOutputReference[1].value, vm.graphOutputReference[2].value, vm.graphOutputReference[3].value, vm.graphOutputReference[4].value,
                            vm.graphOutputReference[5].value, vm.graphOutputReference[6].value, vm.graphOutputReference[7].value, vm.graphOutputReference[8].value, vm.graphOutputReference[9].value, vm.graphOutputReference[10].value, vm.graphOutputReference[11].value, vm.graphOutputReference[12].value],

                        backgroundColor: 'rgba(255, 206, 86, 0.4)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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

    vm.GraphOneSession = function () {
// if a chart already exists in this space, destroy it to prevent overlay

        if (myChart) {

            myChart.destroy();
        }


        var ctx = document.getElementById("Chart1").getContext('2d');

        myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label, vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label, vm.graphOutput[9].label, vm.graphOutput[10].label, vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutput[0].value, vm.graphOutput[1].value, vm.graphOutput[2].value, vm.graphOutput[3].value, vm.graphOutput[4].value,
                        vm.graphOutput[5].value, vm.graphOutput[6].value, vm.graphOutput[7].value, vm.graphOutput[8].value, vm.graphOutput[9].value, vm.graphOutput[10].value, vm.graphOutput[11].value, vm.graphOutput[12].value],

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
        for (i = 0; i < vm.graphOutput.length; i++) {
            vm.sortGraphOutput[i] =
                {
                    current: vm.graphOutput[i],
                    reference: vm.graphOutputReference[i]
                }
        }


        vm.sortGraphOutput.sort(function (a, b) {
            return b.current.value - a.current.value
        });


// if a chart already exists in this space, destroy it to prevent overlay

        if (myChart2) {

            myChart2.destroy();
        }

        var ctx = document.getElementById("Chart2").getContext('2d');
        myChart2 = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.sortGraphOutput[0].current.label, vm.sortGraphOutput[1].current.label, vm.sortGraphOutput[2].current.label, vm.sortGraphOutput[3].current.label, vm.sortGraphOutput[4].current.label,
                    vm.sortGraphOutput[5].current.label, vm.sortGraphOutput[6].current.label, vm.sortGraphOutput[7].current.label, vm.sortGraphOutput[8].current.label, vm.sortGraphOutput[9].current.label, vm.sortGraphOutput[10].current.label, vm.sortGraphOutput[11].current.label, vm.sortGraphOutput[12].current.label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.sortGraphOutput[0].current.value, vm.sortGraphOutput[1].current.value, vm.sortGraphOutput[2].current.value, vm.sortGraphOutput[3].current.value, vm.sortGraphOutput[4].current.value,
                        vm.sortGraphOutput[5].current.value, vm.sortGraphOutput[6].current.value, vm.sortGraphOutput[7].current.value, vm.sortGraphOutput[8].current.value, vm.sortGraphOutput[9].current.value, vm.sortGraphOutput[10].current.value, vm.sortGraphOutput[11].current.value, vm.sortGraphOutput[12].current.value],

                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                    {
                        label: vm.session.name,
                        data: [vm.sortGraphOutput[0].reference.value, vm.sortGraphOutput[1].reference.value, vm.sortGraphOutput[2].reference.value, vm.sortGraphOutput[3].reference.value, vm.sortGraphOutput[4].reference.value,
                            vm.sortGraphOutput[5].reference.value, vm.sortGraphOutput[6].reference.value, vm.sortGraphOutput[7].reference.value, vm.sortGraphOutput[8].reference.value, vm.sortGraphOutput[9].reference.value, vm.sortGraphOutput[10].reference.value, vm.sortGraphOutput[11].reference.value, vm.sortGraphOutput[12].reference.value],

                        backgroundColor: 'rgba(255, 206, 86, 0.4)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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

    SortandGraphOneSession = function () {


// if a chart already exists in this space, destroy it to prevent overlay

        if (myChart2) {

            myChart2.destroy();
        }


        var ctx = document.getElementById("Chart2").getContext('2d');
        myChart2 = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutputSorted[0].label, vm.graphOutputSorted[1].label, vm.graphOutputSorted[2].label, vm.graphOutputSorted[3].label, vm.graphOutputSorted[4].label,
                    vm.graphOutputSorted[5].label, vm.graphOutputSorted[6].label, vm.graphOutputSorted[7].label, vm.graphOutputSorted[8].label, vm.graphOutputSorted[9].label, vm.graphOutputSorted[10].label, vm.graphOutputSorted[11].label, vm.graphOutputSorted[12].label],
                datasets: [{
                    label: vm.session1.name,
                    data: [vm.graphOutputSorted[0].value, vm.graphOutputSorted[1].value, vm.graphOutputSorted[2].value, vm.graphOutputSorted[3].value, vm.graphOutputSorted[4].value,
                        vm.graphOutputSorted[5].value, vm.graphOutputSorted[6].value, vm.graphOutputSorted[7].value, vm.graphOutputSorted[8].value, vm.graphOutputSorted[9].value, vm.graphOutputSorted[10].value, vm.graphOutputSorted[11].value, vm.graphOutputSorted[12].value],

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

        // if a chart already exists in this space, destroy it to prevent overlay

        if (myChart3) {

            myChart3.destroy();
        }

        var ctx = document.getElementById("Chart3").getContext('2d');
        myChart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label, vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label, vm.graphOutput[9].label, vm.graphOutput[10].label, vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: 'Comparison of ' + vm.session1.name + ' and ' + vm.session.name,

                    data: [vm.graphOutput[0].value - vm.graphOutputReference[0].value, vm.graphOutput[1].value - vm.graphOutputReference[1].value, vm.graphOutput[2].value - vm.graphOutputReference[2].value, vm.graphOutput[3].value - vm.graphOutputReference[3].value
                        , vm.graphOutput[4].value - vm.graphOutputReference[4].value, vm.graphOutput[5].value - vm.graphOutputReference[5].value,
                        vm.graphOutput[6].value - vm.graphOutputReference[6].value, vm.graphOutput[7].value - vm.graphOutputReference[7].value, vm.graphOutput[8].value - vm.graphOutputReference[8].value, vm.graphOutput[9].value - vm.graphOutputReference[9].value,
                        vm.graphOutput[10].value - vm.graphOutputReference[10].value, vm.graphOutput[11].value - vm.graphOutputReference[11].value,
                        vm.graphOutput[12].value - vm.graphOutputReference[12].value],
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


    vm.ChooseWhatToDo = function () {

        vm.showQuestionList = true;
        if (!vm.compareSession) {
            if (myChart3) {
                myChart3.destroy();
            }
            vm.GraphOneSession();
        }
        else {


            vm.Graph();
        }
        vm.compareSession = "";


    }


}