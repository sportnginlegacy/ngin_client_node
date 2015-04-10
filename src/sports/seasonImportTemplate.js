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
  // - test fetch throws error
  // - everthing blows up

  var SeasonImportTemplate = SportsModel.extend({

    fetch: function(options, callback) {
      return Super.fetch.call(this, this.urlById(), options, callback)
    }

  },{

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      var url = '/seasons/' + options.season_id + '/import_templates'
      return Url.resolve(base, url)
    }

  })

  return SeasonImportTemplate

}
