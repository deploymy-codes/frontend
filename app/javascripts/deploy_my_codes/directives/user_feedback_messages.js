require.register('deploy_my_codes/directives/user_feedback_messages', function(exports, require, module) {
  module.exports = function() {
    var listenFeedbacksController = function($scope, UserFeedbackService) {
      $scope.messages = [];

      UserFeedbackService.bindSuccess(function(_, message) {
        $scope.messages.push(message);
      });
    };

    return {
      controller:  ['$scope', 'UserFeedbackService', listenFeedbacksController],
      templateUrl: '/directives/user_feedback_messages.html'
    };
  };
});
