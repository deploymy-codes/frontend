require.register('test_helpers/promise', function(exports, require, module){
  var Promise = function() {
    var isOK  = true;
    var value = undefined;
    var notificationValues = [];

    var notify = function(notificationValue) {
      notificationValues.push(notificationValue);
    };

    var resolve = function(resolvedValue) {
      value = resolvedValue;
    };

    var reject = function(rejectedValue) {
      isOK  = false;
      value = rejectedValue;
    };

    var promise = {
      then: function(successCallback, errorCallback, notifyCallback) {
              if (notifyCallback) notificationValues.forEach(notifyCallback);
              if (isOK && successCallback) return successCallback(value);
              if (!isOK && errorCallback) return errorCallback(value);
            },
      catch: function(errorCallback) {
               return then(undefined, errorCallback, undefined);
             }
    };

    return {
      notify:  notify,
      resolve: resolve,
      reject:  reject,
      promise: promise
    }
  };

  module.exports = {
    defer: Promise
  };
});
