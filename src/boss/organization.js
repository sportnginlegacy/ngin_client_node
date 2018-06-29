"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config || {}

  /**
   * Organization Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Organization = Model.extend({

    fetch: function(options, callback) {
      var url = Organization.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    }

  },{

    urlRoot: function() {
      var base = config.urls && config.urls.boss || config.url
      return Url.resolve(base, '/organizations')
    },

    list: function(options, callback) {
      if (typeof options == 'function') callback = options, options = {}
      var url = Organization.urlRoot() + '/all'
      return Model.list.call(this, url, options, callback)
    },

    mine: function(options, callback) {
      if (typeof options == 'function') callback = options, options = {}
      if(config.my_admin_access_roles) options.query = _.extend({}, options.query, {roles:config.my_admin_access_roles})
      var url = Organization.urlRoot() + '/my_admin_access'
      return Model.list.call(this, url, options, callback)
    }

  })

  return Organization

}
