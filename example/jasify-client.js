(function(angular) {
  'use strict';
  angular.module('jasify', ['ng']);
  angular.module('jasify').provider('Jasify', JasifyProvider);

  function JasifyProvider() {
    var provider = this;
    provider.config = {
      apiRoot: 'https://jasify-schedule.appspot.com/_ah/api/jasify/v1/',
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
        apiInfo: apiInfo,
        activities: activities(),
        activityPackages: activityPackages(),
        activitySubscriptions: activitySubscriptions(),
        activityTypes: activityTypes(),
        auth: auth(),
        balance: balance(),
        carts: carts(),
        groups: groups(),
        histories: histories(),
        organizations: organizations(),
        payments: payments(),
        unique: unique(),
        userLogins: userLogins(),
        users: users()
      };

      function apiInfo() {
        return $http({
          method: 'GET',
          url: provider.apiPath('api-info'),
          params: provider.parameters({})
        });
      }

      function activities() {
        var activities = {
          add: add,
          get: get,
          listQuery: listQuery,
          patch: patch,
          query: query,
          remove: remove,
          update: update
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('activities'),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activities/' + id + ''),
            params: provider.parameters({})
          });
        }

        function listQuery(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('activities-list'),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('activities/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query(activityTypeId, fromDate, limit, offset, organizationId, toDate) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activities'),
            params: provider.parameters({
              activityTypeId: activityTypeId,
              fromDate: fromDate,
              limit: limit,
              offset: offset,
              organizationId: organizationId,
              toDate: toDate
            })
          });
        }

        function remove(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('activities/' + id + ''),
            params: provider.parameters({})
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('activities/' + id + ''),
            params: provider.parameters({})
          });
        }
        return activities;
      }

      function activityPackages() {
        var activityPackages = {
          add: add,
          addActivity: addActivity,
          get: get,
          getActivities: getActivities,
          patch: patch,
          query: query,
          remove: remove,
          removeActivity: removeActivity,
          update: update
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('activity-packages'),
            params: provider.parameters({})
          });
        }

        function addActivity(activityId, activityPackageId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('activity-packages-activity/' + activityPackageId + '/' + activityId + ''),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-packages/' + id + ''),
            params: provider.parameters({})
          });
        }

        function getActivities(activityPackageId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-packages-activity/' + activityPackageId + ''),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('activity-packages/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query(organizationId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-packages'),
            params: provider.parameters({
              organizationId: organizationId
            })
          });
        }

        function remove(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('activity-packages/' + id + ''),
            params: provider.parameters({})
          });
        }

        function removeActivity(activityId, activityPackageId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('activity-packages-activity/' + activityPackageId + '/' + activityId + ''),
            params: provider.parameters({})
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('activity-packages/' + id + ''),
            params: provider.parameters({})
          });
        }
        return activityPackages;
      }

      function activitySubscriptions() {
        var activitySubscriptions = {
          add: add,
          cancel: cancel,
          getForUser: getForUser,
          query: query,
          subscribers: subscribers
        };

        function add(activityId, userId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('activity-subscriptions'),
            params: provider.parameters({
              activityId: activityId,
              userId: userId
            })
          });
        }

        function cancel(subscriptionId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('activities/{id}/subscribers'),
            params: provider.parameters({
              subscriptionId: subscriptionId
            })
          });
        }

        function getForUser(fromDate, toDate, userId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('user-subscriptions'),
            params: provider.parameters({
              fromDate: fromDate,
              toDate: toDate,
              userId: userId
            })
          });
        }

        function query(activityId, userId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-subscriptions'),
            params: provider.parameters({
              activityId: activityId,
              userId: userId
            })
          });
        }

        function subscribers(activityId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activities/{id}/subscribers'),
            params: provider.parameters({
              activityId: activityId
            })
          });
        }
        return activitySubscriptions;
      }

      function activityTypes() {
        var activityTypes = {
          add: add,
          get: get,
          patch: patch,
          query: query,
          remove: remove,
          update: update
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('activity-types'),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-types/' + id + ''),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('activity-types/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query(organizationId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('activity-types'),
            params: provider.parameters({
              organizationId: organizationId
            })
          });
        }

        function remove(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('activity-types/' + id + ''),
            params: provider.parameters({})
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('activity-types/' + id + ''),
            params: provider.parameters({})
          });
        }
        return activityTypes;
      }

      function auth() {
        var auth = {
          changePassword: changePassword,
          forgotPassword: forgotPassword,
          login: login,
          logout: logout,
          providerAuthenticate: providerAuthenticate,
          providerAuthorize: providerAuthorize,
          recoverPassword: recoverPassword,
          restore: restore
        };

        function changePassword(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/change-password'),
            params: provider.parameters({})
          });
        }

        function forgotPassword(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/forgot-password'),
            params: provider.parameters({})
          });
        }

        function login(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/login'),
            params: provider.parameters({})
          });
        }

        function logout() {
          return $http({
            method: 'POST',
            url: provider.apiPath('auth/logout'),
            params: provider.parameters({})
          });
        }

        function providerAuthenticate(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/provider-authenticate'),
            params: provider.parameters({})
          });
        }

        function providerAuthorize(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/provider-authorize'),
            params: provider.parameters({})
          });
        }

        function recoverPassword(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('auth/recover-password'),
            params: provider.parameters({})
          });
        }

        function restore() {
          return $http({
            method: 'GET',
            url: provider.apiPath('auth/restore'),
            params: provider.parameters({})
          });
        }
        return auth;
      }

      function balance() {
        var balance = {
          cancelPayment: cancelPayment,
          createCheckoutPayment: createCheckoutPayment,
          createPayment: createPayment,
          executePayment: executePayment,
          getAccount: getAccount,
          getAccounts: getAccounts,
          getTransactions: getTransactions
        };

        function cancelPayment(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('balance/cancel-payment/' + id + ''),
            params: provider.parameters({})
          });
        }

        function createCheckoutPayment(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('balance/create-checkout-payment'),
            params: provider.parameters({})
          });
        }

        function createPayment(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('balance/create-payment'),
            params: provider.parameters({})
          });
        }

        function executePayment(id, payerId) {
          return $http({
            method: 'PUT',
            url: provider.apiPath('balance/execute-payment/' + id + ''),
            params: provider.parameters({
              payerId: payerId
            })
          });
        }

        function getAccount() {
          return $http({
            method: 'GET',
            url: provider.apiPath('balance/account'),
            params: provider.parameters({})
          });
        }

        function getAccounts() {
          return $http({
            method: 'GET',
            url: provider.apiPath('balance/accounts'),
            params: provider.parameters({})
          });
        }

        function getTransactions(accountId, limit, offset) {
          return $http({
            method: 'GET',
            url: provider.apiPath('balance/transactions/' + accountId + ''),
            params: provider.parameters({
              limit: limit,
              offset: offset
            })
          });
        }
        return balance;
      }

      function carts() {
        var carts = {
          addUserActivity: addUserActivity,
          addUserActivityPackage: addUserActivityPackage,
          anonymousCartToUserCart: anonymousCartToUserCart,
          clearUserCart: clearUserCart,
          createAnonymousCart: createAnonymousCart,
          get: get,
          getItem: getItem,
          getUserCart: getUserCart,
          removeItem: removeItem
        };

        function addUserActivity(activityId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('carts/user/activity/' + activityId + ''),
            params: provider.parameters({})
          });
        }

        function addUserActivityPackage(resource, activityPackageId) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('carts/user/activity-package/' + activityPackageId + ''),
            params: provider.parameters({})
          });
        }

        function anonymousCartToUserCart(id) {
          return $http({
            method: 'PUT',
            url: provider.apiPath('carts/anonymous/' + id + ''),
            params: provider.parameters({})
          });
        }

        function clearUserCart() {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('carts/user'),
            params: provider.parameters({})
          });
        }

        function createAnonymousCart(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('carts/anonymous'),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('carts/anonymous/' + id + ''),
            params: provider.parameters({})
          });
        }

        function getItem(cartId, ordinal) {
          return $http({
            method: 'GET',
            url: provider.apiPath('carts/' + cartId + '/' + ordinal + ''),
            params: provider.parameters({})
          });
        }

        function getUserCart() {
          return $http({
            method: 'GET',
            url: provider.apiPath('carts/user'),
            params: provider.parameters({})
          });
        }

        function removeItem(cartId, ordinal) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('carts/' + cartId + '/' + ordinal + ''),
            params: provider.parameters({})
          });
        }
        return carts;
      }

      function groups() {
        var groups = {
          add: add,
          addUser: addUser,
          get: get,
          patch: patch,
          query: query,
          remove: remove,
          removeUser: removeUser,
          update: update,
          users: users
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('groups'),
            params: provider.parameters({})
          });
        }

        function addUser(groupId, userId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('groups/' + groupId + '/users/' + userId + ''),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('groups/' + id + ''),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('groups/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query() {
          return $http({
            method: 'GET',
            url: provider.apiPath('groups'),
            params: provider.parameters({})
          });
        }

        function remove(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('groups/' + id + ''),
            params: provider.parameters({})
          });
        }

        function removeUser(groupId, userId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('groups/' + groupId + '/users/' + userId + ''),
            params: provider.parameters({})
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('groups/' + id + ''),
            params: provider.parameters({})
          });
        }

        function users(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('group-users/' + id + ''),
            params: provider.parameters({})
          });
        }
        return groups;
      }

      function histories() {
        var histories = {
          query: query
        };

        function query(fromDate, toDate) {
          return $http({
            method: 'GET',
            url: provider.apiPath('histories'),
            params: provider.parameters({
              fromDate: fromDate,
              toDate: toDate
            })
          });
        }
        return histories;
      }

      function organizations() {
        var organizations = {
          add: add,
          addGroup: addGroup,
          addUser: addUser,
          get: get,
          groups: groups,
          patch: patch,
          query: query,
          queryPublic: queryPublic,
          remove: remove,
          removeGroup: removeGroup,
          removeUser: removeUser,
          update: update,
          users: users
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('organizations'),
            params: provider.parameters({})
          });
        }

        function addGroup(groupId, organizationId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('organizations/' + organizationId + '/groups/' + groupId + ''),
            params: provider.parameters({})
          });
        }

        function addUser(organizationId, userId) {
          return $http({
            method: 'POST',
            url: provider.apiPath('organizations/' + organizationId + '/users/' + userId + ''),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('organizations/' + id + ''),
            params: provider.parameters({})
          });
        }

        function groups(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('organization-groups/' + id + ''),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('organizations/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query() {
          return $http({
            method: 'GET',
            url: provider.apiPath('organizations'),
            params: provider.parameters({})
          });
        }

        function queryPublic() {
          return $http({
            method: 'GET',
            url: provider.apiPath('organizations-public'),
            params: provider.parameters({})
          });
        }

        function remove(id) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('organizations/' + id + ''),
            params: provider.parameters({})
          });
        }

        function removeGroup(groupId, organizationId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('organizations/' + organizationId + '/groups/' + groupId + ''),
            params: provider.parameters({})
          });
        }

        function removeUser(organizationId, userId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('organizations/' + organizationId + '/users/' + userId + ''),
            params: provider.parameters({})
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('organizations/' + id + ''),
            params: provider.parameters({})
          });
        }

        function users(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('organization-users/' + id + ''),
            params: provider.parameters({})
          });
        }
        return organizations;
      }

      function payments() {
        var payments = {
          cancelPayment: cancelPayment,
          executePayment: executePayment,
          get: get,
          getPaymentInvoice: getPaymentInvoice,
          query: query,
          queryByReferenceCode: queryByReferenceCode
        };

        function cancelPayment(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payments-cancel/' + id + ''),
            params: provider.parameters({})
          });
        }

        function executePayment(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payments-execute/' + id + ''),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payments/' + id + ''),
            params: provider.parameters({})
          });
        }

        function getPaymentInvoice(paymentId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payment-invoices/' + paymentId + ''),
            params: provider.parameters({})
          });
        }

        function query(fromDate, state, toDate) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payments'),
            params: provider.parameters({
              fromDate: fromDate,
              state: state,
              toDate: toDate
            })
          });
        }

        function queryByReferenceCode(referenceCode) {
          return $http({
            method: 'GET',
            url: provider.apiPath('payments-reference-code/' + referenceCode + ''),
            params: provider.parameters({})
          });
        }
        return payments;
      }

      function unique() {
        var unique = {
          email: email,
          username: username
        };

        function email(email) {
          return $http({
            method: 'GET',
            url: provider.apiPath('unique/email/' + email + ''),
            params: provider.parameters({})
          });
        }

        function username(username) {
          return $http({
            method: 'GET',
            url: provider.apiPath('unique/username/' + username + ''),
            params: provider.parameters({})
          });
        }
        return unique;
      }

      function userLogins() {
        var userLogins = {
          list: list,
          remove: remove
        };

        function list(userId) {
          return $http({
            method: 'GET',
            url: provider.apiPath('user-logins/' + userId + ''),
            params: provider.parameters({})
          });
        }

        function remove(loginId) {
          return $http({
            method: 'DELETE',
            url: provider.apiPath('user-logins/' + loginId + ''),
            params: provider.parameters({})
          });
        }
        return userLogins;
      }

      function users() {
        var users = {
          add: add,
          get: get,
          patch: patch,
          query: query,
          update: update
        };

        function add(resource) {
          return $http({
            method: 'POST',
            data: resource,
            url: provider.apiPath('users'),
            params: provider.parameters({})
          });
        }

        function get(id) {
          return $http({
            method: 'GET',
            url: provider.apiPath('users/' + id + ''),
            params: provider.parameters({})
          });
        }

        function patch(request, id) {
          return $http({
            method: 'PATCH',
            data: request,
            url: provider.apiPath('users/' + id + ''),
            params: provider.parameters({})
          });
        }

        function query(field, limit, offset, order, orderBy, query) {
          return $http({
            method: 'GET',
            url: provider.apiPath('users'),
            params: provider.parameters({
              field: field,
              limit: limit,
              offset: offset,
              order: order,
              orderBy: orderBy,
              query: query
            })
          });
        }

        function update(resource, id) {
          return $http({
            method: 'PUT',
            data: resource,
            url: provider.apiPath('users/' + id + ''),
            params: provider.parameters({})
          });
        }
        return users;
      }
      return svc;
    };
  }
})(angular);
