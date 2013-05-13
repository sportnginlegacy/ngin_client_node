"use strict"
var _ = require('underscore')

module.exports = function(url, options, callback) {
  var params = {}
  params.url = options.url || url

  if (!params.url) throw new Error('Url not present or list not implemented.')

  console.log("NGIN CLIENT LOG",options)

  return this.sync('update', options, params, function(err, data, resp) {
    if (err) return callback(err, data, resp)

    // TODO: Add instantiation if needed.
    data = this.parseList(data, resp)
    callback(err, data, resp)
  }.bind(this))
}
