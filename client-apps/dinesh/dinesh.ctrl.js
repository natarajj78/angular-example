(function() {
    'use strict';
    angular
        .module('myApp.dinesh')
        .controller('DineshController', DineshController);
        
    function DineshController( $routeParams, $http, $templateCache ) {
    	/* jshint validthis: true */
    	var op = this;
    	op.method = "DELETE";
    	op.serviceUrl ="deletemodule.html";
    	op.delImages = delImages;
    	
    	function delImages(){
            $http({method: op.method, url: op.url, cache: $templateCache}).
                success(function(data, status) {
                    op.status = status;
                    op.data = data;
                }).
                error(function(data, status) {
                    op.data = data || "Request failed";
                    op.status = status;
            }); 
    	};
    };   // end function 
})();