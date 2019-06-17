
  var app = angular.module('App', []);
  app.controller('pyCtrl', function($scope, $http) {
    $http.get('/pyscript')
    .then(function(response) {
      $scope.name1 = response.data;
      console.log(response);
    });
  });