'use strict';

angular.module('roboscrum-teams-list')
  .controller('TeamsListCtrl', function ($scope, Team) {
    Team.allTeams().then(function (teams) {
      $scope.teams = teams;
    }).catch( function(err) {
      throw err;
    });
  });