'use strict';

angular.module('roboScrumTrelloApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'roboscrum-user',
  'roboscrum-auth',
  'roboscrum-session',
  'roboscrum-settings',
  'roboscrum-teams-list',
  'roboscrum-addteam',
  'roboscrum-teamdetails',
  'roboscrum-navbar'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/teams', {
        templateUrl: 'partials/teams-list',
        controller: 'TeamsListCtrl'
      })
      .when('/teams/:id', {
        templateUrl: 'partials/team-details',
        controller: 'TeamDetailsCtrl'
      })
      .when('/teams/add', {
        templateUrl: 'partials/teams-add',
        controller: 'AddTeamCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });