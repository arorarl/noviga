'use strict';

angular.module('noviga')
  .factory('Hwchaschanmap', ['$resource', function ($resource) {
    return $resource('noviga/hwchaschanmaps/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
