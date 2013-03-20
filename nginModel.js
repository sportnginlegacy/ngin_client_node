"use strict"
var _ = require('underscore')

module.exports = function(ngin) {
  var config = ngin.config
  var Model = ngin.Model
  var headers = {
    // 'STAT-NGIN-API-TOKEN': config.statNginApiToken,
    // 'Accept': 'application/vnd.stat-ngin.v2,application/json'
  }

  /**
   * Extend from this model to interact with stat ngin
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  function normalizeParams(url, options, callback) {
    if (url && typeof url === 'object') {
      options = url
      url = null
    }
    else if (typeof url === 'function') {
      callback = url
      url = null
    }
    if (typeof options === 'function') {
      callback = options
      options = null
    }
    options || (options = {})
    options.url = url
    return [options, callback]
  }

  var NginModel = Model.extend({

    fetch: function(url, options, callback) {
      var args = normalizeParams(url, options, callback)
      if (!args[0].url) throw new Error('Url not present or fetch not implemented.')
      Model.prototype.fetch.apply(this, args)
    },

    save: function(url, options, callback) {
      var args = normalizeParams(url, options, callback)
      if (!args[0].url) throw new Error('Url not present or save not implemented.')
      Model.prototype.save.apply(this, args)
    },

    destroy: function(url, options, callback) {
      var args = normalizeParams(url, options, callback)
      if (!args[0].url) throw new Error('Url not present or destroy not implemented.')
      Model.prototype.destroy.apply(this, args)
    }

  }, {

    create: function(attributes, url, options, callback) {
      var args = normalizeParams(url, options, callback)
      args.unshift(attributes)
      if (!args[1].url && !args[1].fetched && attributes.id != null)
        throw new Error('Url not present or create not implemented.')
      Model.create.apply(this, args)
    },

    list: function(url, options, callback) {
      var args = normalizeParams(url, options, callback)
      if (!args[0].url) throw new Error('Url not present or list not implemented.')
      Model.list.apply(this, args)
    }

  })

  return NginModel

}
