angular.module('Hemgage')
    .controller('HouseListingCtrl', function ($scope, $rootScope, $location, $routeParams, $auth, Houses) {
        Houses.getOwnHouse($routeParams.slug)
        .then(function (house) {
            var currIndex = 0;
            console.log(house.data);
            $scope.listing = house.data.listing;
            $scope.slides = [
                {image: 'https://placehold.it/500', id: 1}
            ];
            
        })
        .catch(function(err) {
            console.log(err); 
        });
        
    });