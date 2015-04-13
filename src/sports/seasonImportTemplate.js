"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * SeasonImportTemplate Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */
  var SeasonImportTemplate = SportsModel.extend({

    extendSelf: false,

    fetch: function(callback) {
      if (!this.season_id) return callback(new Error('"season_id" required'))
      if (!this.type) return callback(new Error('"type" is required'))

      return Super.fetch.call(this, SeasonImportTemplate.urlRoot(this), this, callback)
    }

  },{

    urlRoot: function(options) {
      var format = options.format || 'csv'
      var url = '/seasons/' + options.season_id + '/import_templates.' + format
      url += '?type=' + options.type

      var base = _.result(config.urls, 'sports') || config.url
      return Url.resolve(base, url)
    }

  })

  return SeasonImportTemplate

}
