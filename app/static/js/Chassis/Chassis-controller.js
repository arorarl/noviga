'use strict';

angular.module('noviga')
  .controller('ChassisController', ['$scope', '$modal', 'resolvedChassis', 'Chassis',
    function ($scope, $modal, resolvedChassis, Chassis) {

      $scope.Chassis = resolvedChassis;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.Chassis = Chassis.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Chassis.delete({id: id},
          function () {
            $scope.Chassis = Chassis.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Chassis.update({id: id}, $scope.Chassis,
            function () {
              $scope.Chassis = Chassis.query();
              $scope.clear();
            });
        } else {
          Chassis.save($scope.Chassis,
            function () {
              $scope.Chassis = Chassis.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.Chassis = {
          
          "modelNo": "",
          
          "maxSlots": "",
          
          "connectionType": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var ChassisSave = $modal.open({
          templateUrl: 'Chassis-save.html',
          controller: 'ChassisSaveController',
          resolve: {
            Chassis: function () {
              return $scope.Chassis;
            }
          }
        });

        ChassisSave.result.then(function (entity) {
          $scope.Chassis = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ChassisSaveController', ['$scope', '$modalInstance', 'Chassis',
    function ($scope, $modalInstance, Chassis) {
      $scope.Chassis = Chassis;

      

      $scope.ok = function () {
        $modalInstance.close($scope.Chassis);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
