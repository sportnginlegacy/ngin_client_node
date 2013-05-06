"use strict"
var _ = require('underscore')

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
  options.url = options.url || url
  return [options, callback]
}

module.exports = function(url, options, callback) {
  var options = normalizeParams(url, options, callback)
  callback = options[1]
  options = options[0]

  if (!options.url) throw new Error('Url not present or list not implemented.')

  return this.sync('update', null, options, function(err, data, resp) {
    if (err) return callback(err, data, resp)

    // TODO: Add instantiation if needed.
    data = this.parseList(data, resp)
    callback(err, data, resp)
  }.bind(this))
}
