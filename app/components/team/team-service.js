'use strict';

angular.module('roboscrum-team')
  .factory('Team', function ($resource) {
    var teamResource = $resource('/api/teams/:id');
    return {
      createTeam: function (team) {
        return teamResource.save(team).$promise;
      },
      get: function (id) {
        return teamResource.get({id: id}).$promise;
      },
      allTeams: function () {
        return teamResource.query().$promise;
      }
    };
  });
