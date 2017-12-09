var Zone = require('../models/Zone');

module.exports = {
  find: function(params, callback){
    Zone.find(params, function(err, zones){
      if (err) {
        callback(err, null)
        return
      }
      callback(null, zones)
    })
  },
  findById: function(id, callback){
    Zone.find(id, function(err, zone){
      if (err){
        callback(err,null)
        return
      }
      callback(null, zone)
    })

  },
  create: function(params, callback){
    var zips = params['zipcodes'];
    var zip = zips.split(',');
    var newZips = []
    //create new zipcode array for multiple zipcodes
    zip.forEach(function(zipCode){
      newZips.push(zipCode.trim())
      //user might use spaces
    })

    params['zipcodes'] = newZips;

    Zone.create(params, function(err, zone){
      if (err){
        callback(err,null)
        return
      }
      callback(null, zone)
    });

  },
  update: function(){

  }

};
