angular
  .module('mainController', ['AlbumsAPI', 'ArtistsAPI', 'CollectedAPI'])
  .controller('MainController', ['$scope', '$http', 'albumsAPI', 'artistsAPI', 'collectedAPI',
    function( $scope, $http , albumsAPI, artistsAPI, collectedAPI) {
      // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $scope.currentUserID = Cookies.getJSON('current_user')._id;
      $scope.currentUserName = Cookies.getJSON('current_user').username;
      $scope.albums = [];
      $scope.artists = [];
      $scope.collecteds = [];
      $scope.artistName = '';
      $scope.albumName = '';
      $scope.getAllAlbums = function(){
        albumsAPI.getAll().then(function(response){
          console.log(response);
          $scope.albums = response.data;
          console.log($scope.albums);
        })
      };
      $scope.getAllArtists = function(){
        artistsAPI.getAll().then(function(response){
          console.log(response);
          $scope.artists = response.data;
          console.log($scope.artists);
        })
      };
      $scope.getAllCollected = function(){
        collectedAPI.getByUser($scope.currentUserID).then(function(response){
          console.log(response);
          $scope.collecteds = response.data;
          console.log($scope.collecteds);
        })
      };
      $scope.getAllAlbums();
      $scope.getAllArtists();
      $scope.getAllCollected();


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
          $scope.newCollected.collected.userID = $scope.currentUserID;
          $scope.newCollected.collected.username = $scope.currentUserName;
          $scope.newCollected.collected.album_name = $scope.newAlbum.album.album_name;
          $scope.newCollected.collected.album_mbid = $scope.newAlbum.album.mbid;
          $scope.newCollected.collected.artist_name = $scope.newAlbum.album.artist_name;
          console.log($scope.newCollected);
          $scope.saveCollected($scope.newCollected);
        }


      $scope.getAllAlbums = function(){
        albumsAPI.getAll().then(function(response){
          console.log(response);
          $scope.albums = response.data;
          console.log($scope.albums);
        })
      }
      $scope.getAllArtists =function(){
        artistsAPI.getAll().then(function(response){
          console.log(response);
          $scope.artists = response.data;
          console.log($scope.artists);
        })
      }
      $scope.querryArtist = function(artistName, albumName){
        $scope.albumIsCollected = false;
        console.log($scope.collecteds);
        for(var i=0; i<$scope.collecteds.length; i++){
          if($scope.collecteds[i].artist_name.toLowerCase()===artistName.toLowerCase()&&$scope.collecteds[i].album_name.toLowerCase()===albumName.toLowerCase()){
            $scope.albumIsCollected = true;
          };
        };
        if($scope.albumIsCollected){
          alert("Album is already in your collection");
        }
        else{
          $scope.albumAndArtistExist = false;
          $scope.albumExists = false;
          for(var i=0; i<$scope.albums.length; i++){
            if($scope.albums[i].artist_name.toLowerCase()===artistName.toLowerCase()&&$scope.albums[i].album_name.toLowerCase()===albumName.toLowerCase()){
              $scope.artistAndAlbumExists = true;
              var newCollected = $scope.newCollected.collected;
              newCollected.userID = $scope.currentUserID;
              newCollected.username = $scope.currentUserName;
              newCollected.album_name = $scope.albums[i].album_name;
              newCollected.album_mbid = $scope.albums[i].mbid;
              newCollected.artist_name = $scope.albums[i].artist_name;
              newCollected.album_cover_url = $scope.albums[i].album_cover_url;
              newCollected.album_rank = $scope.albums[i].album_rank;
            };
          };
          if($scope.artistAndAlbumExists){
            $scope.saveCollected($scope.newCollected);
          }
          else{
            $scope.artistExists = false;
            for(var i=0; i<$scope.artists.length; i++){
              if($scope.artists[i].artist_name.toLowerCase()===$scope.artistName.toLowerCase()){
                $scope.artistExists = true;
                var albumsRankedArray = $scope.artists[i].albums_ranked;
                for(var i=0; i<albumsRankedArray.length; i++){
                  if(albumsRankedArray[i].toLowerCase()===$scope.albumName.toLowerCase()){
                    $scope.newAlbum.album.album_rank = i+1;
                  };
                };
              };
            };
            $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist='+artistName+'&album='+albumName+'&format=json').then(function (response){
              var newAlbum = $scope.newAlbum.album;
              var albumInfo = response.data.album;
              if(albumInfo === undefined){
                alert("That album Can't be found");
              }
              else{
                newAlbum.album_name = albumInfo.name;
                newAlbum.mbid = albumInfo.mbid;
                newAlbum.artist_name = albumInfo.artist;
                newAlbum.album_cover_url = albumInfo.image[3]["#text"];
                var newCollected = $scope.newCollected.collected;
                newCollected.userID = $scope.currentUserID;
                newCollected.username = $scope.currentUserName;
                newCollected.album_name = newAlbum.album_name;
                newCollected.album_mbid = newAlbum.mbid;
                newCollected.artist_name = newAlbum.artist_name;
                newCollected.album_cover_url = newAlbum.album_cover_url;
                if($scope.artistExists){
                  newCollected.album_rank = newAlbum.album_rank;
                  $scope.saveAlbum($scope.newAlbum);
                  $scope.saveCollected($scope.newCollected);
                }
                else {
                  $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName+'&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
                    //console.log(response.data);
                    var artistData = response.data.artist;
                    if(artistData === undefined){
                      alert("That artist Can't be found");
                    }
                    //console.log(artistData.mbid);
                    else{
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
                    };
                  })
                };
              }
            });
          }
        }
      }

      $scope.querryTopAlbums = function(artistName){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+artistName+'&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json').then(function(response){
          //console.log(response.data);
          var albumName = $scope.albumName;
          var newArtist = $scope.newArtist.artist;
          var artistBestData = response.data.topalbums
          if(artistBestData === undefined){
            $scope.saveArtist($scope.newArtist);
            $scope.querryAlbum(artistName, albumName);
          }
          else{
            var bestAlbumsArray = artistBestData.album;
            for(var i=0; i<bestAlbumsArray.length; i++){
              var album = bestAlbumsArray[i].name;
              newArtist.albums_ranked.push(album);
            };
            //console.log(artistBestData);
            newArtist.number_of_albums = bestAlbumsArray.length;
            $scope.saveArtist($scope.newArtist);
            $scope.querryAlbum(artistName, albumName);
          };
          //$scope.querryAlbum($scope.artistName, $scope.albumName);
        })
      }
      $scope.querryAlbum = function(artistName, albumName){
        $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist='+artistName+'&album='+albumName+'&format=json').then(function(response){
          //console.log(response.data);
          var newAlbum = $scope.newAlbum.album;
          var albumInfo = response.data.album;
          if(albumInfo === undefined){
            alert("We Can't Seem to find that album");
          }
          else{
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
            var newCollected = $scope.newCollected.collected;
            newCollected.userID = $scope.currentUserID;
            newCollected.username = $scope.currentUserName;
            newCollected.album_name = newAlbum.album_name;
            newCollected.album_mbid = newAlbum.mbid;
            newCollected.artist_name = newAlbum.artist_name;
            newCollected.album_cover_url = newAlbum.album_cover_url;
            newCollected.album_rank = newAlbum.album_rank;
            $scope.saveAlbum($scope.newAlbum);
            $scope.saveCollected($scope.newCollected);
          };
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

      $scope.callAPIs = function(){
        $scope.getAllAlbums();
        $scope.getAllArtists();
        $scope.getAllCollected();
      }
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
        $scope.querryArtist($scope.artistName.replace(' ', '+'), $scope.albumName.replace(' ', '+'));
        //$scope.saveCollectedNewNew();
        //console.log($scope.newArtist);

        //console.log($scope.newAlbum.album);
        //$scope.saveAlbum($scope.newAlbum);

        //console.log($scope.newArtist);
        //console.log($scope.newAlbum);
    }


  }
]);
