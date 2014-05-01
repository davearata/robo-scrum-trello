'use strict';

angular.module('roboscrum-teamdetails')
  .controller('TeamDetailsCtrl', function ($scope, $routeParams, Team) {
    var teamId = $routeParams.id;
    Team.get(teamId).then(
      function (team) {
        $scope.team = team;
      }
    ).catch(function (err) {
        throw err;
      });
  });