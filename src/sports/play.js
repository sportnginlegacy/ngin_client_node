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
      var url = Play.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Play.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      return this.resolve('/plays')
    },

    list: function(options, callback) {
      var url = Play.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Play
}
