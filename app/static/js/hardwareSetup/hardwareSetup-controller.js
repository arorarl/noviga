'use strict';

angular.module('noviga')
  .controller('HardwareSetupController', ['$scope', '$modal', 'resolvedHardwareSetup', 'HardwareSetup',
    function ($scope, $modal, resolvedHardwareSetup, HardwareSetup) {

      $scope.hardwaresetups = resolvedHardwareSetup;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.hardwareSetup = HardwareSetup.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        HardwareSetup.delete({id: id},
          function () {
            $scope.hardwaresetups = HardwareSetup.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          HardwareSetup.update({id: id}, $scope.hardwareSetup,
            function () {
              $scope.hardwaresetups = HardwareSetup.query();
              $scope.clear();
            });
        } else {
          HardwareSetup.save($scope.hardwareSetup,
            function () {
              $scope.hardwaresetups = HardwareSetup.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.hardwareSetup = {
          
          "name": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var hardwareSetupSave = $modal.open({
          templateUrl: 'hardwareSetup-save.html',
          controller: 'HardwareSetupSaveController',
          resolve: {
            hardwareSetup: function () {
              return $scope.hardwareSetup;
            }
          }
        });

        hardwareSetupSave.result.then(function (entity) {
          $scope.hardwareSetup = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('HardwareSetupSaveController', ['$scope', '$modalInstance', 'hardwareSetup',
    function ($scope, $modalInstance, hardwareSetup) {
      $scope.hardwareSetup = hardwareSetup;

      

      $scope.ok = function () {
        $modalInstance.close($scope.hardwareSetup);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
