angular
  .module('BouncebacksAPI', [])
  .factory('bouncebacksAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('hello');
          return $http.get('/api/bouncebacks');
        },

        getByUser: function(userID) {
          console.log('getting by user');
          return $http.get('/api/bouncebacks/'+userID);
        },

        save: function(newBounceback) {
          console.log("saving: ")
          console.log(newBounceback);
          return $http.post('/api/bouncebacks/', newBounceback );
        },

        remove: function(id) {
          return $http.delete('/api/bouncebacks/'+id);
        }
      }
    }])
