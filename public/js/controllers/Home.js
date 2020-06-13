angular.module('Hemgage')
    .controller('HomeCtrl', function ($scope, $rootScope, $location, $window, $auth, Houses) {
        
        $scope.getLocation = function () {
            navigator.geolocation.getCurrentPosition(pos => {
                
            });
        };

        $scope.search = function () {
            $location.path('/directory/' + $scope.searchTerm);
        };
});