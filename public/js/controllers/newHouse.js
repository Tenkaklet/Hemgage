angular.module('Hemgage')
    .controller('NewHouseCtrl', function ($scope, $rootScope, $location, $window, $auth, Houses, Upload) {
        
        $scope.newHouse = function (house) {
            Houses.create(house)
                .then(function (house) {
                    $location.path('/house/' + house.data.slug);
                })
                .catch(function (response) {
                    if (response.status === 400) {
                        $scope.messages = {
                            error: Array.isArray(response.data) ? response.data : [response.data]
                        };
                    }
                });
        };
    });