'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/units', {
        templateUrl: 'views/unit/units.html',
        controller: 'UnitController',
        resolve:{
          resolvedUnit: ['Unit', function (Unit) {
            return Unit.query();
          }]
        }
      })
    }]);
