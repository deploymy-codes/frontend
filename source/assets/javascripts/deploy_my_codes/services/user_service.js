(function() {
  var UserService = function($auth, $http, $q, $window, _) {
    var CURRENT_USER_KEY = 'deploy_my_codes_current_user';
    var NULL_USER        = { isLoggedIn: false };

    var createNullUser = function() {
      return _.clone(NULL_USER);
    };

    var getUserFromStorage = function() {
      var stringifiedUser = $window.localStorage[CURRENT_USER_KEY];
      if (stringifiedUser) {
        return JSON.parse(stringifiedUser);
      }

      return createNullUser();
    };

    var getUser = function() {
      var deferred = $q.defer();

      var token = $auth.getToken();
      var user  = getUserFromStorage();
      if (token && user) {
        currentUser = user;
      } else {
        currentUser = createNullUser();
        delete $window.localStorage[CURRENT_USER_KEY];
      }
      deferred.resolve(currentUser);

      return deferred.promise;
    };

    var registerUser = function(data) {
      var deferred                           = $q.defer();
      currentUser                            = _.extend(createNullUser(), data);
      currentUser.isLoggedIn                 = true;
      $window.localStorage[CURRENT_USER_KEY] = JSON.stringify(currentUser);
      deferred.resolve();

      return deferred.promise;
    };

    var currentUser = createNullUser();

    return {
      user:     getUser,
      register: registerUser
    };
  };

  angular.module('DeployMyCodes').service('UserService', ['$auth', '$http', '$q', '$window', '_', UserService]);
})();
