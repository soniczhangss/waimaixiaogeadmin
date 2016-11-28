(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantDetailsController', RestaurantDetailsController);

  RestaurantDetailsController.$inject = ['logger', '$state', 'dataservice', '$scope', '$uibModal', '$stateParams'];
  function RestaurantDetailsController(logger, $state, dataservice, $scope, $uibModal, $stateParams) {
    
    init();

    function init() {
      var restaurant = $stateParams.restaurant;

      $scope.restaurant = {
        imageSrc: angular.isUndefined(restaurant.restaurantThumbnail) ? '' : restaurant.restaurantThumbnail.S,
        address: angular.isUndefined(restaurant.restaurantAddress) ? '' : restaurant.restaurantAddress.S,
        contactNum: angular.isUndefined(restaurant.restaurantContactNumber) ? '' : restaurant.restaurantContactNumber.S,
        description: angular.isUndefined(restaurant.restaurantDescription) ? '' : restaurant.restaurantDescription.S,
        style: angular.isUndefined(restaurant.restaurantStyle) ? '' : restaurant.restaurantStyle.S,
        id: angular.isUndefined(restaurant.restaurantId) ? '' : restaurant.restaurantId.S,
        name: angular.isUndefined(restaurant.restaurantName) ? '' : restaurant.restaurantName.S,
      };
      
      if (restaurant.restaurantMenu) {
        var menuItems = [];
        angular.forEach(restaurant.restaurantMenu.L, function (value, key) {
          var dish = {};
          dish.name = angular.isUndefined(value.M.name) ? '' : value.M.name.S;
          dish.price = angular.isUndefined(value.M.price) ? '' : value.M.price.N;
          dish.category = angular.isUndefined(value.M.category) ? '' : value.M.category.S;
          dish.dishThumbnail = angular.isUndefined(value.M.dishThumbnail) ? '' : value.M.dishThumbnail.S;
          menuItems.push(dish);
        });

        $scope.restaurant.menuItems = menuItems;
      } else {
        $scope.restaurant.menuItems = [];
      }
    }

    $scope.save = function () {
      $scope.$emit('updating restaurants');
      dataservice.updateARestaurant($scope.restaurant, $scope.restaurantImg).then(
        function (result) {
          $state.go('app.home.restaurant-list', {}, {reload: true});
        },
        function (error) {
          logger.error(error, error.stack, '餐厅更新失败');
        }
      ).finally(function() {
        $scope.$emit('updating restaurants finished');
      });
    };

    $scope.delete = function () {
      dataservice.deleteARestaurant($scope.restaurant).then(
        function (result) {
          $state.go('app.home.restaurant-list', {}, {reload: true});
        },
        function (error) {
          logger.error(error, error.stack, '餐厅删除失败');
        }
      );
    };

    $scope.newMenuItem = function () {
      $uibModal.open({
        animation: true,
        size: 'lg',
        keyboard: false,
        backdrop: 'static',
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