'use strict';

angular.module('roboScrumTrelloApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
