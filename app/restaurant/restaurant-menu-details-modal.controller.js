(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantMenuDetailsModalController', RestaurantMenuDetailsModalController);

  RestaurantMenuDetailsModalController.$inject = ['logger', 'dataservice', '$scope', 'data', '$uibModalInstance'];
  function RestaurantMenuDetailsModalController(logger, dataservice, $scope, data, $uibModalInstance) {
    
    var dish = data.dish;

    init();

    function init() {
      $scope.dish = {
        name: '',
        price: '',
        category: '',
        dishThumbnail: '',
        thumbnailObj: ''
      };

      if (!angular.isUndefined(dish)) {
        $scope.dish.name = dish.name;
        $scope.dish.price = dish.price;
        $scope.dish.category = dish.category;
        $scope.dish.dishThumbnail = dish.dishThumbnail;
        $scope.dish.thumbnailObj = dish.thumbnailObj;
      }
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    $scope.remove = function () {
      var index = data.restaurant.menuItems.indexOf(dish);
      if (data.restaurant.menuItems.splice(index, 1))
        $uibModalInstance.dismiss();
    };

    $scope.updateADishInfo = function () {
      $scope.$broadcast('show-errors-check-validity');
      if (!angular.isUndefined(dish)) {
        dish.name = $scope.dish.name;
        dish.price = $scope.dish.price;
        dish.category = $scope.dish.category;
        if ($scope.dish.thumbnailObj) {
          dish.dishThumbnail = $scope.dish.thumbnailObj.compressed.dataURL;
          dish.thumbnailObj = $scope.dish.thumbnailObj;
        }
      }
  		$uibModalInstance.dismiss();
    };
  }
})();