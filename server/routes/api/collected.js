//collected router
var express = require('express');
var router = express.Router();
var Collected = require('../../models/collected.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('woo');
  Collected.find(function(err, collecteds) {
    if (err) {
      next(err);
    }else {
      res.json(collecteds);
    }
  })
});

router.get('/:userID', function(req, res, next) {
  console.log(req.params);
  Collected.find({userID: req.params.userID }, function(err, collecteds) {
    if (err) {
      next(err);
    }else {
      res.json(collecteds);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("collected posting");
  console.log(req.body)
  Collected.create(req.body.collected, function(err, collected) {
    if (err) {
      next(err);
    }else {
      res.json(collected);
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
