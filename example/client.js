(function(angular) {
    'use strict';
    angular.module('brain', ['ng']);
    angular.module('brain').provider('Brain', BrainProvider);

    function BrainProvider() {
        var provider = this;
        provider.config = {
            apiRoot: 'https://brain.appspot.com/_ah/api/brain/v1/'
        };
        provider.apiRoot = function(v) {
            if (angular.isDefined(v)) provider.config.apiRoot = v;
            return provider.config.apiRoot;
        };
        provider.apiPath = function(p) {
            return provider.config.apiRoot + p;
        };
        provider.$get = function($http) {
            var svc = {
                test: test,
                apiInfo: apiInfo
            };

            function test() {}

            function apiInfo() {
                return $http.get(provider.apiPath('api-info'));
            }
            return svc;
        };
    }
})(angular);