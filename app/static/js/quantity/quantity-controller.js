'use strict';

angular.module('noviga')
  .controller('QuantityController', ['$scope', '$modal', 'resolvedQuantity', 'Quantity',
    function ($scope, $modal, resolvedQuantity, Quantity) {

      $scope.quantities = resolvedQuantity;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.quantity = Quantity.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Quantity.delete({id: id},
          function () {
            $scope.quantities = Quantity.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Quantity.update({id: id}, $scope.quantity,
            function () {
              $scope.quantities = Quantity.query();
              $scope.clear();
            });
        } else {
          Quantity.save($scope.quantity,
            function () {
              $scope.quantities = Quantity.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.quantity = {
          
          "name": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var quantitySave = $modal.open({
          templateUrl: 'quantity-save.html',
          controller: 'QuantitySaveController',
          resolve: {
            quantity: function () {
              return $scope.quantity;
            }
          }
        });

        quantitySave.result.then(function (entity) {
          $scope.quantity = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('QuantitySaveController', ['$scope', '$modalInstance', 'quantity',
    function ($scope, $modalInstance, quantity) {
      $scope.quantity = quantity;

      

      $scope.ok = function () {
        $modalInstance.close($scope.quantity);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
