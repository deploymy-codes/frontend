//= require "angular"
//= require "ui-router"
//= require "angular-resource"
//= require "angular-underscore"
//= require "angular-foundation"
//= require "satellizer"
//
//= require_self
//
//= require "deploy_my_codes/config/authentication"
//= require "deploy_my_codes/config/oauth"
//= require "deploy_my_codes/config/routes"
//
//= require "deploy_my_codes/services/authentication_service"
//= require "deploy_my_codes/services/user_service"
//
//= require "deploy_my_codes/controllers/authentication_controller"
//= require "deploy_my_codes/controllers/menu_controller"
//
//= require "deploy_my_codes/directives/menu_directive"

angular.module('DeployMyCodes', ['mm.foundation', 'ngResource', 'satellizer', 'ui.router', 'underscore']);
