//= require "angular"
//= require "angular-resource"
//= require "angular-sanitize"
//= require "angular-mailchimp"
//= require "jquery"
//= require "foundation"
//= require "smooth-scroll/smooth-scroll"
//= require_self

angular.module('notification', ['mailchimp']);

$(function() {
  $(document).foundation();
  $('.m-landing--notification-button').on('click', function() {
    $('.m-notification--field').focus();
  });
});
