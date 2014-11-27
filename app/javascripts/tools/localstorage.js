require.register('tools/localstorage', function(exports, require, module){
  module.exports = function($window) {
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
});
