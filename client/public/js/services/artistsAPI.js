angular
  .module('ArtistsAPI', [])
  .factory('artistsAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('getting all artists');
          return $http.get('/api/artists');
        },

        save: function(newArtist) {
          console.log("saving: ")
          console.log(newArtist);
          return $http.post('/api/artists/', newArtist );
        },

        remove: function(id) {
          return $http.delete('/api/artists/'+id);
        }
      }
    }])
