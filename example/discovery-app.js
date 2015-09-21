(function (angular) {
    'use strict';

    var example = angular.module('example', ['ngSanitize', 'discovery']);

    example.config(function (DiscoveryProvider) {
        //DiscoveryProvider.apiRoot('https://localhost:8080/_ah/api/jasify/v1/');
    });

    example.controller('AppController', AppController);
    example.filter('prettyJSON', function () {
        function syntaxHighlight(json) {
            return JSON ? JSON.stringify(json, null, '  ') : 'your browser does not support JSON so cant pretty print';
        }

        return syntaxHighlight;
    });

    function AppController($log, $location, $scope, Discovery) {
        var vm = this;
        vm.title = 'endpoints-angular-client-generator example';
        vm.apisResponse = 'Calling Discovery.apis.list() ...';
        vm.apis = [];
        vm.selectedApi = null;
        vm.failure = null;
        vm.list = list;
        vm.discoveryDocument = null;
        vm.getDiscoveryDocument = getDiscoveryDocument;
        vm.debug = $location.search().debug;
        vm.preferred = true;
        vm.name = undefined;
        vm.list();

        $scope.$watch('vm.selectedApi', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (angular.isObject(newValue)) {
                    vm.getDiscoveryDocument(newValue);
                }
            }
        });

        function getDiscoveryDocument(api) {
            vm.discoveryDocument = 'Discovery.apis.getRest(' + api.name + ',' + api.version + ');';
            Discovery.apis.getRest(api.name, api.version).then(function (result) {
                vm.discoveryDocument = result.data;
            });
        }

        function list() {
            $log.debug('Listing discovery APIs');
            vm.selectedApi = null;
            vm.discoveryDocument = null;
            vm.apis = [];
            Discovery.apis.list(vm.name, vm.preferred).then(function (res) {
                vm.apisResponse = res;
                vm.apis = res.data.items;
                $log.debug('DISCOVERED: ' + vm.apis.length);
            }, function (res) {
                $log.warn('FAILED: ' + angular.toJson(res));
                vm.failure = res;
            });
        }
    }
})(angular);