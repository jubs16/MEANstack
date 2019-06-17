var app = angular.module('App', []);
app.controller("emailController", ['$scope', '$http', function ($scope, $http) {


    $scope.formData = {

        subject: '',
        email: '',
        message: ''
    };
    console.log(formData);
    // process the form
    $scope.processForm = function () {
        $http({
            method: 'POST',
            url: '/email',
            data: $scope.formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })


    };


} ]);