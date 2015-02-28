require.register('deploy_my_codes/directives/user_feedback_messages', function(exports, require, module) {
  module.exports = function() {
    var listenFeedbacksController = function($scope, UserFeedbackService) {
      $scope.messages = [];

      UserFeedbackService.bindSuccess(function(_, message) {
        $scope.messages.push(message);
      });
    };

    return {
      controller: ['$scope', 'UserFeedbackService', listenFeedbacksController],
      template:   '<ul class="grid-block vertical m-user_feedback_messages"><li class="m-user_feedback_message" ng-repeat="message in messages">{{ message }}</li></ul>'
    };
  };
});
