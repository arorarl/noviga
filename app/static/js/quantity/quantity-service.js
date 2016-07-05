'use strict';

angular.module('noviga')
  .factory('Quantity', ['$resource', function ($resource) {
    return $resource('noviga/quantities/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
