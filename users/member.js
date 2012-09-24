
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')

var config = {}
var urlFragment = '/members/'

/**
 * The entry point for the Member api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return Member
}

/**
 * Member Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

function Member(attr, options) {
  _.extend(this, attr)
  this.options = options
}

Member.prototype = {

  _url: function() {
    var url = Url.resolve(config.urlBase, urlFragment)
    if (this.id) url = Url.resolve(url, this.id)
    return url
  }

}

/**
 * Get a member by ID
 *
 * @param {Number} id
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Member.fetch = function(id, options, callback) {
  if (typeof options == 'function') callback = options
  options || (options = {})

  var member = new Member({id:id}, options)

  request.get({
    url: member._url(),
    headers: config.headers
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200)
      return callback(null, JSON.parse(body))
    return callback(err)
  })
}


/**
 * Get members by the given params
 *
 * @param {Object} params
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Member.list = function(params, options, callback) {
  if (typeof options == 'function') callback = options
  options || (options = {})
  params || (params = {})

  request.get({
    url: Url.resolve(config.urlBase, urlFragment),
    qs: params,
    headers: config.headers
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200)
      return callback(null, JSON.parse(body))
    return callback(err)
  })
}
