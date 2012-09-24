
var _ = require('underscore')
var extendable = require('extendable')
var sync = require('./sync')

var Model = function(attributes, options) {
  this.initialize.apply(this, arguments)
}

// Instance methods
// ================

_.extend(Model.prototype, {

  initialize: function() {},

  isValid: function(options) {
    return !this.validate || !this.validate(options)
  },

  fetch: function(options, callback) {
    var self = this
    sync('read', this, options, function(err, data, resp) {
      if (err) return callback(err)
      data = self.parse(data, resp)
      _.extend(self, data)
      callback(err, data)
    })
  },

  save: function(options, callback) {
    var self = this
    if (typeof options == 'function') {
      callback = options
      options = {}
    }

    if (!this.isValid()) return callback('Model is not in a valid state.')

    var method = !!this.id ? 'update' : 'create'
    sync(method, this, options, function(err, data, resp) {
      if (err) return callback(err)
      data = self.parse(data, resp)
      _.extend(self, data)
      callback(err, data)
    })
  },

  destroy: function(options, callback) {
    if (!this.id) callback(null, true)
    sync('destroy', this, options, function(err, data, resp) {
      return callback(err, data, resp)
    })
  },

  parse: function(attributes) {
    return attributes
  }

})

// Class methods
// =============

_.extend(Model, {

  create: function(attributes, options, callback) {
    var Class = this
    var defaults = Class.defaults
    attributes || (attributes = {})
    if (defaults = _.result(Class, 'defaults')) {
      attributes = _.extend({}, defaults, attributes)
    }

    var inst = new Class(attributes, options)

    if (!inst.id) return callback(null, inst)

    inst.fetch(options, function(err, data, resp) {
      callback(err, inst)
    })
  },

  extend: extendable

}
