"use strict"

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Play Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Play = SportsModel.extend({

    fetch: function(options, callback) {
      return Super.fetch.call(this, this.urlById(), options, callback)
    },

    save: function(options, callback) {
      var url = Play.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      return Super.destroy.call(this, this.urlById(), options, callback)
    }

  }, {

    urlRoot: function() {
      return this.resolve('/plays')
    },

    list: function(options, callback) {
      if (!options.game_id)
        return callback(new Error('game_id is required to list plays'))
      options.query = options.query || {}
      options.query.game_id = options.game_id

      var url = Play.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Play
}
