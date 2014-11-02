//= require "angular"
//= require "ui-router"
//= require "angular-resource"
//= require "satellizer"
//= require_self
//
//= require "deploy_my_codes/config/authentication"
//
//= require "deploy_my_codes/controllers/authentication_controller"

angular.module('DeployMyCodes', ['ngResource', 'satellizer', 'ui.router']);
