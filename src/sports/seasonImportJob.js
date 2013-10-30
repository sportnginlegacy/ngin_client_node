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
      if (!this.season_id) return callback(new Error('"season_id" required'))
      if ((['team', 'player', 'game']).indexOf(this.type) === -1) return callback(new Error('"type" has an invalid value'))
      if (!this.csv_string) return callback(new Error('"csv_string" required'))

      var url = SeasonImportJob.urlRoot({ season_id: this.season_id })
      return Super.save.call(this, url, options, callback)
    },

  },{

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      var url = '/seasons/' + options.season_id + '/import_jobs'
      return Url.resolve(base, url)
    },

    list: function(options, callback) {
      if (!options.season_id) return callback(new Error('"season_id" required'))
      var url = SeasonImportJob.urlRoot(options)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return SeasonImportJob

}
