(function() {
  var Templates = function($templateCache) {
    var getTemplate = function(name) {
      return $templateCache.get(name);
    };

    return {
      get: getTemplate
    };
  };

  angular.module('templates', [])
         .service('$templates', ['$templateCache', Templates]);
})();
