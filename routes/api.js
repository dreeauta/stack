var express = require('express');
var router = express.Router();
var ZoneController = require('../controllers/ZoneController');

router.get('/:resource', function(req, res, next) {

  var resource = req.params.resource;

    // resource is being extrated from url path
  if (resource == 'zone'){
    ZoneController.find(req.query, function(err,results){
      //req.query will return a JS object after the query string is parsed.

      //req.params will return parameters in the matched route.
      // If your route is /user/:id and you make a request to /user/5 - req.params would yield {id: "5"}
      if (err){
        res.json({
          confirmation:'fail',
          message: err
        })
        return
      }

      res.json({
        confirmation:'success',
        results: results
      });
    });

  }

});


router.get('/:resource/:id', function(req,res,next){
    var resource = req.params.resource;
    var id = req.params.id;

    if (resource == 'zone') {
      ZoneController.findById(id, function(err,result){
        if (err) {
          res.json({
            confirmation: 'fail',
            message: 'not found'
          })
          return
        }

        res.json({
          confirmation: 'success',
          result: result
        })
      })
    }
});

router.post('/:resource', function(req,res,next){
  var resource = req.params.resource;

  if (resource == 'zone'){
    ZoneController.create(req.body, function(err,result){
      //creating a form it comes in the body, package from form
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'succcess',
        result: result
      })
    })
  }
});


module.exports = router;
