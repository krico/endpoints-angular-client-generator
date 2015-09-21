(function (angular) {
    'use strict';

    var example = angular.module('example', ['ngSanitize', 'urlshortener']);

    example.config(function (UrlshortenerProvider) {
        UrlshortenerProvider.setApiKey('AIzaSyD6J4xNj5YjjFYiea2qRmp76JgGz1iasNA');
    });

    example.controller('AppController', AppController);

    function AppController($log, $location, Urlshortener) {
        var vm = this;
        vm.debug = $location.search().debug;
        vm.title = 'endpoints-angular-client-generator example';
        vm.shorten = shorten;
        function shorten() {
            vm.shortUrl = null;
            vm.response = null;
            $log.debug('Calling');
            Urlshortener.url.insert({longUrl: vm.longUrl}).then(function (r) {
                $log.debug('GET: ' + angular.toJson(r.data));
                vm.response = r.data;
                vm.shortUrl = r.data.id;
            }, function (r) {
                $log.error('FAIL: ' + angular.toJson(r.data));
            });
        }
    }
})(angular);