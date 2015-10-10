(function() {
    'use strict';
    angular
        .module('myApp.dashBoard')
        .controller('DashboardController', DashboardController);

	//clListCtrl.$inject=['$routeParams','$http','$templateCache'];
	
    function DashboardController() {
    	/* jshint validthis: true */
    	var db = this;
    	db.setTheme = setTheme;
    	
    	function setTheme(theme) {
        	db.theme = theme;
	    };
    }   // end function 
})();