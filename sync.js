
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

module.exports = function(ngin) {
  var config = ngin.config
  var auth = ngin.auth

  // Override this function to change the manner in which Nokomis persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful HTTP request
  // to the model's `url()`.
  return function(method, model, options, callback) {
    var type = methodMap[method]

    // Default options, unless specified.
    options || (options = {})

    // Default JSON-request options.
    var params = _.extend({}, options, {
      jar: false, // don't remember cookies
      method: options.method || type,
      headers: _.extend({Accept:'application/json'}, config.headers, options.headers)
    })

    // Ensure that we have a URL.
    if (!params.url) {
      params.url = _.result(model, 'url') || urlError()
    }

    // request expects the `url` property to be a parsed Url object
    if (typeof params.url == 'string') {
      params.url = Url.parse(params.url)
    }

    // Ensure that we have the appropriate request data.
    if (!params.data && model && (method === 'create' || method === 'update')) {
      params.headers['Content-Type'] = 'application/json'
      params.body = JSON.stringify(model)
    }

    // translate from query to qs for request
    if (params.query) {
      params.qs = params.query
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET') {
      params.processData = false
    }

    // setup authorization
    if (auth && auth.access_token) {
      params.headers.Authorization = 'Bearer ' + auth.access_token
    }

    var req
    return req = request(params, function(err, resp, body) {
      if (err) {
        console.error('Request to ' + params.url + ' resulted in an error:', err)
        return callback(err, body, resp)
      }

      var contentType = resp.headers['content-type'] || resp.headers['Content-Type'] || ''

      var parsedBody = body
      if (contentType.match(/json/)) {
        try {
          parsedBody = JSON.parse(parsedBody)
        } catch (e) {
          console.error('API response not parsable JSON:', body)
        }
      }

      // if the response wasn't in the 2XX status
      // code block then we treat it as an error
      if (resp.statusCode >= 300) {
        var err = new Error('Request failed')
        err.url = params.url
        err.statusCode = resp.statusCode
        err.body = parsedBody
        console.error(err)
        return callback(err, body, resp)
      }

      callback(err, parsedBody, resp)
    })
  }

}