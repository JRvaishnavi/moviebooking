// Config Routing

movie.config(function($routeProvider){
  $routeProvider
  
  .when('/movie',{
    templateUrl:'templates/movie.html',
    controller:'movieCtrl'
  }).
  
  when('/movie/:movieId', {
    templateUrl: 'templates/movie-ticket.html',
    controller: 'movieCtrl'
  }).
  
  when('/bookticket/:theatreId/:screenId', {
    templateUrl: 'templates/bookTicket.html',
    controller: 'ticketCtrl'
  }).
  
  otherwise({
        redirectTo: '/movie'
   });
  
})