var crypto = require('crypto')

/**
 * Generates auth key for client authentication
 * with ngin services
 *
 * @param {string} id
 * @param {string} secret
 * @returns {Object}
 */
var auth = module.exports = {

  getAuthHeaders: function(clientID, opts) {
    if (opts.access_token) {
      return { Authorization: 'Bearer ' + opts.access_token }
    }

    var authKey = opts.auth_key
    var timestamp = opts.auth_timestamp

    if (!authKey && opts.clientSecret) {
      timestamp = auth.getUnixTime()
      authKey = auth.getAuth(clientID, opts.clientSecret, timestamp)
    }

    if (authKey && timestamp) {
      return {
        'auth-client-id': clientID,
        'auth-timestamp': timestamp,
        'auth-key': authKey
      }
    }

  },

  generateKey: function(clientID, clientSecret, timestamp) {
    var secret = new Buffer(secret, 'hex')
    var hmac = crypto.createHmac('sha256', secret)
    hmac.update(clientID+'/'+timestamp)
    return hmac.digest('hex')
  },

  getUnixTime: function() {
    // go three minutes into the future to make
    // sure we have plenty of time to get all of the data
    return ((+new Date()) / 1000 | 0) + (3*60)
  }

}