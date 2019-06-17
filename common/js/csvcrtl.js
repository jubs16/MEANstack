var app = angular.module('App', []);
app.controller('csvCtrl', function($scope, $http) {
/*
//dummy data for testing
person1 ={
   id:'1',
   first_name: 'tim',
   last_name: 'cook',
   email: 'abc@.com',
   gender: 'male',
   ip_iddress: '23.13.139.12'
 };
 person2 ={
  id:'1',
  first_name: 'nicki',
  last_name: 'minaj',
  email: 'mminaj@.com',
  gender: 'female',
  ip_iddress: '21.22.42.53.21'
}
 var contactlist =[person1, person2];
 $scope.contactlist = contactlist;*/
 //get data from http routes 
   $http.get('/csv')
  .then(function(response) {

    $scope.contactlist = response.data;
    console.log(response);
  });
});