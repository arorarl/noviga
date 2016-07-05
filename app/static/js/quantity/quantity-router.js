'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/quantities', {
        templateUrl: 'views/quantity/quantities.html',
        controller: 'QuantityController',
        resolve:{
          resolvedQuantity: ['Quantity', function (Quantity) {
            return Quantity.query();
          }]
        }
      })
    }]);
