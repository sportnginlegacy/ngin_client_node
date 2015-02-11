"use strict"

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * PlayAction Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var PlayAction = SportsModel.extend({

    fetch: function(options, callback) {
      return Super.fetch.call(this, this.urlById(), options, callback)
    },

    save: function(options, callback) {
      return Super.save.call(this, this.urlById(true), options, callback)
    },

    destroy: function(options, callback) {
      return Super.destroy.call(this, this.urlById(), options, callback)
    }

  }, {

    urlRoot: function() {
      return this.resolve('/play_actions')
    },

    list: function(options, callback) {
      if (!options.play_id)
        return callback(new Error('play_id is required to list plays'))
      options.query = options.query || {}
      options.query.play_id = options.play_id

      var url = PlayAction.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return PlayAction
}
