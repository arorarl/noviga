'use strict';

angular.module('noviga')
  .factory('Channelsetup', ['$resource', function ($resource) {
    return $resource('noviga/channelsetups/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
