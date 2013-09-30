"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * SeasonImportJob Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */
  // - test fetch throws error
  // - everthing blows up

  var SeasonImportJob = SportsModel.extend({

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      if (this.id) return callback(new Error('Update not supported'))
      var url = SeasonImportJob.urlRoot({ seasonID: this.seasonID })
      return Super.save.call(this, url, options, callback)
    },

  },{

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      var url = '/seasons/' + options.seasonID + '/import_jobs'
      return Url.resolve(base, url)
    },

    list: function(options, callback) {
      if (!options.seasonID) return callback(new Error('seasonID required'))
      var url = SeasonImportJob.urlRoot(options)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return SeasonImportJob

}
