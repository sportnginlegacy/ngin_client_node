
var request = require('request')


  // Map from CRUD to HTTP for the default `sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  var sync = module.exports = function(method, model, options, callback) {
    var type = methodMap[method];

    // Default options, unless specified.
    options || (options = {});

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method === 'create' || method === 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model);
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET') {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return request(_.extend(params, options), function(err, resp, body) {
      if (err) return callback(err)

      var contentType = res.headers['content-type']
      if (~contentType.indexOf('json')) {
        try {
          body = JSON.parse(body)
        } catch (ex) {
          console.warn('Response body not parsable JSON')
        }
      }

      callback(err, body, resp)
    });
  }
