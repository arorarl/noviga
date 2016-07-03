'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Chassis', {
        templateUrl: 'views/Chassis/Chassis.html',
        controller: 'ChassisController',
        resolve:{
          resolvedChassis: ['Chassis', function (Chassis) {
            return Chassis.query();
          }]
        }
      })
    }]);
