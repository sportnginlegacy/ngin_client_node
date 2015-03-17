"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config


  var Position = SportsModel.extend({

  }, {

    list: function(options, callback) {
      if (!options.sport_id)
        return callback(new Error('sport_id is required to list positions'))
      var url = ngin.Sport.urlRoot() + '/' + options.sport_id + '/positions'
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Position

}
