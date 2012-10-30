
var Url = require('url')
var request = require('request')
var _ = require('underscore')


// Map from CRUD to HTTP for the default `sync` implementation.
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'delete': 'DELETE',
  'read':   'GET'
}

// Override this function to change the manner in which Nokomis persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, makes a RESTful HTTP request
// to the model's `url()`.
var sync = module.exports = function(method, model, options, callback) {
  var type = methodMap[method]

  // Default options, unless specified.
  options || (options = {})

  // Default JSON-request options.
  var params = {
    method: type,
    headers: _.extend({}, sync.config.headers, options.headers)
  }

  // Ensure that we have a URL.
  if (!options.url) {
    params.url = _.result(model, 'url') || urlError()
  }

  if (typeof params.url == 'string') {
    params.url = Url.parse(params.url)
  }

  // add oauth bearer token header
  if (options.access_token) {
    params.headers = _.extend(params.headers, { Authorization: 'Bearer: ' + options.access_token})
  }

  // Ensure that we have the appropriate request data.
  if (!options.data && model && (method === 'create' || method === 'update')) {
    params.headers['Content-Type'] = 'application/json'
    params.body = JSON.stringify(model)
  }

  // translate from query to qs for request
  if (options.query) {
    params.qs = options.query
  }

  // Don't process data on a non-GET request.
  if (params.type !== 'GET') {
    params.processData = false
  }

  // Make the request, allowing the user to override any options.
  var req
  return req = request(_.extend(params, options), function(err, resp, body) {
    if (err) return callback(err, body, resp)

    if (resp.statusCode >= 300)
      return callback('Error: ' + resp.statusCode + ' ' + body, body, resp)

    var contentType = resp.headers['content-type'] || ''
    if (~contentType.indexOf('json')) {
      try {
        body = JSON.parse(body)
      } catch (ex) {
        console.warn('Response body not parsable JSON')
      }
    }

    callback(err, body, resp)
  })
}

// default config
sync.config = {}
