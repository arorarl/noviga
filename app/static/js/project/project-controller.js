'use strict';

angular.module('noviga')
  .controller('ProjectController', ['$scope', '$modal', 'resolvedProject', 'Project',
    function ($scope, $modal, resolvedProject, Project) {

      $scope.projects = resolvedProject;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.project = Project.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Project.delete({id: id},
          function () {
            $scope.projects = Project.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Project.update({id: id}, $scope.project,
            function () {
              $scope.projects = Project.query();
              $scope.clear();
            });
        } else {
          Project.save($scope.project,
            function () {
              $scope.projects = Project.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.project = {
          
          "name": "",
          
          "created_on": "",
          
          "description": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var projectSave = $modal.open({
          templateUrl: 'project-save.html',
          controller: 'ProjectSaveController',
          resolve: {
            project: function () {
              return $scope.project;
            }
          }
        });

        projectSave.result.then(function (entity) {
          $scope.project = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ProjectSaveController', ['$scope', '$modalInstance', 'project',
    function ($scope, $modalInstance, project) {
      $scope.project = project;

      

      $scope.ok = function () {
        $modalInstance.close($scope.project);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
