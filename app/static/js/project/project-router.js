'use strict';

angular.module('noviga')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'views/project/projects.html',
        controller: 'ProjectController',
        resolve:{
          resolvedProject: ['Project', function (Project) {
            return Project.query();
          }]
        }
      })
    }]);
