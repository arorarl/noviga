'use strict';

angular.module('noviga')
  .controller('UnitController', ['$scope', '$modal', 'resolvedUnit', 'Unit',
    function ($scope, $modal, resolvedUnit, Unit) {

      $scope.units = resolvedUnit;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.unit = Unit.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Unit.delete({id: id},
          function () {
            $scope.units = Unit.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Unit.update({id: id}, $scope.unit,
            function () {
              $scope.units = Unit.query();
              $scope.clear();
            });
        } else {
          Unit.save($scope.unit,
            function () {
              $scope.units = Unit.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.unit = {
          
          "name": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var unitSave = $modal.open({
          templateUrl: 'unit-save.html',
          controller: 'UnitSaveController',
          resolve: {
            unit: function () {
              return $scope.unit;
            }
          }
        });

        unitSave.result.then(function (entity) {
          $scope.unit = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UnitSaveController', ['$scope', '$modalInstance', 'unit',
    function ($scope, $modalInstance, unit) {
      $scope.unit = unit;

      

      $scope.ok = function () {
        $modalInstance.close($scope.unit);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
