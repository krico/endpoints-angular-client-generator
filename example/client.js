(function(angular) {
    'use strict';
    angular.module('brain', ['ng']);
})(angular);
(function(angular) {
    'use strict';
    angular.module('brain').provider('Brain', BrainProvider);

    function BrainProvider() {
        var provider = this;
        provider.config = {
            apiRoot: 'https://brain.appspot.com/_ah/api/brain/v1/'
        };
        angular.forEach(provider.config, function(value, key) {
            provider[key] = function(newValue) {
                if (angular.isDefined(newValue)) {
                    provider.config[key] = newValue;
                }
                return provider.config[key];
            }
        });
        provider.apiPath = apiPath;

        function apiPath(path) {
            return provider.config.apiRoot + path;
        }
        provider.$get = $get;

        function $get($log, $http) {
            var svc = {};
            svc.test = test;

            function test() {}
            svc.apiInfo = apiInfo;

            function apiInfo() {
                return $http.get(provider.apiPath('api-info'));
            }
            return svc;
        }
    }
})(angular);