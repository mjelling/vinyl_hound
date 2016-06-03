//collected router
var express = require('express');
var router = express.Router();
var Collected = require('../../models/album.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('woo');
  Collected.find(function(err, albums) {
    if (err) {
      next(err);
    }else {
      res.json(albums);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("BOOOOO-URNS");
  console.log(req.body)
  Collected.create(req.body.album, function(err, album) {
    if (err) {
      next(err);
    }else {
      res.json(album);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Collected.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      next(err);
    }else {
      res.status(203).end();
    }
  })
});

module.exports = router;
