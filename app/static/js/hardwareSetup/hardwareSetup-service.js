'use strict';

angular.module('noviga')
  .factory('HardwareSetup', ['$resource', function ($resource) {
    return $resource('noviga/hardwaresetups/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
