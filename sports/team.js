
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')

var config = {}
var urlFragment = '/teams/'

/**
 * The entry point for the Team api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return Team
}

/**
 * Team Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

function Team(attr, options) {
  _.extend(this, attr)
  this.options = options
}

Team.prototype = {

  _url: function() {
    var url = Url.resolve(config.urlBase, urlFragment)
    if (this.id) url = Url.resolve(url, this.id)
    return url
  }

}


/**
 * Get a team by ID
 *
 * @param {Number} id
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Team.fetch = function(id, options, callback) {
  if (typeof options == 'function') callback = options
  options || (options = {})

  var team = new Team({id:id}, options)

  request.get({
    url: team._url(),
    headers: config.headers
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200)
      return callback(null, JSON.parse(body))
    return callback(err)
  })
}


