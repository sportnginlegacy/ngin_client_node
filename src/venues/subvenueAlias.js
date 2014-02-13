"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config


  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (options.subvenue_id) {
      return ngin.Subvenue.urlRoot() + '/' + options.subvenue_id + '/subvenue_aliases'
    } else {
      return SubvenueAlias.urlRoot()
    }
  }

  /**
   * Subvenue Alias Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var SubvenueAlias = Model.extend({

    save: function(options, callback) {
      var url = scopeUrl(options)
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      if (!this.id)
        throw new Error('subvenue_id is required to delete subvenue alias')
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.venues || config.url
      var aliases = '/subvenue_aliases'
      return Url.resolve(base, '/subvenue_aliases')
    },

    list: function(options, callback) {
      var opts = _.extend({}, options, options.query)

      if (!opts.org_id)
        throw new Error('org_id is required to make subvenue alias api calls')

      var url = scopeUrl(opts)

      return Model.list.call(this, url, options, callback)
    }

  })

  return SubvenueAlias

}
