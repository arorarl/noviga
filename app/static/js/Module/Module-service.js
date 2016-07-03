'use strict';

angular.module('noviga')
  .factory('Module', ['$resource', function ($resource) {
    return $resource('noviga/Modules/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
