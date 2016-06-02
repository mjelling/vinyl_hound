angular
  .module('mainController', ['AlbumsAPI'])
  .controller('MainController', ['$scope', '$http', 'albumsAPI',
    function( $scope, $http , albumsAPI) {
      // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      $scope.saveAlbum = function(newAlbum){
        console.log("newAlbum: ");
        console.log(newAlbum);
        albumsAPI.save(newAlbum).then(function(response) {
          console.log(response);
          $scope.albums.push(response.data);
         })
       }

      $scope.getAllAlbums =function(){
        albumsAPI.getAll().then(function(response){
          console.log(response);
          $scope.albums = response.data;
        })
      }

      $scope.querryArtist = function(){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
          //console.log(response.data);
          var artistData = response.data.artist;
          //console.log(artistData.mbid);
          var newArtist = $scope.newArtist.artist;
          newArtist.artist_name = artistData.name;
          newArtist.mbid = artistData.mbid;
          var dataSimilarArray = artistData.similar.artist;
          for(var i=0; i<dataSimilarArray.length; i++){
            var similarArtist = dataSimilarArray[i].name;
            newArtist.connected_artists.push(similarArtist);
          };
          newArtist.artist_image_url = artistData.image[3]["#text"];
          $scope.querryTopAlbums();
        })
      }
      $scope.querryTopAlbums = function(){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Cher&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
          //console.log(response.data);
          var newArtist = $scope.newArtist.artist;
          var artistBestData = response.data;
          var bestAlbumsArray = artistBestData.topalbums.album;
          for(var i=0; i<bestAlbumsArray.length; i++){
            var album = bestAlbumsArray[i].name;
            newArtist.albums_ranked.push(album);
          };
          //console.log(artistBestData);
          newArtist.number_of_albums = bestAlbumsArray.length;
          $scope.querryAlbum();
        })
      }
      $scope.querryAlbum = function(){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist=Cher&album=Believe&format=json').then(function(response){
          //console.log(response.data);
          var newAlbum = $scope.newAlbum.album;
          var albumInfo = response.data.album;
          newAlbum.album_name = albumInfo.name;
          newAlbum.mbid = albumInfo.mbid;
          newAlbum.artist_name = albumInfo.artist;
          newAlbum.album_cover_url = albumInfo.image[3]["#text"];
          console.log(newAlbum.album_name);
          var albumsRankedArray = $scope.newArtist.artist.albums_ranked;
          console.log(albumsRankedArray);
          for(var i=0; i<albumsRankedArray.length; i++){
            if(albumsRankedArray[i]==newAlbum.album_name){
              newAlbum.album_rank = i+1;
            };
          };
          $scope.saveAlbum($scope.newAlbum);
          // if(!newAlbum.hasOwnProperty('album_rank')){
          //   newAlbum.album_rank = null;
          // }
        });
      }
      // $scope.oneNewAlbum = function(){
      //
      //   var onenew = {
      //     album_name: 'Test',
      //     mbid:'ajajajaja',
      //     artist_name: 'Text',
      //     album_rank: 100,
      //     album_cover_url: 'ahahahahha'
      //   }

      //   $http.post('/api/albums', onenew ).then(function(response){
      //     console.log( response.data );
      //   })
      // }
      //Get all the posts from reddit and render them!

      $scope.postData = function(){
        $scope.newArtist = {
          artist : {
            connected_artists: [],
            albums_ranked: []
          }
        };
        $scope.newAlbum = {
          album: {
          }
        };
        $scope.querryArtist();

        console.log($scope.newArtist);
        console.log($scope.newAlbum);
        //$scope.saveAlbum($scope.newAlbum);
        //$scope.getAllAlbums();
        //console.log($scope.newArtist);
        //console.log($scope.newAlbum);
    }
  }
]);
