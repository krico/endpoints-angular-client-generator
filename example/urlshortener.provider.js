(function(angular) {
  'use strict';
  angular.module('urlshortener', ['ng']);
  angular.module('urlshortener').provider('Urlshortener', UrlshortenerProvider);

  function UrlshortenerProvider() {
    var provider = this;
    provider.config = {
      apiRoot: 'https://www.googleapis.com/urlshortener/v1/',
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
        url: url()
      };

      function url() {
        var url = {
          get: get,
          insert: insert,
          list: list
        };

        function get(projection, shortUrl) {
          return $http({
            method: 'GET',
            url: provider.apiPath('url'),
            params: provider.parameters({
              projection: projection,
              shortUrl: shortUrl
            })
          });
        }

        function insert(request) {
          return $http({
            method: 'POST',
            data: request,
            url: provider.apiPath('url'),
            params: provider.parameters({})
          });
        }

        function list(projection, startToken) {
          return $http({
            method: 'GET',
            url: provider.apiPath('url/history'),
            params: provider.parameters({
              projection: projection,
              startToken: startToken
            })
          });
        }
        return url;
      }
      return svc;
    };
  }
})(angular);