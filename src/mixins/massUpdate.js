"use strict"
var _ = require('underscore')

module.exports = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  var params = {}
  params.url = url
  var model = options

  if (!params.url) throw new Error('Url not present or list not implemented.')

  return this.sync('update', model, params, function(err, data, resp) {
    if (err) return callback(err, data, resp)

    // TODO: Add instantiation if needed.
    data = this.parseList(data, resp)
    callback(err, data, resp)
  }.bind(this))
}
