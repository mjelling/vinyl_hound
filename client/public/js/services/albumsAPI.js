angular
  .module('AlbumsAPI', [])
  .factory('albumsAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('hello');
          return $http.get('/api/albums');
        },

        save: function(newAlbum) {
          console.log("saving: ")
          console.log(newAlbum);
          return $http.post('/api/albums/', newAlbum );
        },

        remove: function(id) {
          return $http.delete('/api/albums/'+id);
        }
      }
    }])
