'use strict';

angular.module('noviga')
  .controller('ChannelsetupController', ['$scope', '$modal', 'resolvedChannelsetup', 'Channelsetup',
    function ($scope, $modal, resolvedChannelsetup, Channelsetup) {

      $scope.channelsetups = resolvedChannelsetup;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.channelsetup = Channelsetup.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Channelsetup.delete({id: id},
          function () {
            $scope.channelsetups = Channelsetup.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Channelsetup.update({id: id}, $scope.channelsetup,
            function () {
              $scope.channelsetups = Channelsetup.query();
              $scope.clear();
            });
        } else {
          Channelsetup.save($scope.channelsetup,
            function () {
              $scope.channelsetups = Channelsetup.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.channelsetup = {
          
          "name": "",
          
          "samplingrate": "",
          
          "sensitivity": "",
          
          "autorangetime": "",
          
          "peakvalue": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var channelsetupSave = $modal.open({
          templateUrl: 'channelsetup-save.html',
          controller: 'ChannelsetupSaveController',
          resolve: {
            channelsetup: function () {
              return $scope.channelsetup;
            }
          }
        });

        channelsetupSave.result.then(function (entity) {
          $scope.channelsetup = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ChannelsetupSaveController', ['$scope', '$modalInstance', 'channelsetup',
    function ($scope, $modalInstance, channelsetup) {
      $scope.channelsetup = channelsetup;

      

      $scope.ok = function () {
        $modalInstance.close($scope.channelsetup);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
