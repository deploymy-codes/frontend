(function() {
  var Underscore = function($window) {
    return $window._;
  };

  angular.module('underscore', []);
  angular.module('underscore').service('_', ['$window', Underscore]);
})();
