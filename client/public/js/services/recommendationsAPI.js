angular
  .module('RecommendationsAPI', [])
  .factory('recommendationsAPI', ['$http',
    function($http) {
      return {

        getAll: function() {
          console.log('hello');
          return $http.get('/api/recommendations');
        },

        getByUser: function(userID) {
          console.log('getting by user');
          return $http.get('/api/recommendations/'+userID);
        },

        save: function(newRecommendations) {
          console.log("saving: ")
          console.log(newRecommendations);
          return $http.post('/api/recommendations/', newRecommendations );
        },

        remove: function(id) {
          return $http.delete('/api/recommendations/'+id);
        }
      }
    }])
