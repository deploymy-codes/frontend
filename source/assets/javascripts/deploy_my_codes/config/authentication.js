(function() {
  var AddAuthorizationHeaderInHttprequests = function($auth, $injector) {
    $injector.get('$http').defaults.transformRequest = function(data, headersGetter) {
      if ($auth.getToken()) headersGetter()['Authorization'] = $auth.getToken();
      if (data) return angular.toJson(data);
    };
  };

  var PerformAutomaticRedirectionToSignIn = function($rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (!destinationState.data || !angular.isFunction(destinationState.data.shouldBeRedirectedToSignIn)) return;
      UserService.user().then(function(user) {
        var shouldBeRedirectedToSignIn = destinationState.data.shouldBeRedirectedToSignIn(user);

        if (shouldBeRedirectedToSignIn) {
          event.preventDefault();
          $state.go('sign_in', {});
        }
      });
    });
  };

  var PerformAutomaticRedirectionToApp = function($rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (!destinationState.data || !angular.isFunction(destinationState.data.shouldBeRedirectedToApp)) return;
      UserService.user().then(function(user) {
        var shouldBeRedirectedToApp = destinationState.data.shouldBeRedirectedToApp(user);

        if (shouldBeRedirectedToApp) {
          event.preventDefault();
          $state.go('dashboard', {});
        }
      });
    });
  };

  angular.module('DeployMyCodes').run(['$auth', '$injector', AddAuthorizationHeaderInHttprequests]);
  angular.module('DeployMyCodes').run(['$rootScope', '$state', 'UserService', PerformAutomaticRedirectionToSignIn]);
  angular.module('DeployMyCodes').run(['$rootScope', '$state', 'UserService', PerformAutomaticRedirectionToApp]);
})();
