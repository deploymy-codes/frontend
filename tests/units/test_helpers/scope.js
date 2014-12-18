require.register('test_helpers/scope', function(exports, require, module){
  var Scope = function() {
    var callbacks = {};

    var registerCallback = function(name, callback) {
      callbacks[name] = callback;
    };

    var broadcastCallback = function(name) {
      if (callbacks[name]) callbacks[name]();
    };

    return {
      $broadcast: broadcastCallback,
      $on: registerCallback
    };
  };

  module.exports = Scope;
});
