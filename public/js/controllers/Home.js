angular.module('Hemgage')
    .controller('HomeCtrl', function ($scope, $rootScope, $location, $window, $auth, Houses, General) {
        $scope.searchTerm = null;
        $scope.getLocation = function () {
            navigator.geolocation.getCurrentPosition(pos => {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                General.getLocation(latitude, longitude)
                .then(function (location) {
                    console.log(location.data);
                    $scope.searchTerm = location.data.results[0].address_components[2].long_name + ',' + location.data.results[0].address_components[4].long_name;
                });
            });
        };

        $scope.search = function () {
            $location.path('/directory/' + $scope.searchTerm);
        };
});