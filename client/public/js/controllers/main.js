angular
  .module('mainController', ['AlbumsAPI', 'ArtistsAPI', 'CollectedAPI'])
  .controller('MainController', ['$scope', '$http', 'albumsAPI', 'artistsAPI', 'collectedAPI',
    function( $scope, $http , albumsAPI, artistsAPI, collectedAPI) {
      // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      $scope.albums = [];
      $scope.artists = [];
      $scope.collecteds = [];
      $scope.artistName = '';
      $scope.albumName = '';
      $scope.checkValues = function(){
        console.log($scope.artistName);
        console.log($scope.albumName);
      }
      console.log(Cookies.getJSON('current_user')._id);
      albumsAPI.getAll().then(function(response){
        console.log(response);
        $scope.albums = response.data;
        console.log($scope.albums);
      })
      collectedAPI.getByUser(Cookies.getJSON('current_user')._id).then(function(response){
        console.log(response);
        $scope.collecteds = response.data;
        console.log($scope.collecteds);
      })

      $scope.saveAlbum = function(newAlbum){
        console.log("newAlbum: ");
        console.log(newAlbum);
        albumsAPI.save(newAlbum).then(function(response) {
          console.log(response);
          $scope.albums.push(response.data);
         })
       }
       $scope.saveArtist = function(newArtist){
         console.log("newArtist: ");
         console.log(newArtist);
         artistsAPI.save(newArtist).then(function(response) {
           console.log(response);
           $scope.artists.push(response.data);
          })
        }
        $scope.saveCollected = function(newCollected){
          console.log("newCollected: ");
          console.log(newCollected);
          collectedAPI.save(newCollected).then(function(response) {
            console.log(response);
            $scope.collecteds.push(response.data);
           })
         }
        $scope.saveCollectedNewNew = function(){
          $scope.newCollected.collected.userID = Cookies.getJSON('current_user')._id;
          $scope.newCollected.collected.username = Cookies.getJSON('current_user').username;
          $scope.newCollected.collected.album_name = $scope.newAlbum.album.album_name;
          $scope.newCollected.collected.album_mbid = $scope.newAlbum.album.mbid;
          $scope.newCollected.collected.artist_name = $scope.newAlbum.album.artist_name;
          console.log($scope.newCollected);
          $scope.saveCollected($scope.newCollected);
        }


      $scope.getAllAlbums =function(){
        albumsAPI.getAll().then(function(response){
          console.log(response);
          $scope.albums = response.data;
        })
      }

      $scope.querryArtist = function(artistName){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName+'&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
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
          $scope.querryTopAlbums($scope.artistName);
        })
      }
      $scope.querryTopAlbums = function(artistName){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+artistName+'&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
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
          $scope.querryAlbum($scope.artistName, $scope.albumName);
        })
      }
      $scope.querryAlbum = function(artistName, albumName){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist='+artistName+'&album='+albumName+'&format=json').then(function(response){
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
          $scope.saveArtist($scope.newArtist);
          $scope.saveCollectedNewNew();
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
        $scope.newCollected = {
          collected: {

          }
        }
        $scope.querryArtist($scope.artistName);
        //$scope.saveCollectedNewNew();
        console.log($scope.newArtist);

        //console.log($scope.newAlbum.album);
        //$scope.saveAlbum($scope.newAlbum);
        //$scope.getAllAlbums();
        //console.log($scope.newArtist);
        //console.log($scope.newAlbum);
    }
  }
]);
