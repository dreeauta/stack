var express = require('express');
var router = express.Router();
var ZoneController = require('../controllers/ZoneController');
var CommentController = require('../controllers/CommentController');

var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {


    // resource is being extrated from url path
      //req.query will return a JS object after the query string is parsed.

      //req.params will return parameters in the matched route.
      // If your route is /user/:id and you make a request to /user/5 - req.params would yield {id: "5"}
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null){
    res.json({
      confirmation: 'fail',
      message:'Invalid Resource Request: ' + resource
    })
    return
  }

  controller.find(req.query, function(err,results){
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
      })
  })


});


router.get('/:resource/:id', function(req,res,next){
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];

    if (controller == null){
      res.json({
        confirmation: 'fail',
        message:'Invalid Resource Request: ' + resource
      })
      return
    }

    controller.findById(id, function(err,result){
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

});

router.post('/:resource', function(req,res,next){
  var resource = req.params.resource;
  var controller = controllers[resource];

    if (controller == null){
      res.json({
        confirmation: 'fail',
        message:'Invalid Resource Request: ' + resource
      })
      return
    }

    controller.create(req.body, function(err,result){
      //creating a form it comes in the body, package from form
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
    })

});


router.put('/:resource/:id', function(req, res, next){
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

    if (controller == null){
      res.json({
        confirmation: 'fail',
        message:'Invalid Resource Request: ' + resource
      })
      return
    }

    controller.findByIdAndUpdate( id, function(err,result){
      if (err){
        res.json({
          confirmation:' fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
    })

});

router.delete('/:resource/:id', function(req,res,next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  controller.findByIdAndRemove(id, function(err,result) {
    if (err){
      res.json({
        confirmation:' fail',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    })
  })

})



module.exports = router;
