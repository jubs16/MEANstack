/*var app = angular.module('App', []);
app.controller('profileCtrl', function($scope) {
  $scope.name = "";
  $scope.company = "";
  $scope.position = "";
});
*/
var app = angular.module('App', [])
  app.controller('profileCtrl', function($scope, fileReader) {
    //text boxes
    $scope.name = "";
    $scope.company = "";
    $scope.position = "";
    //image upload
    $scope.imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYWUN7sO8nuK9Bgef8xxJH7jd7fitgRYKg0FHlIFJ7lwm5NXQN";  
    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });
  });
  //file select
  app.directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  });

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});