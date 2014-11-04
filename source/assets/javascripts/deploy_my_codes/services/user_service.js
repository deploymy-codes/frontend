(function() {
  var UserService = function($auth, $http, $q, $window, _) {
    var createNullUser = function() {
      return _.clone(NULL_USER);
    };

    var loadUser = function(callback) {
      $http.get('http://localhost:9292/user').success(function(data, status, headers, config) {
        return callback(data);
      });
    };

    var CURRENT_USER_KEY = 'deploy_my_codes_current_user';
    var NULL_USER        = { isLoggedIn: false };
    var currentUser      = createNullUser();

    var getUser = function() {
      var deferred = $q.defer();

      var token = $auth.getToken();
      if (token) {
        stringifiedUser = $window.localStorage[CURRENT_USER_KEY];
        if (stringifiedUser) {
          currentUser = JSON.parse(stringifiedUser);
          deferred.resolve(currentUser);
        }

        loadUser(function(remote_user) {
          currentUser                            = _.extend(createNullUser(), remote_user);
          currentUser.isLoggedIn                 = true;
          $window.localStorage[CURRENT_USER_KEY] = JSON.stringify(currentUser);

          deferred.resolve(currentUser);
        });
      } else {
        currentUser = createNullUser();
        delete $window.localStorage[CURRENT_USER_KEY];
        deferred.resolve(currentUser);
      }

      return deferred.promise;
    };

    return {
      user: getUser
    };
  };

  angular.module('DeployMyCodes').service('UserService', ['$auth', '$http', '$q', '$window', '_', UserService]);
})();
