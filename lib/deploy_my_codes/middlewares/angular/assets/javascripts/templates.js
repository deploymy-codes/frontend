angular.module('templates', []);
angular.module('templates').service('$templates', ['$templateCache', function($templateCache) {
  return {
    get: function(name) {
      return $templateCache.get(name);
    }
  };
}]);
