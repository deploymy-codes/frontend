require.register('deploy_my_codes', function(exports, require, module){
  module.exports = function() {
    angular.module('localstorage', [])
           .service('LocalStorage', ['$window', require('tools/localstorage')]);

    angular.module('DeployMyCodes', ['localstorage', 'mm.foundation', 'ngResource', 'satellizer', 'ui.router'])
           .constant('config', require('config')())
           .provider('RouteTool', require('deploy_my_codes/providers/route_tool_provider'))
           .config(['$authProvider', 'config', require('deploy_my_codes/config/oauth')])
           .config(['$stateProvider', '$urlRouterProvider', 'RouteToolProvider', require('deploy_my_codes/config/routes')])
           .run(['$rootScope', '$state', 'UserService', require('deploy_my_codes/middlewares/already_logged_in_user')])
           .run(['$rootScope', '$state', 'UserService', require('deploy_my_codes/middlewares/authenticated_route')])
           .run(['$auth', '$injector', require('deploy_my_codes/middlewares/authorization_in_headers')])
           .run(['$templateCache', require('deploy_my_codes/middlewares/templates')])
           .service('AuthenticationService', ['$auth', '$q', '$rootScope', 'UserService', require('deploy_my_codes/services/authentication_service')])
           .service('UserService', ['$auth', '$q', 'LocalStorage', require('deploy_my_codes/services/user_service')])
           .controller('AuthenticationCtrl', ['$scope', '$state', 'AuthenticationService', require('deploy_my_codes/controllers/authentication_controller')])
           .controller('MenuCtl', ['$scope', 'UserService', require('deploy_my_codes/controllers/menu_controller')])
  }
});
