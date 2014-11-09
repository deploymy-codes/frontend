//= require "deploy_my_codes/dependencies"
//
//= require_self
//
//= require_tree "./templates"
//
//= require "deploy_my_codes/providers/route_tool_provider"
//
//= require "deploy_my_codes/middlewares/already_logged_in_user"
//= require "deploy_my_codes/middlewares/authenticated_route"
//= require "deploy_my_codes/middlewares/authorization_in_headers"
//
//= require "deploy_my_codes/config/oauth"
//= require "deploy_my_codes/config/routes"
//
//= require "deploy_my_codes/services/authentication_service"
//= require "deploy_my_codes/services/user_service"
//
//= require "deploy_my_codes/controllers/authentication_controller"
//= require "deploy_my_codes/controllers/menu_controller"

angular.module('DeployMyCodes', ['localstorage', 'mm.foundation', 'ngResource', 'satellizer', 'templates', 'ui.router', 'underscore']);
