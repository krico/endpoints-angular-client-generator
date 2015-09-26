(function(angular) {
  'use strict';
  angular.module('discovery', ['ng']);
  angular.module('discovery').provider('Discovery', DiscoveryProvider);

  function DiscoveryProvider() {
    var provider = this;
    provider.config = {
      apiRoot: 'https://www.googleapis.com/discovery/v1/',
      defaultParameters: {}
    };
    provider.apiRoot = function(v) {
      if (angular.isDefined(v)) provider.config.apiRoot = v;
      return provider.config.apiRoot;
    };
    provider.defaultParameters = function(v) {
      if (angular.isDefined(v)) provider.config.defaultParameters = v;
      return provider.config.defaultParameters;
    };
    provider.apiPath = function(path) {
      return provider.config.apiRoot + path;
    };
    provider.setApiKey = function(key) {
      return provider.config.defaultParameters.key = key;
    };
    provider.parameters = function(params) {
      return angular.extend(params, provider.config.defaultParameters);
    };
    provider.$get = function($http) {
      var svc = {
        apis: apis()
      };

      function apis() {
        var apis = {
          getRest: getRest,
          list: list
        };

        function getRest(api, version) {
          return $http({
            method: 'GET',
            url: provider.apiPath('apis/' + api + '/' + version + '/rest'),
            params: provider.parameters({})
          });
        }

        function list(name, preferred) {
          return $http({
            method: 'GET',
            url: provider.apiPath('apis'),
            params: provider.parameters({
              name: name,
              preferred: preferred
            })
          });
        }
        return apis;
      }
      return svc;
    };
  }
})(angular);