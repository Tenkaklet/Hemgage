angular.module('Hemgage')
  .factory('Houses', function($http) {
    return {
      get: function () {
         return $http.get('/api/houses'); 
      },
      create: function (house) {
          return $http.post('/api/houses', house);
      },
      getOwnHouse: function (owner) {
        return $http.get('/api/houses/' + owner);
      },
      getOwnListing: function (owner) {
        return $http.get('/api/houses/listing/' + owner)
      },
      searchDirectory: function (searchTerm) {
        return $http.get('/api/houses/directory/' + searchTerm);
      }
    };
  });