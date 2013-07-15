"use strict"
var _ = require('underscore')
var http = require('http')
var Buffer = require('buffer')
var StringDecoder = require('string_decoder').StringDecoder

module.exports = function(config, callback) {
  if (typeof config === 'function') {
    callback = config
    config = {}
  }
  config || (config = {})

  var server = http.createServer(function(req, res) {

    var buffer

    req.on('data', function(chunk) {
      if (buffer) buffer = Buffer.concat([buffer, chunk])
      else buffer = chunk
    })

    req.on('end', function() {
      var decoder = new StringDecoder('utf8')
      var data = buffer && decoder.write(buffer) || ''
      try {
        data = JSON.parse(data)
      } catch(ex) {}

      var result = {
        metadata: _.extend({ url: req.url }, config.metadata),
        result: config.data || data
      }

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(result))
    })
  })

  server.listen(config.port || 1337, config.host || 'localhost', callback)

  return server
}

