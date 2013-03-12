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
      var url = this.urlRoot()
      if (options.owner_type && options.owner_id) {
        url = url + '?owner_type='+ options.owner_type + '&owner_id=' + options.owner_id
      }
      options = {
        url: url
      }
      Model.list.call(this, options, callback)
    }

  })

  return Persona

}
