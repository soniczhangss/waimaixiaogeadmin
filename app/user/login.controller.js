(function () {
    'use strict';
 
    angular
        .module('app.user')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$rootScope', '$state', '$cookies', '$scope'];
    function LoginController($rootScope, $state, $cookies, $scope) {
 
        $scope.login = function() {
            if ($scope.username === 'admin' && $scope.password === 'admin') {
				$rootScope.globals = {
					currentUser: 'admin'
				};
				var now = new Date();
				var exp = new Date(now.getTime() + 3600*1000);
				$cookies.putObject('globals', $rootScope.globals, {expires: exp});
				$state.go('app.home.restaurant-list');
			}
        };
    }
 
})();