'use strict';

angular.module('noviga')
  .controller('BusinessController', ['$scope', '$modal', 'resolvedBusiness', 'Business',
    function ($scope, $modal, resolvedBusiness, Business) {

      $scope.businesses = resolvedBusiness;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.business = Business.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Business.delete({id: id},
          function () {
            $scope.businesses = Business.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Business.update({id: id}, $scope.business,
            function () {
              $scope.businesses = Business.query();
              $scope.clear();
            });
        } else {
          Business.save($scope.business,
            function () {
              $scope.businesses = Business.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.business = {
          
          "name": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var businessSave = $modal.open({
          templateUrl: 'business-save.html',
          controller: 'BusinessSaveController',
          resolve: {
            business: function () {
              return $scope.business;
            }
          }
        });

        businessSave.result.then(function (entity) {
          $scope.business = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('BusinessSaveController', ['$scope', '$modalInstance', 'business',
    function ($scope, $modalInstance, business) {
      $scope.business = business;

      

      $scope.ok = function () {
        $modalInstance.close($scope.business);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
