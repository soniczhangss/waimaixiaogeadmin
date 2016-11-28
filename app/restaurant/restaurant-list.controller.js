(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantListController', RestaurantListController);

  RestaurantListController.$inject = ['logger', 'dataservice', '$scope', '$state'];
  function RestaurantListController(logger, dataservice, $scope, $state) {

    init();

    function init() {
      $scope.$emit('loading restaurants');
      dataservice.getRestaurants().then(
        function (result) {
          $scope.restaurants = result.Items;
        },
        function (error) {
          logger.error(error.statusText, error.stack, '餐厅获取失败');
        }
      ).finally(function() {
        $scope.$emit('loading restaurants finished');
      });
    }

    $scope.open = function (restaurant) {
      $state.go('app.home.restaurant-details', {restaurant: restaurant});
    };
  }
})();