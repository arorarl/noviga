'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/hardwaresetups', {
        templateUrl: 'views/hardwareSetup/hardwaresetups.html',
        controller: 'HardwareSetupController',
        resolve:{
          resolvedHardwareSetup: ['HardwareSetup', function (HardwareSetup) {
            return HardwareSetup.query();
          }]
        }
      })
    }]);
