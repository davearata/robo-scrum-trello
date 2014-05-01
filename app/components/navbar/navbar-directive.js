'use strict';

angular.module('roboscrum-navbar')
  .directive('navbar', function() {
    return {
      restrict: 'E',
      replace: true,
      controller: 'NavbarCtrl',
      templateUrl: 'partials/navbar.html'
    }
  });