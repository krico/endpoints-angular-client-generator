(function(angular) {
  'use strict';
  angular.module('urlshortener', ['ng']);
  angular.module('urlshortener').provider('Urlshortener', UrlshortenerProvider);

  function UrlshortenerProvider() {
    var provider = this;
    provider.config = {
      apiRoot: 'https://www.googleapis.com/urlshortener/v1/'
    };
    provider.apiRoot = function(v) {
      if (angular.isDefined(v)) provider.config.apiRoot = v;
      return provider.config.apiRoot;
    };
    provider.apiPath = function(path) {
      return provider.config.apiRoot + path;
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
            params: {
              projection: projection,
              shortUrl: shortUrl
            }
          });
        }

        function insert(request) {
          return $http({
            method: 'POST',
            data: request,
            url: provider.apiPath('url')
          });
        }

        function list(projection, startToken) {
          return $http({
            method: 'GET',
            url: provider.apiPath('url/history'),
            params: {
              projection: projection,
              startToken: startToken
            }
          });
        }
        return url;
      }
      return svc;
    };
  }
})(angular);
