var express = require('express');
var router = express.Router();
var Bounceback = require('../../models/bouncebacks.js');

/* GET bouncebacks. */
router.get('/', function(req, res, next) {
  Bounceback.find(function(err, bouncebacks) {
    if (err) {
      next(err);
    }else {
      res.json(bouncebacks);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("bounceback posting");
  console.log(req.body)
  Bounceback.create(req.body.bounceback, function(err, bounceback) {
    if (err) {
      next(err);
    }else {
      res.json(bounceback);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Bounceback.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      next(err);
    }else {
      res.status(203).end();
    }
  })
});

module.exports = router;
