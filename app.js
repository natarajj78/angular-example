(function() {
    'use strict';
    angular.module('myApp', [
      'myApp.dashBoard',
      'myApp.dinesh',
      'myApp.vadlamani',
      'myApp.html',
      'myApp.css',
      'myApp.tools',
      'ngRoute',
      'ngResource',        
      'ngCookies',
  	 'ngSanitize',
  	 'fusioncharts'
    ]).constant('version', 'v0.1.0').  constant('UTILS', {
    	findOne: function (array, cb) {
      	var results = [];
      	array.forEach(function (item) {
        	if (cb(item)) { results.push(item); }
      	});
      	if (results.length === 0) { return; }
      	if (results.length === 1) { return results[0]; }
      	throw "too many results";
    	}
  	}).config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.when('/',           {templateUrl: 'client-apps/dashboard/dashboard-index.tpl.html'})
        $routeProvider.when('/dinesh-1b',  {templateUrl: 'client-apps/dinesh/dinesh-1b.tpl.html'})
        $routeProvider.when('/dinesh-3a',  {templateUrl: 'client-apps/dinesh/dinesh-3a.tpl.html'})
        $routeProvider.when('/dinesh-3b',  {templateUrl: 'client-apps/dinesh/dinesh-3b.tpl.html'})
        $routeProvider.when('/dinesh-3p',  {templateUrl: 'client-apps/dinesh/dinesh-3p.tpl.html', controller: 'DineshController', controllerAs:'pm'})
        $routeProvider.when('/dinesh-jqtables',  {templateUrl: 'client-apps/dinesh/dinesh-jqtables.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-login',  {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-login.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-listing',  {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-listing.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-listing-grid',  {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-listing-grid.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-listing-services',  {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-listing-services.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-listing-services',  {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-listing-services.tpl.html'})
        $routeProvider.when('/vadlamani-ptif-listing-services/:id', {templateUrl: 'client-apps/vadlamani/vadlamani-ptif-listing-services.tpl.html'})
        $routeProvider.when('/http-basics', {templateUrl: 'client-apps/html/http-basics.tpl.html'})
        $routeProvider.when('/html-fundamentals', {templateUrl: 'client-apps/html/html-fundamentals.tpl.html'})
        $routeProvider.when('/html-structure-semantics', {templateUrl: 'client-apps/html/html-structure-semantics.tpl.html'})
        $routeProvider.when('/html-forms', {templateUrl: 'client-apps/html/html-forms.tpl.html'})
        $routeProvider.when('/html-audio-video', {templateUrl: 'client-apps/html/html-audio-video.tpl.html'})
        $routeProvider.when('/html-create-email', {templateUrl: 'client-apps/html/html-create-email.tpl.html'})
        $routeProvider.when('/css-fundamentals', {templateUrl: 'client-apps/css/css-fundamentals.tpl.html'})
        $routeProvider.when('/css-typography', {templateUrl: 'client-apps/css/css-typography.tpl.html'})
        $routeProvider.when('/css-boxmodel', {templateUrl: 'client-apps/css/css-boxmodel.tpl.html'})
        $routeProvider.when('/css-layouts', {templateUrl: 'client-apps/css/css-layouts.tpl.html'})
        $routeProvider.when('/css-responsivewebdesign', {templateUrl: 'client-apps/css/css-responsivewebdesign.tpl.html'})
        $routeProvider.when('/tools-bower-basics', {templateUrl: 'client-apps/tools/tools-bower-basics.tpl.html'})
        $routeProvider.when('/tools-github-basics', {templateUrl: 'client-apps/tools/tools-github-basics.tpl.html'})
        $routeProvider.when('/tools-grunt-basics', {templateUrl: 'client-apps/tools/tools-grunt-basics.tpl.html'})
        $routeProvider.when('/tools-gulp-basics', {templateUrl: 'client-apps/tools/tools-gulp-basics.tpl.html'})
        $routeProvider.when('/tools-npm-basics', {templateUrl: 'client-apps/tools/tools-npm-basics.tpl.html'})
        $routeProvider.when('/tools-yeoman-basics', {templateUrl: 'client-apps/tools/tools-yeoman-basics.tpl.html'})


        .otherwise({redirectTo: '/'});
    });
})();

