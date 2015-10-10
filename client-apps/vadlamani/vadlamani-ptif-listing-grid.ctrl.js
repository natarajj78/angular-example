(function() {
    'use strict';
    angular
        .module('myApp.vadlamani')
        .controller('PtiflistgridController', PtiflistgridController);
    
	function PtiflistgridController($scope, $http) {
		$scope.currentdate = new Date();
		$scope.time = "Any time";
		$scope.mySelections = [];
		$scope.filterOptions = {

			name : "",
			mrn : "",
			clinic : "",
			dateStart : "",
			dateEnd : "",
			filterText : "",
			useExternalFilter : true
		};
		$scope.dateCalc = function(noofDays) {
			var date = new Date();
			var yesterday = date - 1000 * 60 * 60 * 24 * noofDays;
			return new Date(yesterday);
		};

		$scope.totalServerItems = 0;
		$scope.pagingOptions = {
			pageSizes : [2, 3, 4, 5, 10, 20],
			pageSize : 2,
			currentPage : 1
		};
		$scope.isShowPtifDetails = false;
		$scope.isDetailDisplayed = false;
		$scope.TableStyle = {
			top : -5
		};
		$scope.mycellTemplate = "<div class=''><<input type='checkbox'/></div>";
		$scope.childTemplate = "<div ng-mouseover='showChildDetails($event, row);' ng-mouseleave='hideChildDetails($event, row)'>{{row.treatmentId}}</div>";

		$scope.setPagingData = function(data, page, pageSize) {
			var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
			$scope.myData = pagedData;
			$scope.totalServerItems = data.length;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		};
		$scope.getPagedDataAsync = function(pageSize, page, searchText, fOptions) {
			setTimeout(function() {
				var data;
				var params_val = {
					name : $scope.filterOptions.name,
					mrn : $scope.filterOptions.mrn,
					clinic : $scope.filterOptions.clinic
				};
				params_val = "searchParams={name:" + $scope.filterOptions.name + ",mrn:" + $scope.filterOptions.mrn + ",clinic:" + $scope.filterOptions.clinic + "}";

				// BELOW IS THE AJAX SECTION OF THE CODE ..

				// if (searchText) {
				//     var ft = searchText.toLowerCase();
				//     //$http.get('data/data.json')
				//     $.ajax({
				//         type: "GET",
				//         //url:'http://ptif-service.qa-intranet.fmcna.com/ptifservicesptif/treatmentSheets?responseContentType=application/json&searchParams={"shiftDate":"2014-06-26"}',
				//         "url":'data/data.json?',
				//         dataType: "jsonp",
				//         //data: 'searchParams={"shiftDate":"2014-06-26"}',
				//         contentType: "application/json",
				//         success: function(ptifResponse) {
				//             console.log( JSON.parse(ptifResponse) );
				//             //alert(JSON.stringify(ptifResponse[0].fullName))
				//             data = ptifResponse.filter(function(item) {
				//                 //alert( item);
				//                 return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
				//                 //return item.toLowerCase().indexOf(ft) != -1;
				//             });
				//             $scope.setPagingData(data.Records,page,pageSize);
				//         },error: function(jqXHR, textStatus, errorThrown) {
				//             //alert(JSON.stringify(jqXHR));
				//         }
				//       });

				// } else {
				//     //$http.get('data/data.json')
				//     $.support.cors = true;
				//     $.ajax({
				//         headers: {
				//             Accept : "application/json",
				//             "Content-Type": "application/json"
				//         },
				//         type: "GET",
				//         //url:'http://localhost:7001/ptif/treatmentSheets?responseContentType=application/json',
				//         "url":'data/data.json',
				//         //dataType: "jsonp",
				//         async: false,
				//         //data: params_val,
				//         contentType: "application/json",
				//         success: function(ptifResponse) {
				//             console.log( JSON.parse(ptifResponse) );
				//             $scope.setPagingData(ptifResponse,page,pageSize);
				//         },error: function(jqXHR, textStatus, errorThrown) {
				//             //alert(JSON.stringify(jqXHR));
				//         }
				//     });
				// }   // END AJAX CODE

				//  BELOW IS THE HTTP SECTION OF THE CODE
				if (searchText) {
					var ft = searchText.toLowerCase();
					//$http.get('data/data.json')
					$http({
						"url" : "client-apps/vadlamani/ptif-data.json",
						"method" : "GET",
						"headers" : {
							'Content-Type' : 'application/json'
						},
						"params" : {
							searchParams : params_val
						}
					}).success(function(largeLoad) {
						data = largeLoad.filter(function(item) {
							return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
						});
						$scope.setPagingData(data.Records, page, pageSize);
					});
				} else {
					//$http.get('data/data.json')
					$http({
						"url" : "client-apps/vadlamani/ptif-data.json",
						"method" : "GET",
						"headers" : {
							'Content-Type' : 'application/json'
						},
						//"params":{searchParams:{shiftDate:"2014-06-26", age:"20" }}
						"params" : {
							searchParams : params_val
						}
					}).success(function(largeLoad) {
						$scope.setPagingData(largeLoad.Records, page, pageSize);
					});
				} // END HTTP SECTION CODE

			}, 100);
		};
		$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

		$scope.$watch('time', function(newVal, oldVal) {
			jQuery(".time").text("");
			$scope.filterOptions.dateEnd = $scope.currentdate;
			if (angular.equals($scope.time, "Any time")) {
				$scope.filterOptions.dateStart = '';
				$scope.filterOptions.dateEnd = '';
			}
			if (angular.equals($scope.time, "Past hour")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(1);
			}
			if (angular.equals($scope.time, "Past 24 hours")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(1);
			}
			if (angular.equals($scope.time, "Past week")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(7);
			}
			if (angular.equals($scope.time, "Past 2 week")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(14);
			}
			if (angular.equals($scope.time, "Past 4 week")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(28);
			}
			if (angular.equals($scope.time, "Past 180 days")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(180);
			}
			if (angular.equals($scope.time, "Past year")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(365);
			}
			if (angular.equals($scope.time, "Past 2 years")) {
				$scope.filterOptions.dateStart = $scope.dateCalc(770);
			}
			if (angular.equals($scope.time, "Custom range")) {
				$scope.time = "";
			}

		}, true);

		$scope.$watch('pagingOptions', function(newVal, oldVal) {
			//if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText, $scope.filterOptions);
			//}
		}, true);
		$scope.$watch('filterOptions', function(newVal, oldVal) {
			//if (newVal !== oldVal) {
			if ($scope.filterOptions.name.length >= 3) {
				$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText, $scope.filterOptions);
			}
		}, true);
		$scope.grid = {
			options : {
				data : 'myData',
				enablePaging : true,
				showFooter : true,
				totalServerItems : 'totalServerItems',
				pagingOptions : $scope.pagingOptions,
				filterOptions : $scope.filterOptions,
				selectedItems : $scope.selected,
				multiSelect : true,
				afterSelectionChange : function() {
					$scope.details = $scope.mySelections;
				},
				showSelectionCheckbox : true,
				selectWithCheckboxOnly : true,
				columnDefs : [
				/*{field:"", displayName:"", cellTemplate: '<div>&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target=".bs-example-modal-lg"><span class="glyphicon glyphicon-user"></span></button></div>', width: 50},*/
				//{field:"", displayName:"", cellTemplate: '<div>&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target=".bs-edit-modal-lg"><span class="class="btn btn-default btn-xs"><img src="images/pdf_small.jpg"/></span></button></div>', width: 50},
				{
					field : "",
					displayName : "",
					cellTemplate : '<div ng-click="onPdfClick(row);">&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs" ><span class="class="btn btn-default btn-xs"><img src="images/pdf_small.jpg"/></span></button></div>',
					width : 50
				}, {
					field : "",
					displayName : "",
					cellTemplate : '<div>&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs"  data-toggle="modal" data-target="#dialoggrid" ng-click="listData(this);"><span class="glyphicon glyphicon-th-list "></span></button></div>',
					width : 50
				},

				/*{field:"treatmentId", displayName:"TreatmentID"},*/  ///cellTemplate:$scope.childTemplate
				{
					field : "mrn",
					displayName : "MRN"
				}, {
					field : "fullName",
					displayName : "Patient"
				}, {
					field : "clinicName",
					displayName : "Clinic"
				}, {
					field : "shiftNumber",
					displayName : "Shift Number"
				},
				/*  {field:"shiftStatus", displayName:"Shift Status"},*/
				/*  {field:"fFluids", displayName:"TFluids"},*/
				{
					field : "shiftDate",
					displayName : "Shift Date",
					cellFilter : 'date:\'MM/dd/yyyy\''
				}
				//{field:"shiftDate", displayName:"Date", cellTemplate: '<div class="yellow" ><div class="ngCellText">{{row.getProperty(col.field)||"&nbsp"}}</div></div>', maxWidth: 100 }
				]
			},
			optionsExt : {
				data : 'myData',
				multiSelect : false
			}
		};
		$scope.onPdfClick = function(index) {
			window.open("http://ptif-service.qa-intranet.fmcna.com/ptif/treatmentSheet/pdf?treatmentId=" + index.entity.treatmentId, "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");
		};
		$scope.listData = function(index) {
			if (jQuery(index)) {
				console.log(index.h);
			}
		};
		$scope.showChildDetails = function(evt, rowItem) {
			$scope.TableStyle.top = (rowItem.rowIndex * 30) - 5;
			$scope.TableData = rowItem;
			$scope.isShowPtifDetails = true;
		};
		$scope.hideChildDetails = function(evt, rowData) {
			$scope.isShowPtifDetails = false;
		};
		$scope.showHideChildDetails = function() {
			if ($scope.isDetailDisplayed || $scope.isShowBooks) {
				return true;
			} else {
				return false;
			}
		};
		$scope.clearTxt = function() {
			$scope.filterOptions.name = "";
			$scope.filterOptions.mrn = "";
			$scope.filterOptions.clinic = "";
		};// end clearTxt().
		$scope.search = function() {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText, $scope.filterOptions);
		};
		$scope.details = null;
	} // end : ptif-grid-Ctrl - function.

})();