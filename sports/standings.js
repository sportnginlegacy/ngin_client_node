var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Standings Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Standings = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var subseasonID = options.subseason_id || this.subseason_id
      delete options.subseason_id

      var scope = ''
      if (options.pool_id || this.pool_id) {
        var poolID = options.pool_id || this.pool_id
        scope = '/pool/' + poolID
        delete options.pool_id
      } else if (options.division_id || this.division_id) {
        var divisionID = options.division_id || this.division_id
        scope = '/division/' + divisionID
        delete options.division_id
      }
      
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'subseasons/' + subseasonID + scope + '/standings')
    }

  },{
    parseList: function(data, resp) {
      if (data.result) data = data.result
      return [data]
    }
  })

  // wrap the inheirited list function with arg checking
  Standings.list = _.wrap(Standings.list, function(list, options, callback) {
    if (!options.subseason_id) return callback(new Error('subseason_id is required'))
    list.call(Standings, options, callback)
  })

  return Standings

}