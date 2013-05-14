"use strict"

var Url = require('url')
var _ = require('underscore')
var async = require('async')
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

      if (options.page) {
        options.query = _.extend({}, options.query, {page:options.page})
      }

      return this.sync('read', null, options, function(err, data, resp) {
        if (err) return callback(err, data, resp)

        var pagination = data.metadata && data.metadata.pagination

        data = self.parseList(data, resp)
        self.fromList(data, function(err, list) {

          // check for a single page request
          if (options.page || !pagination || (pagination && pagination.total_pages === 1)) {
            list._pagination = pagination
            return callback(err, list, resp)
          }

          // auto paginate
          var pages = _.range(pagination.current_page+1, pagination.total_pages+1)
          async.map(pages,
            function(page, callback) {
              var opts = _.clone(options)
              opts.page = page
              self.list(opts, callback)
            },
            function(err, results) {
              if (err) return callback(err)
              list = list.concat.apply(list, results)
              callback(null, list, resp)
            })

        })
      })
    },

    parseList: function(data, resp) {
      if (data.result) data = data.result
      return data
    },

    fromList: function(data, callback) {
      var list = []
      async.map(data,
        function(attrs, callback) {
          this.create(attrs, {fetched:true}, function(err, inst) {
            callback(err, inst)
          })
        }.bind(this),
        callback)
    },

    sync: sync,

    extend: extendable

  })

  return Model

}
