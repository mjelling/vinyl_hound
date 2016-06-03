var express = require('express');
var router = express.Router();
var Artist = require('../../models/artist.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Artist.find(function(err, artists) {
    if (err) {
      next(err);
    }else {
      res.json(artists);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("artist posting");
  console.log(req.body)
  Artist.create(req.body.artist, function(err, artist) {
    if (err) {
      next(err);
    }else {
      res.json(artist);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Artist.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      next(err);
    }else {
      res.status(203).end();
    }
  })
});

module.exports = router;
