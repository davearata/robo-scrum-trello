'use strict';

angular.module('roboscrum-team')
  .factory('Team', function ($resource) {
    return $resource('/api/teams/:id');
  });
