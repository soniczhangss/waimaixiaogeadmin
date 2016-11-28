(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantCreateController', RestaurantCreateController);

  RestaurantCreateController.$inject = ['logger', '$state', 'dataservice', '$scope', '$uibModal'];
  /* @ngInject */
  function RestaurantCreateController(logger, $state, dataservice, $scope, $uibModal) {

    init();

    function init() {
      $scope.restaurant = {
        imageSrc: '',
        address: '',
        contactNum: '',
        description: '',
        style: '',
        name: '',
        menuItems: []
      };
    }

    $scope.save = function () {
      $scope.$emit('creating restaurants');
      $scope.$broadcast('show-errors-check-validity');
      dataservice.addARestaurant($scope.restaurant, $scope.restaurantImg).then(
        function (result) {
          $state.go('app.home.restaurant-list');
        },
        function (error) {
          logger.error(error, error.stack, '餐厅保存失败');
        }
      ).finally(function() {
        $scope.$emit('creating restaurants finished');
      });
    };

    $scope.newMenuItem = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'lg',
        controller: 'RestaurantMenuModalController',
        templateUrl: 'app/restaurant/restaurant-menu-modal.html',
        resolve: {
          restaurant: function () {
            return $scope.restaurant;
          }
        }
      });
    };

    $scope.open = function (dish) {
      $uibModal.open({
        animation: true,
        size: 'lg',
        keyboard: false,
        backdrop: 'static',
        controller: 'RestaurantMenuDetailsModalController',
        templateUrl: 'app/restaurant/restaurant-menu-details-modal.html',
        resolve: {
          data: function () {
            return {
              dish: dish,
              restaurant: $scope.restaurant
            };
          }
        }
      });
    };
  }
})();