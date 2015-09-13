(function (angular) {
    'use strict';

    var example = angular.module('example', ['brain']);

    example.config(function (BrainProvider) {
        BrainProvider.apiRoot('https://jasify-schedule.appspot.com/_ah/api/jasify/v1/');
    });

    example.controller('AppController', AppController);

    function AppController(Brain) {
        var vm = this;
        vm.title = 'endpoints-angular-client-generator example';
        vm.result = 'Calling Brain.apiInfo() ...';
        vm.failure = null;
        Brain.apiInfo().then(function (res) {
            vm.result = res;
        }, function (res) {
            vm.failure = res;
        });
    }
})(angular);