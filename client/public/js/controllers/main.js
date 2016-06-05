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

      $scope.artistName;
      $scope.albumName;
      $scope.artistNamePrepped;
      $scope.albumNamePrepped;

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

      $scope.collectedSaving = true;
      $scope.amPostingAlbumRecsToDB = false;

      $scope.artistNamePrep = function(name){
        $scope.artistNamePrepped = name;
        if(name.substring(0,3).toLowerCase()==='the'){
          console.log('it is');
          $scope.artistNamePrepped = $scope.artistNamePrepped.slice(4, $scope.artistNamePrepped.length + 1 );
        };
        $scope.artistNamePrepped = $scope.artistNamePrepped.toLowerCase().replace(' ', '+');
        console.log('woow');
      }
      $scope.albumNamePrep = function(album){
        $scope.albumNamePrepped = album;
        if(album.substring(0,3).toLowerCase()==='the'){
          console.log('it is');
          $scope.albumNamePrepped = $scope.albumNamePrepped.slice(4, $scope.albumNamePrepped.length + 1 );
        };
        $scope.albumNamePrepped = $scope.albumNamePrepped.toLowerCase().replace(' ', '+');
        console.log('woow');
      }

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

      $scope.callAPIs = function(){
        $scope.getAllAlbums();
        $scope.getAllArtists();
        $scope.getAllCollected();
      }
      $scope.callAPIs();


      $scope.saveAlbum = function(newAlbum){
        console.log("newAlbum: ");
        console.log(newAlbum);
        albumsAPI.save(newAlbum).then(function(response) {
          console.log(response);
          $scope.albums.push(response.data);
          $scope.getAllAlbums();
         })
       }
       $scope.saveArtist = function(newArtist){
         console.log("newArtist: ");
         console.log(newArtist);
         artistsAPI.save(newArtist).then(function(response) {
           console.log(response);
           $scope.artists.push(response.data);
           $scope.getAllArtists();
          })
        }
        $scope.saveCollected = function(newCollected){
          console.log("newCollected: ");
          console.log(newCollected);
          collectedAPI.save(newCollected).then(function(response) {
            console.log(response);
            $scope.collecteds.push(response.data);
            $scope.getAllCollected();
           })
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

      //album processing functions

      //checks if album has been collected
      $scope.alertIfAllbumIsCollected = function(artistName, albumName){
        console.log("alertIfAllbumIsCollected");
        for(var i=0; i<$scope.collecteds.length; i++){
          if($scope.collecteds[i].artist_name.toLowerCase().replace('the ', '')===artistName.toLowerCase().replace('+', ' ')&&$scope.collecteds[i].album_name.toLowerCase().replace('the ', '')===albumName.toLowerCase().replace('+', ' ')){
            $scope.albumIsCollected = true;
          };
        };
        if($scope.albumIsCollected){
          alert("Album is already in your collection");
        };
      };
      //if album exists posts to collected
      $scope.postNewCollectedIfAlbumExists = function(artistName, albumName){
        console.log('postNewCollectedIfAlbumExists');
        for(var i=0; i<$scope.albums.length; i++){
          if($scope.albums[i].artist_name.toLowerCase().replace('the ', '')===artistName.toLowerCase().replace('+', ' ')&&$scope.albums[i].album_name.toLowerCase().replace('the ', '')===albumName.toLowerCase().replace('+', ' ')){
            $scope.artistAndAlbumExists = true;
            var newCollected = $scope.newCollected.collected;
            newCollected.userID = $scope.currentUserID;
            newCollected.username = $scope.currentUserName;
            newCollected.album_name = $scope.albums[i].album_name;
            newCollected.album_mbid = $scope.albums[i].mbid;
            newCollected.artist_name = $scope.albums[i].artist_name;
            newCollected.album_cover_url = $scope.albums[i].album_cover_url;
            console.log(newCollected.album_cover_url);
            newCollected.album_rank = $scope.albums[i].album_rank;
            console.log()
          };
        };
        if($scope.artistAndAlbumExists){
          $scope.saveCollected($scope.newCollected);
        }
      };
      //sets artists exists boleen, sets newAlbum ranking value if it does
      $scope.pullFromArtistIfKnown = function(artistName){
        console.log('pullFromArtistIfKnown');
        for(var i=0; i<$scope.artists.length; i++){
          if($scope.artists[i].artist_name.toLowerCase().replace('the ', '')===artistName.toLowerCase().replace('+', ' ')){
            $scope.artistExists = true;
            var albumsRankedArray = $scope.artists[i].albums_ranked;
            for(var i=0; i<albumsRankedArray.length; i++){
              if(albumsRankedArray[i].toLowerCase().replace('the ', '')===$scope.albumName.toLowerCase().replace('+', ' ')){
                $scope.newAlbum.album.album_rank = i+1;
                console.log($scope.newAlbum.album.album_rank);
              };
            };
          };
        };
      }
      //querrys Lastfm for album info,
      //if $scope.artistsExists = true, calls $scope.completeAndPostAlbumandCollectedIfArtistExists function
      //if $scope.artistsExists = false, calls $scope.querryAndPostAlbumCollectedB
      //if $scope.collectedSaving = false, cancels collected Posting
      //if $scope.amPostingAlbumRecsToDB = true....album_rank will be set from recData
      $scope.querryAndPostAlbumCollected = function(artistName, albumName){
        console.log('querryAndPostAlbumCollected');
        $http.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist="+artistName+"&album="+albumName+"&format=json").then(function (response){
          var newAlbum = $scope.newAlbum.album;
          var albumInfo = response.data.album;
          if(albumInfo === undefined){
            if($scope.collectedSaving){
              alert("That album Can't be found");
            }
            else{
              console.log("no album found");
            };
          }
          else {
            newAlbum.album_name = albumInfo.name;
            newAlbum.mbid = albumInfo.mbid;
            newAlbum.artist_name = albumInfo.artist;
            newAlbum.album_cover_url = albumInfo.image[3]["#text"];
            if($scope.amPostingAlbumRecsToDB){
              newAlbum.album_rank = $scope.recRank;
            }
            if($scope.collectedSaving){
              var newCollected = $scope.newCollected.collected;
              newCollected.userID = $scope.currentUserID;
              newCollected.username = $scope.currentUserName;
              newCollected.album_name = newAlbum.album_name;
              newCollected.album_mbid = newAlbum.mbid;
              newCollected.artist_name = newAlbum.artist_name;
              newCollected.album_cover_url = newAlbum.album_cover_url;
            };
            if($scope.artistExists){
              $scope.amPostingAlbumRecsToDB = false;
              $scope.completeAndPostAlbumandCollectedIfArtistExists(artistName, albumName)
            }
            else{
              $scope.amPostingAlbumRecsToDB = false;
              $scope.querryAndPostAlbumCollectedB(artistName, albumName)
            };
          }
        });
      }
      //sets newCollected ranking and posts album and collected to db
      $scope.completeAndPostAlbumandCollectedIfArtistExists = function(){
        console.log('completeAndPostAlbumandCollectedIfArtistExists');
        if($scope.collectedSaving){
          var newCollected = $scope.newCollected.collected;
          newCollected.album_rank = $scope.newAlbum.album.album_rank;
          $scope.saveCollected($scope.newCollected);
        };
        $scope.saveAlbum($scope.newAlbum);
      };
      //querry artist's best albums and sets applicable album, artist and collected data
      //posts data to artists, albums, and collected
      $scope.getBestOfInfoAndPostToAPIs = function(artistName, albumName){
        console.log('getBestOfInfoAndPostToAPIs');
        $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+artistName+"&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json").then(function(response){
          //console.log(response.data);
          var newArtist = $scope.newArtist.artist;
          var newAlbum = $scope.newAlbum.album;
          if($scope.collectedSaving){
            var newCollected = $scope.newCollected.collected;
          };
          var artistBestData = response.data.topalbums
          if(artistBestData === undefined){
            $scope.saveArtist($scope.newArtist);
          }
          else{
            var bestAlbumsArray = artistBestData.album;
            for(var i=0; i<bestAlbumsArray.length; i++){
              var album = bestAlbumsArray[i].name;
              newArtist.albums_ranked.push(album);
            };
            //console.log(artistBestData);
            newArtist.number_of_albums = bestAlbumsArray.length;
            var albumsRankedArray = newArtist.albums_ranked;
            for(var i=0; i<albumsRankedArray.length; i++){
              if(albumsRankedArray[i].toLowerCase()==newAlbum.album_name.toLowerCase()){
                newAlbum.album_rank = i+1;
                if($scope.collectedSaving){
                  newCollected.album_rank = i+1;
                };
                //console.log(newCollected.album_rank);
              };
            };
            // if(newAlbum.album_rank === undefined){
            //   var dataAlbumLettersArray;
            //   var albumNameLettersArray = albumName.split('');
            //   for(var i=0; i<artistBestData.album.length; i++){
            //     var dataAlbumLettersArray = artistBestData.album[i]split('');
            //   };
            //   for(var x=0; x<dataAlbumLettersArray.length; x++){
            //     for(var y=0; <albumNameLettersArray.length; y++){
            //       if(albumNameLettersArray[i])
            //     }
            //   }
            // }
            $scope.saveArtist($scope.newArtist);
            $scope.saveAlbum($scope.newAlbum);
            if($scope.collectedSaving){
              $scope.saveCollected($scope.newCollected);
            };
          };
          //$scope.querryAlbum($scope.artistName, $scope.albumName);
        })
      }
      //gets newArtist info from lastfm, populates newArtist data
      //calls $scope.getBestOfInfoAndPostToAPIs function
      $scope.getArtistInfo = function(artistName, albumName){
        console.log('getArtistInfo');
        $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistName+"&api_key=b1d845b005a877d1c8ec8023eee403c8&format=json").then(function(response){
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
            $scope.getBestOfInfoAndPostToAPIs(artistName, albumName);
          };
        })
      }
      //calls $scope.getArtistInfo and recursively $scope.getBestOfInfoAndPostToAPIs data
      $scope.querryAndPostAlbumCollectedB = function (artistName, albumName){
        console.log('querryAndPostAlbumCollectedB');
        $scope.getArtistInfo(artistName, albumName);
      };



      $scope.querryArtist = function(artistName, albumName){
        //set necessarry conditionals
        $scope.albumIsCollected = false;
        $scope.albumAndArtistExist = false;
        $scope.artistExists = false;



        //calls functions to process an artist and album info
        console.log(artistName);
        console.log(albumName);
        $scope.alertIfAllbumIsCollected(artistName, albumName);
        if(!$scope.albumIsCollected){
          $scope.postNewCollectedIfAlbumExists(artistName, albumName);
          if(!$scope.artistAndAlbumExists){
            $scope.pullFromArtistIfKnown(artistName);
            $scope.querryAndPostAlbumCollected(artistName, albumName);
          };
        };
      }
      $scope.buildArtistRecommendations = function(){
        console.log("horse");
        $scope.recommendationData = [ { artist: $scope.collecteds[0].artist_name,
                                        numberOfCollected: 0,
                                        collectedRankings: []
                                      }
        ];
        // function artistRecommendation(numberOfCollected, collectedRankings){
        //   this.numberOfAlbums = numberOfCollected;
        //   this.collectedRankings = collectedRankings;
        // };
        $scope.buildRecommendationData = function(){
          console.log($scope.collecteds[0].artist_name);
          for(var i=0; i<$scope.collecteds.length; i++){
            $scope.pointsFunction = function(){
              if(artistRecData.numberOfCollected<=6){
                return artistRecData.numberOfCollected;
              }
              else if(artistRecData.numberOfCollected===7){
                return 5;
              }
              else if(artistRecData.numberOfCollected===8){
                return 4;
              }
              else{
                return 3;
              };
            }
            $scope.artistInRecommendation = false;
            for(var x=0; x<$scope.recommendationData.length; x++){
              if($scope.collecteds[i].artist_name === $scope.recommendationData[x].artist){
                var artistRecData = $scope.recommendationData[x];
                $scope.artistInRecommendation = true;
                artistRecData.numberOfCollected+=1;
                artistRecData.collectedRankings.push($scope.collecteds[i].album_rank);
                artistRecData.collectedRankings = artistRecData.collectedRankings.sort(function(a, b){return a-b});
                artistRecData.artistPoints= $scope.pointsFunction();
              };
            };
            if(!$scope.artistInRecommendation){
              var artistRecData = { artist: $scope.collecteds[i].artist_name,
                                  numberOfCollected: 1,
                                  collectedRankings: [$scope.collecteds[i].album_rank],
                                  artistPoints: $scope.pointsFunction()
                                  };
              artistRecData.collectedRankings = artistRecData.collectedRankings.sort(function(a, b){return a-b});
              $scope.recommendationData.push(artistRecData);
            };
          };
          $scope.recommendationData.sort(function(a, b){
            return b.numberOfCollected-a.numberOfCollected
          });
        };
        $scope.buildRecommendationData();
        console.log($scope.recommendationData);
        $scope.buildAlbumRecommendationArray = function(){
          $scope.albumRecommendationArray = [];
          console.log($scope.recommendationData);
          for(var i=0; i<$scope.recommendationData.length; i++){
            var numToRecommend = $scope.recommendationData[i].artistPoints;
            var startFrom = 1;
            var albumsPushed = 0;
            console.log($scope.artistReciData);
            console.log(numToRecommend);
            console.log()
            for(var x=0; x<$scope.artists.length; x++){
              if($scope.recommendationData[i].artist===$scope.artists[x].artist_name){
                topAlbumInfo = $scope.artists[x].albums_ranked;
                console.log(topAlbumInfo);
              };
            };
            for(var y=0; y<$scope.recommendationData[i].collectedRankings.length; y++){
              if(albumsPushed===numToRecommend){
                ('fail');
                break;
              }
              else if($scope.recommendationData[i].collectedRankings[y]===startFrom){
                startFrom += 1;
              }
              else{
                var albumToPush = startFrom;
                while(albumToPush !== $scope.recommendationData[i].collectedRankings[y]){
                  $scope.albumRecommendationArray.push( { artist: $scope.recommendationData[i].artist, album: topAlbumInfo[albumToPush+1], albumExists: false, rank: startFrom + 2 });
                  console.log('beeb');
                  startFrom += 1;
                  albumToPush += 1;
                  //console.log('beep');
                  albumsPushed +=1;
                  console.log(albumsPushed);
                  console.log(numToRecommend);
                  if(albumsPushed===numToRecommend){
                    break;
                  };
                };
                startFrom += 1;
              }
            }
          };
          console.log($scope.albumRecommendationArray);
          for(var i=0; i<$scope.albumRecommendationArray.length; i++){
            console.log($scope.albumRecommendationArray.album);
            console.log($scope.albumRecommendationArray.artist);
            var thisAlbum = $scope.albumRecommendationArray[i];
            for(var x=0; x<$scope.albums.length; x++){
              if($scope.albums[x].artist_name===thisAlbum.artist&&$scope.albums[x].album_name===thisAlbum.album){
                $scope.albumRecommendationArray[i].albumExists=true;
              };
            };
            // for(var y=0; y<$scope.collecteds.length; y++){
            //   if($scope.collecteds[y].artist_name===thisAlbum[i].artist&&$scope.collecteds[y].album_name===thisAlbum[i].album){
            //     $scope.albumRecommendationArray.splice(i,i);
            //   };
            // };
          };
          console.log($scope.albumRecommendationArray);
          console.log($scope.recommendationData);
          $scope.postingAlbumRecsToDB = function(array){
            for(var i=0; i<array.length; i++){
              if(array[i].albumExists===false){
                $scope.recRank = array[i].rank;
                $scope.amPostingAlbumRecsToDB = true;
                $scope.collectedSaving = false;
                $scope.artistExists = true;
                $scope.artistNamePrep(array[i].artist);
                $scope.querryAndPostAlbumCollected($scope.artistNamePrepped, array[i].album.toLowerCase().replace(' ', '+'));
              };
            };
          };
          $scope.postingAlbumRecsToDB($scope.albumRecommendationArray);
        }
        $scope.buildAlbumRecommendationArray();
        console.log($scope.albumRecommendationArray);

      }





      // $scope.querryAlbum = function(artistName, albumName){
      //   $http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b1d845b005a877d1c8ec8023eee403c8&artist='+artistName+'&album='+albumName+'&format=json').then(function(response){
      //     //console.log(response.data);
      //     var newAlbum = $scope.newAlbum.album;
      //     var albumInfo = response.data.album;
      //     if(albumInfo === undefined){
      //       alert("We Can't Seem to find that album");
      //     }
      //     else{
      //       console.log(newAlbum.album_name);
      //       var albumsRankedArray = $scope.newArtist.artist.albums_ranked;
      //       console.log(albumsRankedArray);
      //       for(var i=0; i<albumsRankedArray.length; i++){
      //         if(albumsRankedArray[i]==newAlbum.album_name){
      //           newAlbum.album_rank = i+1;
      //         };
      //       };
      //       var newCollected = $scope.newCollected.collected;
      //       newCollected.userID = $scope.currentUserID;
      //       newCollected.username = $scope.currentUserName;
      //       newCollected.album_name = newAlbum.album_name;
      //       newCollected.album_mbid = newAlbum.mbid;
      //       newCollected.artist_name = newAlbum.artist_name;
      //       newCollected.album_cover_url = newAlbum.album_cover_url;
      //       newCollected.album_rank = newAlbum.album_rank;
      //       $scope.saveAlbum($scope.newAlbum);
      //       $scope.saveCollected($scope.newCollected);
      //     };
      //     // if(!newAlbum.hasOwnProperty('album_rank')){
      //     //   newAlbum.album_rank = null;
      //     // }
      //   });
      // }
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
      $scope.donkeyShit = function(){
        console.log('bbbbbbb');
      }
      $scope.postData = function(){
        $scope.collectedSaving = true;
        $scope.artistNamePrep($scope.artistName);
        $scope.albumNamePrep($scope.albumName);
        console.log($scope.artistNamePrepped);
        console.log($scope.albumNamePrepped);

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
        $scope.querryArtist($scope.artistNamePrepped, $scope.albumNamePrepped);
        //$scope.artistName.replace('the ', '').replace(' ', '+'), $scope.albumName.replace('the ', '').replace(' ', '+')
        //$scope.saveCollectedNewNew();
        //console.log($scope.newArtist);

        //console.log($scope.newAlbum.album);
        //$scope.saveAlbum($scope.newAlbum);

        //console.log($scope.newArtist);
        //console.log($scope.newAlbum);
    }


  }
]);
