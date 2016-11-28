(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('loadingModal', loadingModal);

  function loadingModal() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/layout/loading-modal.html'
    };
    return directive;
  }
})();