'use strict';

angular.module('roboscrum-session')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
