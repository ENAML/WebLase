'use strict';

angular.module('webLaseAppApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
