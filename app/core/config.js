(function() {
  	'use strict';

  	var core = angular.module('app.core');
	
	core.config(router);

  	router.$inject = ['$stateProvider', '$urlRouterProvider'];

  	function router($stateProvider, $urlRouterProvider) {
  		$urlRouterProvider.otherwise('/home/restaurant-create');

		$stateProvider
		.state('app', {
			url: '/home',
			templateUrl: 'app/layout/home.html',
			ncyBreadcrumb: {
				skip: true
			}
		})
		.state('app.home', {
			abstract: true,
			views: {
				'top-nav': {
					templateUrl: 'app/layout/top-nav.html'
				},
				'content': {
					template: '<div ui-view></div>'
				}
			}
		})
		.state('app.home.restaurant-list', {
			url: '/restaurant-list',
			templateUrl: 'app/restaurant/restaurant-list.html',
			controller: 'RestaurantListController',
			ncyBreadcrumb: {
				label: '餐厅列表'
			}
		})
		.state('app.home.restaurant-details', {
			url: '/restaurant-details',
			templateUrl: 'app/restaurant/restaurant-details.html',
			controller: 'RestaurantDetailsController',
			params: {restaurant: null},
			ncyBreadcrumb: {
				label: '餐厅详细'
			}
		})
		.state('app.home.restaurant-create', {
			url: '/restaurant-create',
			templateUrl: 'app/restaurant/restaurant-create.html',
			controller: 'RestaurantCreateController',
			ncyBreadcrumb: {
				label: '餐厅创建'
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: 'app/user/login.html',
			controller: 'LoginController'
		});
  	}

	core.run(userAuth);

	userAuth.$inject = ['$rootScope', '$state', '$cookies'];

	function userAuth($rootScope, $state, $cookies) {
		$rootScope.globals = angular.fromJson($cookies.get('globals') || {});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			if (!$rootScope.globals.currentUser && !$state.is('login')) {
				$state.go('login');
			}
		});
  	}

	core.run(loadingModal);

	loadingModal.$inject = ['$rootScope', '$uibModal'];

	function loadingModal($rootScope, $uibModal) {
		var openModalEvents = ['loading restaurants', 'creating restaurants', 'updating restaurants'];
		var closeModalEvents = ['loading restaurants finished', 'creating restaurants finished', 'updating restaurants finished'];

		var modalInstance;

		var openModal = function() {
			modalInstance = $uibModal.open({
				animation: true,
				keyboard: false,
				backdrop: 'static',
				templateUrl: 'app/layout/loading-modal.html'
			});
		};

		var closeModal = function() {
			modalInstance.close();
		};

		angular.forEach(openModalEvents, function(value){
	        $rootScope.$on(value, openModal);
	    });

		angular.forEach(closeModalEvents, function(value){
	        $rootScope.$on(value, closeModal);
	    });
	}
})();