angular.module('Hemgage')
  .controller('DirectoryCtrl', function($scope, Houses, $routeParams) {
    $scope.searched = $routeParams.search.split(",")[0];
    Houses.searchDirectory($routeParams.search)
    .then(function (search) {
      $scope.search = search.data;
      console.log($scope.search);
    });
  });
