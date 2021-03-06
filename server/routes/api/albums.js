//album router
var express = require('express');
var router = express.Router();
var Album = require('../../models/album.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('woo');
  Album.find(function(err, albums) {
    if (err) {
      next(err);
    }else {
      res.json(albums);
    }
  })
});

router.get('/:artist_name', function(req, res, next) {
  console.log(req.params);
  Collected.find({artist_name: req.params.artist_name }, function(err, albums) {
    if (err) {
      next(err);
    }else {
      res.json(albums);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("album posting");
  console.log(req.body)
  Album.create(req.body.album, function(err, album) {
    if (err) {
      next(err);
    }else {
      res.json(album);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Album.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      next(err);
    }else {
      res.status(203).end();
    }
  })
});

module.exports = router;
