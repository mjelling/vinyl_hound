//recommendation router
var express = require('express');
var router = express.Router();
var Recommendation = require('../../models/recommendation.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('woo');
  Recommendation.find(function(err, recommendations) {
    if (err) {
      next(err);
    }else {
      res.json(recommendations);
    }
  })
});

router.get('/:userID', function(req, res, next) {
  console.log(req.params);
  Recommendation.find({userID: req.params.userID }, function(err, recommendations) {
    if (err) {
      next(err);
    }else {
      res.json(recommendations);
    }
  })
});

router.post('/', function(req, res, next) {
  console.log("recommendation posting");
  console.log(req.body)
  Recommendation.create(req.body.recommendation, function(err, recommendation) {
    if (err) {
      next(err);
    }else {
      res.json(recommendation);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Cecommendation.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      next(err);
    }else {
      res.status(203).end();
    }
  })
});

module.exports = router;
