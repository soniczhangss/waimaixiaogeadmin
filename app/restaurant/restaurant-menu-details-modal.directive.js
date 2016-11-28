(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .directive('restaurantMenuDetailsModal', restaurantMenuDetailsModal);

  function restaurantMenuDetailsModal() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/restaurant/restaurant-menu-details-modal.html'
    };
    return directive;
  }
})();