var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * GameSlot Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var GameSlot = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournament_schedules')
    }

  }, {

    list:function(options, callback) {
      callback(new Error('Not implemented'))
    },

    create:function(options, callback) {
      callback(new Error('Not implemented'))
    }

  })

  return GameSlot

}
