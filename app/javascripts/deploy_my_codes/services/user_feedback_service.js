require.register('deploy_my_codes/services/user_feedback_service', function(exports, require, module){
  module.exports = function($rootScope) {
    var MESSAGE_KEYS = {
      success: 'user_feedback.success'
    };

    var successMessage = function(message) {
      $rootScope.$emit(MESSAGE_KEYS.success, message);
    };

    var listenForSuccessMessages = function(callback) {
      $rootScope.$on(MESSAGE_KEYS.success, callback);
    };

    return {
      bindSuccess: listenForSuccessMessages,
      success:     successMessage
    };
  };
});
