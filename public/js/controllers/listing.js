angular.module('Hemgage')
  .controller('ListingCtrl', function($scope, Houses, $window, $rootScope) {
    const owner = $rootScope.currentUser._id;
    Houses.getOwnListing(owner)
    .then(function (res) {
      $scope.listings = res.data;
      console.log($scope.listings);
      
    })
    .catch(function (err) {
      console.log(err);
    });
  });
