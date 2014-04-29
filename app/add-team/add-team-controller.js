'use strict';

angular.module('roboscrum-addteam')
  .controller('AddTeamCtrl', function ($scope, $location, Team) {
    $scope.team = {};
    $scope.team.members = [{name: ''}];
    $scope.errors = {};

    $scope.addMember = function() {
      $scope.team.members.push({});
    };

    $scope.addTeam = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Team.createTeam({
          name: $scope.team.name,
          members: $scope.team.members
        })
          .then( function() {
            // Account created, redirect to home
            $location.path('/teams');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };
  });