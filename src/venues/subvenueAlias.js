"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Subvenue Alias Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var SubvenueAlias = Model.extend({

    save: function(options, callback) {
      var url = SubvenueAlias.urlRoot()
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/subvenue_aliases')
    },

    list: function(options, callback) {
      var opts = _.extend({}, options, options.query)

      if (!opts.org_id)
        throw new Error('org_id is required to make subvenue alias api calls')

      var url = SubvenueAlias.urlRoot()

      return Model.list.call(this, url, options, callback)
    }

  })

  return SubvenueAlias

}
