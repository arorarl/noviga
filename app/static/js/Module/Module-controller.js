'use strict';

angular.module('noviga')
  .controller('ModuleController', ['$scope', '$modal', 'resolvedModule', 'Module',
    function ($scope, $modal, resolvedModule, Module) {

      $scope.Modules = resolvedModule;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.Module = Module.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Module.delete({id: id},
          function () {
            $scope.Modules = Module.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Module.update({id: id}, $scope.Module,
            function () {
              $scope.Modules = Module.query();
              $scope.clear();
            });
        } else {
          Module.save($scope.Module,
            function () {
              $scope.Modules = Module.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.Module = {
          
          "modelNo": "",
          
          "maxChannels": "",
          
          "maxSamplingRate": "",
          
          "peakVoltRange": "",
          
          "type": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var ModuleSave = $modal.open({
          templateUrl: 'Module-save.html',
          controller: 'ModuleSaveController',
          resolve: {
            Module: function () {
              return $scope.Module;
            }
          }
        });

        ModuleSave.result.then(function (entity) {
          $scope.Module = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ModuleSaveController', ['$scope', '$modalInstance', 'Module',
    function ($scope, $modalInstance, Module) {
      $scope.Module = Module;

      

      $scope.ok = function () {
        $modalInstance.close($scope.Module);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
