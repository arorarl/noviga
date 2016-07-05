'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/hwchaschanmaps', {
        templateUrl: 'views/hwchaschanmap/hwchaschanmaps.html',
        controller: 'HwchaschanmapController',
        resolve:{
          resolvedHwchaschanmap: ['Hwchaschanmap', function (Hwchaschanmap) {
            return Hwchaschanmap.query();
          }]
        }
      })
    }]);
