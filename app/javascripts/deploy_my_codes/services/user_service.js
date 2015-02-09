require.register('deploy_my_codes/services/user_service', function(exports, require, module){
  module.exports = function($q, LocalStorage) {
    var _ =  require('underscore');

    var CURRENT_USER_KEY = 'deploy_my_codes_current_user';
    var NULL_USER        = { isLoggedIn: false };

    var createNullUser = function() {
      return _.clone(NULL_USER);
    };

    var getUser = function() {
      var deferred = $q.defer();

      var user  = LocalStorage.get(CURRENT_USER_KEY);
      if (user && user.isLoggedIn) {
        currentUser = user;
      } else {
        removeUser();
      }
      deferred.resolve(currentUser);

      return deferred.promise;
    };

    var registerUser = function(data) {
      var deferred           = $q.defer();
      currentUser            = _.extend(createNullUser(), data);
      currentUser.isLoggedIn = true;
      LocalStorage.set(CURRENT_USER_KEY, currentUser);
      deferred.resolve(currentUser);

      return deferred.promise;
    };

    var removeUser = function() {
      var deferred = $q.defer();
      currentUser  = createNullUser();
      LocalStorage.remove(CURRENT_USER_KEY);
      deferred.resolve();

      return deferred.promise;
    };

    var currentUser = createNullUser();

    return {
      get:      getUser,
      register: registerUser,
      remove:   removeUser
    };
  };
});
