(function() {
  var AuthorizationInHeaders = function($auth, $injector) {
    $injector.get('$http').defaults.transformRequest = function(data, headersGetter) {
      if ($auth.getToken()) headersGetter()['Authorization'] = $auth.getToken();
      if (data) return angular.toJson(data);
    };
  };

  angular.module('DeployMyCodes').run(['$auth', '$injector', AuthorizationInHeaders]);
})();
