/**
 * Created by frances.fearon on 19/05/2017.
 */

angular.module('secur')
    .controller('ProfileController',ProfileController);

function ProfileController() {
    var vm = this;
    vm.name = "";

  
    vm.label1 = "Burglary (residential)";
    vm.label2 = "Vehicle theft";
    vm.label3 = "Graffiti";

    vm.label4 = "Robbery";
    vm.label5 = "Raid";
    vm.label6 = "Pickpocketing";
    vm.label7 = "Sexual Assault";
    vm.label8 = "Vandalism";
    vm.label9 = "Mass Killing";

    vm.label10 = "Destruction by riot";
    vm.label11 = "Destruction by fanatic";
    vm.label12 = "Ram Raid";
    vm.label13 = "Assault";

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


    vm.graphItem1 = {
        label: vm.label1,
        value : vm.test1
    };
    vm.graphItem2 = {
        label: vm.label2,
        value : vm.test2
    };
    vm.graphItem3 = {
        label: vm.label3,
        value : vm.test3
    }
    vm.graphItem4 = {
        label: vm.label4,
        value : vm.test4
    };
    vm.graphItem5 = {
        label: vm.label5,
        value : vm.test5
    };
    vm.graphItem6 = {
        label: vm.label6,
        value : vm.test6
    };
    vm.graphItem7= {
        label: vm.label7,
        value : vm.test7
    };
    vm.graphItem8 = {
        label: vm.label8,
        value : vm.test8
    };
    vm.graphItem9 = {
        label: vm.label9,
        value : vm.test9
    }
    vm.graphItem10 = {
        label: vm.label10,
        value : vm.test10
    };
    vm.graphItem11 = {
        label: vm.label11,
        value : vm.test11
    };
    vm.graphItem12 = {
        label: vm.label12,
        value : vm.test12
    };
    vm.graphItem13 = {
        label: vm.label13,
        value : vm.test13
    }


    vm.graphOutput = [vm.graphItem1,vm.graphItem2,vm.graphItem3,vm.graphItem4,vm.graphItem5,vm.graphItem6,vm.graphItem7,vm.graphItem8,
        vm.graphItem9,vm.graphItem10,vm.graphItem11,vm.graphItem12,vm.graphItem13];




    vm.Graph1 = function () {

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: [vm.graphOutput[0].label, vm.graphOutput[1].label, vm.graphOutput[2].label, vm.graphOutput[3].label, vm.graphOutput[4].label,
                    vm.graphOutput[5].label,vm.graphOutput[6].label, vm.graphOutput[7].label, vm.graphOutput[8].label,vm.graphOutput[9].label, vm.graphOutput[10].label,vm.graphOutput[11].label, vm.graphOutput[12].label],
                datasets: [{
                    label: 'Indication percent',
                    data: [vm.graphOutput[0].value, vm.graphOutput[1].value, vm.graphOutput[2].value, vm.graphOutput[3].value, vm.graphOutput[4].value,
                        vm.graphOutput[5].value,vm.graphOutput[6].value, vm.graphOutput[7].value, vm.graphOutput[8].value,vm.graphOutput[9].value, vm.graphOutput[10].value,vm.graphOutput[11].value, vm.graphOutput[12].value],

                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Indications that attention is required'
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

    vm.SortandGraph1 = function () {
        console.log(vm.graphOutput[0] );
        vm.graphOutput.sort(function(a, b){return a.value - b.value});

        console.log("first item after sort in order ");
        vm.Graph1();


    };

    vm.Graph2 = function () {

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Burglary(residential)", "Vehicle Theft","Graffiti" , "Robbery", "Raid", "Pickpocketing", "Sexual assault", "Vandalism", "Mass killing", "Destruction by riot", "Destruction by fanatic", "Ram raid", "Assault"],
                datasets: [{
                    label: 'Indications that attention is required',

                    data: [vm.test1 - vm.test6, vm.test2 - vm.test7, vm.test3 - vm.test8, vm.test4 - vm.test9, vm.test5 - vm.test10, vm.test6 - vm.test11, vm.test1 - vm.test13, vm.test2 - vm.test9, vm.test3 - vm.test1, vm.test4, vm.test5- vm.test2, vm.test6, vm.test6- vm.test7],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
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
}









