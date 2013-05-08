"use strict"

var Url = require('url')
var _ = require('underscore')
var extendable = require('extendable')

var noop = function(){}

module.exports = function(ngin) {
  var sync = ngin.sync

  var Model = function(attributes, options) {
    _.extend(this, attributes)
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
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      return this.sync('read', options, function(err, data, resp) {
        if (err) return callback(err, self, resp)
        data = self.parse(data, resp)
        _.extend(self, data)
        callback(err, self, resp)
      })
    },

    save: function(options, callback) {
      var self = this
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      if (!this.isValid()) return callback('Model is not in a valid state.')
      var method = options.method || !!this.id ? 'update' : 'create'
      return this.sync(method, options, function(err, data, resp) {
        if (err) return callback(err, data, resp)
        data = self.parse(data, resp)
        _.extend(self, data)
        callback(err, data, resp)
      })
    },

    destroy: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      if (!this.id) callback(null, true)
      return this.sync('delete', options, function(err, data, resp) {
        return callback(err, data, resp)
      })
    },

    parse: function(attributes) {
      if (attributes.result) return attributes.result
      return attributes
    },

    callbackWithParse: function(callback) {
      return function(err, data) {
        var args = _.toArray(arguments)
        if (args[1]) args[1] = this.parse(args[1])
        callback.apply(this, args)
      }.bind(this)
    },

    sync: function(method, options, callback) {
      return sync(method, this, options, callback)
    }

  })

  // Class methods
  // =============

  _.extend(Model, {

    create: function(attributes, options, callback) {
      if (typeof options === 'function') {
        callback = options, options = {}
      }

      options || (options = {})
      attributes || (attributes = {})

      var Class = this
      var defaults = Class.defaults
      if (defaults = _.result(Class, 'defaults')) {
        attributes = _.extend({}, defaults, attributes)
      }

      var inst = new Class(attributes, options)

      if (!inst.id || options.fetched === true) {
        // Don't go fetch the model's data
        callback && callback(null, inst)
      }
      else {
        // Fetch the model from API
        inst.fetch(options, function(err, data, resp) {
          callback && callback(err, inst, data, resp)
        })
      }

      return inst
    },

    list: function(options, callback) {
      var self = this
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      // create a temp obj that with the same prototype as the model
      var temp = _.extend({}, this.prototype)

      if (!options.url) {
        options.url = _.isFunction(temp.url) ? temp.url(options) : temp.url
      }

      return this.sync('read', null, options, function(err, data, resp) {
        if (err) return callback(err, data, resp)
        data = self.recursiveParseList(data, resp, options, function(data) {
          var list = []
          for (var i = 0; i < data.length; i++) {
            // TODO: The create method should run snychronously since we've already
            // fetched the data. Might want to convert this code to use the `async`
            // module so that we don't have to make assumptions about how the
            // create method runs
            self.create(data[i], {fetched:true}, function(err, inst) {
              list.push(inst)
            })
          }
          callback(err, list, resp)
        })
      })
    },

    recursiveParseList: function(data, resp, options, finalize) {
      var self = this
      if (data.metadata && data.metadata.pagination) var pagination = data.metadata.pagination
      if (data.result) data = data.result
      if(pagination && !pagination.last_page) {
        var current_page = pagination.current_page
        var next_options = _.clone(options)
        var next_url = Url.parse(next_options.url, true)
        next_url.query.page = current_page + 1
        next_options.url = next_url
        var next_page = this.sync('read', null, next_options, function(err, more_data, resp) {
          if (err) return callback(err, more_data, resp)
          more_data.result = data.concat(more_data.result)
          self.recursiveParseList(more_data, resp, next_options, finalize)
        })
      } else {
        finalize(data)
      }
    },

    sync: sync,

    extend: extendable

  })

  return Model

}
