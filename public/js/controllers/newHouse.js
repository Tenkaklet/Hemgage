angular.module('Hemgage')
    .controller('NewHouseCtrl', function ($scope, $rootScope, $location, $window, $auth, Houses, Upload) {
        
        $scope.newHouse = function (house) {
            
            Houses.create(house)
                .then(function (house) {
                    // $location.path('/house/' + house.data.slug);
                    console.log(house);
                    angular.forEach(house.images, function (file) {
                        file.upload = Upload.upload({
                            url: '/api/houses',
                            data: {file: file}
                        });
                    });
                })
                .catch(function (response) {
                    if (response.status === 400) {
                        $scope.messages = {
                            error: Array.isArray(response.data) ? response.data : [response.data]
                        };
                    }
                });
        };

        $scope.numrooms = [1,2,3,4,5,6,7,8,9,9,10];
        $scope.boarea = ['25-50m', '50-100m', '+100m'];

        var beginYear = new Date(1800,01).getFullYear();
        var range = [];
        range.push(beginYear);
        for (let i = 0; i < 221; i++) {
            range.push(beginYear + i);
        }

        $scope.years = range;
        $scope.floors = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5'];
        
        
    });