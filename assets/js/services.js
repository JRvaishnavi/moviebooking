var AppService = angular.module('appService', ['ngResource']);

AppService.factory('CallApi', function($http){
  var http = $http;
  var baseUrl = "http://vaishnavi-189219.apne1.nitrousbox.com";
  return {
    doApiCall:function(callback, url, method, input){
      var apiUrl = baseUrl + url ; 
      var apiMethod = method;
      var apiData = input ? input :'';
      var req = {
        method:apiMethod,
        url:apiUrl,
        data:apiData
      }
      
      // Call RestApi using $http
      
      $http(req).success(function(data){
        console.log("Api successfully called");
        callback(data);
      }).error(function(data){
        console.log("error");
        //$http({method:method, url:'data'+url});
      });      
    }
  }
});

// AppService.factory('Entry', function($resource) {
//   return $resource('/user/:id'); // Note the full endpoint address
// });

