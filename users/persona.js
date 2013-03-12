var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Persona Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Persona = Model.extend({

    urlRoot: function() {
      console.log('running model urlRoot')
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/personas')
    }

  }, {

    list: function(options, callback){
      console.log('running list')
      var url = this.urlRoot()
      if (options.orgID) {
        url = url + '/personas?owner_type=organization&owner_id=' + options.orgID
      }
      console.log('URL', url)
      options = {
        url: url
      }
      return Model.list.call(this, options, callback)
    }

  })

  return Persona

}
