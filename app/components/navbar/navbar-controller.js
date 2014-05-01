'use strict';

angular.module('roboscrum-navbar')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    var homeMenu = {
      'title': 'Home',
      'link': '/'
    };

    if(!!$scope.currentUser) {
      homeMenu.link = '/teams';
    }

    $scope.menu = [homeMenu,
      {
      'title': 'Settings',
      'link': '/settings'
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
