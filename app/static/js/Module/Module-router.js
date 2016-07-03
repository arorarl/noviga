'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Modules', {
        templateUrl: 'views/Module/Modules.html',
        controller: 'ModuleController',
        resolve:{
          resolvedModule: ['Module', function (Module) {
            return Module.query();
          }]
        }
      })
    }]);
