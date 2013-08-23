var request = require('request')
var _ = require('underscore')

module.exports = Svc

function Svc(spec) {
  this.services = spec.services
  this._createResources(spec.resources)
}

var s = Svc.prototype


s._createResources = function(recs) {
  for (var name in recs) {
    var rec = recs[name]
    rec.urlbase = this.services[rec.service]
    this[name] = new Resource(rec)
  }
}




function Resource(def) {
  this.def = def
  this.urlbase = def.urlbase
  this._createOps(def.classOperations, this.urlbase)
}

var r = Resource.prototype

r.create = function(attrs) {
  var obj = {}
  this._createOps.call(obj, this.def.instanceOperations, this.urlbase)
  _.extend(obj, attrs)
  return obj
}

r._createOps = function(ops, urlbase) {
  Object.keys(ops).forEach(function(name) {
    var op = ops[name]

    this[name] = function(options, callback) {
      var uri = buildUri(urlBase, op.path, options, this)
      return request({
        method: op.method,
        uri: uri,
        jar: false,

      })
    }

  }.bind(this))
}

function buildUri(base, path, options, data) {
  // todo: replace path args with options/data values
  return base + path
}


function scopeSync(options) {
  var headers = _.extend({
    Accept:'application/json'
  }, options && options.headers)
  options = _.extend({
    headers: headers
    jar: false
  }, options)
  var req = request.defaults(options)
  return req
}
