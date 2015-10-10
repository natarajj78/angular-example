(function() {
    'use strict';
    angular
        .module('myApp.vadlamani')
        .controller('PtiflistController', PtiflistController);
        
    function PtiflistController( $scope, $routeParams, patientInfo) {
    	/* jshint validthis: true */
    	//var op = this;
    	$scope.filterOptions = {
            name:"",
            mrn:"",
            clinic:"",
            filterText: "",
            useExternalFilter: true
        };
        $scope.currentPage = 0;
        $scope.pageSize = 2;  
        $scope.orderStr ='treatmetId';
        $scope.nopages = 1;
        $scope.ptif = patientInfo.get({
            patientId: $routeParams.patientId
        }, function (ptif) { $scope.nopages=Math.ceil(ptif.Records.length/$scope.pageSize); });
        $scope.listData=function(index){
            if(jQuery(index)){
                alert(jQuery(index).length);
            }
        };
        $scope.clearTxt=function(){
            $scope.filterOptions.name   = "";
            $scope.filterOptions.mrn    = "";
            $scope.filterOptions.clinic = "";
        }; // end clearTxt().

        $scope.search=function(){
            //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText,$scope.filterOptions);
        };
    };   // end function 
})();