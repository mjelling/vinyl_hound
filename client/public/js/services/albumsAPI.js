angular
  .module('AlbumsAPI', [])
  .factory('albumsAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('getting all albums');
          return $http.get('/api/albums');
        },

        getByArtist: function(artist_name) {
          console.log('getting by artist name');
          return $http.get('/api/collected/'+artist_name);
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
