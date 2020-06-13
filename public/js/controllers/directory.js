angular.module('Hemgage')
  .controller('DirectoryCtrl', function($scope, Houses, $routeParams) {
    console.log($routeParams);
    Houses.searchDirectory($routeParams.search)
    .then(function (search) {
      console.log(search);
    });
  });
