"use strict"
var http = require('http')
var Buffer = require('buffer')
var StringDecoder = require('string_decoder').StringDecoder

module.exports = function(config) {
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
        metadata: {
          url: req.url
        },
        result: data
      }

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(result))
    })
  })

  server.listen(config.port || 1337, config.host || 'localhost')

  return server
}

