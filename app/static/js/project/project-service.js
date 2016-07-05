'use strict';

angular.module('noviga')
  .factory('Project', ['$resource', function ($resource) {
    return $resource('noviga/projects/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
