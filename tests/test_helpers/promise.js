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

    var then = function(successCallback, errorCallback, notifyCallback) {
      if (notifyCallback) notificationValues.forEach(notifyCallback);
      if (isOK && successCallback) return successCallback(value);
      if (!isOK && errorCallback) return errorCallback(value);
    };

    var onError = function(errorCallback) {
      return then(undefined, errorCallback, undefined);
    };

    var promise = {
      then:  then,
      catch: onError
    };

    return {
      notify:  notify,
      resolve: resolve,
      reject:  reject,
      promise: promise
    };
  };

  module.exports = {
    defer: Promise
  };
});
