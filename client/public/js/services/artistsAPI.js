angular
  .module('ArtistsAPI', [])
  .factory('artistsAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          return $http.get('/artists');
        },

        save: function(newFave) {
          return $http.post('/artists', newFave);
        },

        remove: function(id) {
          return $http.delete('/artists/'+id);
        }
      }
    }])
