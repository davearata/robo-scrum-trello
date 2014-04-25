'use strict';

angular.module('roboscrum-settings')
  .controller('SettingsCtrl', function ($scope, User, Auth, TrelloService) {
    $scope.errors = {};

    $scope.changePassword = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function () {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
          });
      }
    };

    $scope.isAuthorized = false;

    var trelloAuthorize = function (interactive) {
      TrelloService.authorize(interactive, 'popup', 'RoboScrum Trello', true, true, false).then(
        function () {
          $scope.isAuthorized = true;
        }
      ).catch(function () {
          throw Error;
        });
    };

    trelloAuthorize(false);

    $scope.connectTrello = function () {
      trelloAuthorize(true);
    };
  });
