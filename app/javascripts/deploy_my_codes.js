require.register('deploy_my_codes', function(exports, require, module){
  module.exports = function() {
    angular.module('localstorage', [])
           .service('LocalStorage', ['$window', require('tools/localstorage')]);

    angular.module('DeployMyCodes', ['foundation', 'localstorage', 'mm.foundation', 'ngResource', 'ui.router'])
           .constant('config', require('config')())
           .provider('RouteTool', require('deploy_my_codes/providers/route_tool_provider'))
           .factory('AddApiKeyInHeadersInterceptor', ['$q', 'UserService', require('deploy_my_codes/interceptors/add_api_key_in_headers_interceptor')])
           .config(['$httpProvider', require('deploy_my_codes/config/interceptors')])
           .config(['$stateProvider', '$urlRouterProvider', 'RouteToolProvider', require('deploy_my_codes/config/routes')])
           .run(['$rootScope', '$state', '$window', 'AuthenticationService', require('deploy_my_codes/middlewares/authorize_user')])
           .run(['$rootScope', '$state', 'UserService', require('deploy_my_codes/middlewares/authenticated_route')])
           .run(['$injector', require('deploy_my_codes/middlewares/authorization_in_headers')])
           .service('APIHelper', ['config', require('deploy_my_codes/helpers/api_helper')])
           .service('AuthenticationRepository', ['$http', '$q', 'APIHelper', require('deploy_my_codes/repositories/authentication_repository')])
           .service('ProjectRepository', ['$http', '$q', 'APIHelper', require('deploy_my_codes/repositories/project_repository')])
           .service('AuthenticationService', ['$q', '$rootScope', 'AuthenticationRepository', 'UserService', require('deploy_my_codes/services/authentication_service')])
           .service('UserService', ['$q', 'LocalStorage', require('deploy_my_codes/services/user_service')])
           .service('ProjectService', ['$q', 'ProjectRepository', require('deploy_my_codes/services/project_service')])
           .controller('AuthenticationCtrl', ['$scope', '$state', 'AuthenticationService', require('deploy_my_codes/controllers/authentication_controller')])
           .controller('MenuCtl', ['$scope', 'UserService', require('deploy_my_codes/controllers/menu_controller')])
           .controller('RemoteProjectsCtl', ['$scope', 'ProjectService', require('deploy_my_codes/controllers/remote_projects_controller')])
  };
});
