(function() {
  var LocalStorage = function($window) {
    var getContent = function(name) {
      var stringifiedContent = $window.localStorage[name];
      if (stringifiedContent) return JSON.parse(stringifiedContent);
    };

    var removeContent = function(name) {
      delete $window.localStorage[name];
    };

    var setContent = function(name, content) {
      $window.localStorage[name] = JSON.stringify(content);
    };

    return {
      get:    getContent,
      remove: removeContent,
      set:    setContent,
    };
  };

  angular.module('localstorage', [])
         .service('LocalStorage', ['$window', LocalStorage]);
})();
