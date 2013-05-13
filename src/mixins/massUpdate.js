"use strict"
var _ = require('underscore')

function normalizeParams(url, options, callback) {
  options || (options = {})
  options.url = options.url || url
  return [options, callback]
}

module.exports = function(url, options, callback) {
  var options = normalizeParams(url, options, callback)
  callback = options[1]
  options = options[0]

  if (!options.url) throw new Error('Url not present or list not implemented.')

  console.log("NGIN CLIENT LOG",options)

  return this.sync('update', options, options, function(err, data, resp) {
    if (err) return callback(err, data, resp)

    // TODO: Add instantiation if needed.
    data = this.parseList(data, resp)
    callback(err, data, resp)
  }.bind(this))
}
