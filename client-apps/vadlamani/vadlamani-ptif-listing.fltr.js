(function() {
    'use strict';
    angular
        .module('myApp.vadlamani')
        .filter('startFrom', startFrom);
        
    function startFrom() {
    	/* jshint validthis: true */
    	return function(input, start) {
        	start = +start; //parse to int
        	return input.slice(start);
    	};
    };   // end function 
})();