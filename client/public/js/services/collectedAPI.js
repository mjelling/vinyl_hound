angular
  .module('CollectedAPI', [])
  .factory('collectedAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('hello');
          return $http.get('/api/collected');
        },

        getByUser: function(username) {
          console.log('getting by user');
          return $http.get('/api/collected/'+username);
        },

        save: function(newCollected) {
          console.log("saving: ")
          console.log(newCollected);
          return $http.post('/api/collected/', newCollected );
        },

        remove: function(id) {
          return $http.delete('/api/collected/'+id);
        }
      }
    }])
