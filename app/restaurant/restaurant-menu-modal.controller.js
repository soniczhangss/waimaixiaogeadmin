(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantMenuModalController', RestaurantMenuModalController);

  RestaurantMenuModalController.$inject = ['logger', 'dataservice', '$scope', 'restaurant', '$uibModalInstance'];
  function RestaurantMenuModalController(logger, dataservice, $scope, restaurant, $uibModalInstance) {
    
    init();

    function init() {
      $scope.dish = {
        name: '',
        price: '',
        category: '',
        dishThumbnail: '',
        thumbnailObj: ''
      };
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    $scope.addADish = function () {
      $scope.$broadcast('show-errors-check-validity');
    	$scope.dish.dishThumbnail = $scope.dishImg ? $scope.dishImg.compressed.dataURL : angular.noop();
      $scope.dish.thumbnailObj = $scope.dishImg ? $scope.dishImg : angular.noop();
  		restaurant.menuItems.push($scope.dish);
  		$uibModalInstance.dismiss();
    };
  }
})();