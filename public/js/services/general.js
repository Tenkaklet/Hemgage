angular.module('Hemgage')
  .factory('General', function($http) {
    return {
      getLocation: function(latitude, longitude) {
        return $http.get('/lookup/' + latitude + '/' + longitude);
      }
    };
  });