// Registering Movie Module

var movie = angular.module('movie',['ngRoute', 'appService','LocalStorageModule']);

// Define Home Controller for Movie

movie.controller('userCtrl', ['$scope','CallApi','user','localStorageService', function($scope, CallApi, user, localStorageService){
  
   $scope.logout = false;
  
  if(localStorageService.get('user')){
    $scope.logout = true;
    $scope.userName = localStorageService.get('user').userName;
  }
    
  // User Sign Up Function
  
  $scope.login = function(){
     CallApi.doApiCall(function(data){
       $('#signIn').toggle();
       $scope.logout = true;
       $scope.userName = data.userName;
       localStorageService.set('user', data);
     }, '/login' ,'POST', $scope.user);
  }
  
  // User Sign Up Function
   $scope.signUp = function(){
     CallApi.doApiCall(function(data){
       $scope.userName = data.userName;
        $scope.logout = true;
        $('#signUp').toggle();
        localStorageService.set(user, data);
     }, '/signup' ,'POST', $scope.user);
  }
   
   // User Sign Out 
   
   $scope.signout = function(){
     localStorageService.remove('user');
     $scope.logout = false;
     window.location.href = "#/movie"
   }

}])

movie.controller('movieCtrl',['$scope','$routeParams','CallApi','localStorageService',function($scope, $routeParams, CallApi,localStorageService){
    
   CallApi.doApiCall(function(data){
     $scope.movieData = data;
     localStorageService.set('movie',data);
   }, '/movies' ,'GET', null);
  
   CallApi.doApiCall(function(data){
     $scope.theatreData = data;
     console.log($scope.theatreData);
   }, '/theatres' ,'GET', null);
  
   $scope.movieId = $routeParams.movieId;
   $scope.theatreId = $routeParams.theatreId;
  
  $scope.filterTheatre = function(data){
    return _.contains($scope.movieData[$scope.movieId -1 ].theatreId, data.theatreId);
  }
  
  
  $scope.bukTicket = function(theatreId, screenId){
    if(localStorageService.get('user')){
       window.location.href = "#/bookticket/"+theatreId+"/"+screenId;
    }else{
      $('#warning').modal();
    }
  }
  
}]);


movie.controller('ticketCtrl', ['$scope', '$routeParams','CallApi','localStorageService', function($scope, $routeParams, CallApi, localStorageService){
    
  var theatreId = $routeParams.theatreId;
  var screen = $routeParams.screenId;
  
  
  CallApi.doApiCall(function(data){
    $scope.theatreData = data;
    $scope.generateTck();
    console.log($scope.theatreData);
   }, '/theatres' ,'GET', null);
  
  
  $scope.generateTck = function(){
    
    $scope.theatre = $scope.theatreData[theatreId];
    $scope.screen = $scope.theatre.Screens[screen];    
    $scope.user = localStorageService.get('user');
    var movie = localStorageService.get('movie');
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
      console.log(month + "/" + day + "/" + year, "Screen Id",$scope.screen.id);
    $scope.ticket = {
      "userName":$scope.user.userName,
      "userEmail":$scope.user.userEmail,
      "movieName":movie[$scope.screen.movieId].movieName,
      "theatreName":$scope.theatre.theatreName,
      "screenName":$scope.screen.screenName,
      'screenId':$scope.screen.id,
      "showDate": day + "/" + month + "/" + year
    };
  }
  
  
 $scope.bookTicket = function(){
      
   if($scope.ticketCount === undefined || $scope.ticketCount <1)
     return;
   
   $scope.ticket.availableSeats = $scope.screen.availableSeats - $scope.ticketCount;
   $scope.ticket.blockedSeats = $scope.screen.blockedSeats + $scope.ticketCount;
   
   // Call Book Ticket API 
   
   CallApi.doApiCall(function(data){
     console.log(data);
     $('#confirmation').modal({
       backdrop:false
     });
   }, '/book' ,'POST', $scope.ticket);
 }
  
}]);








