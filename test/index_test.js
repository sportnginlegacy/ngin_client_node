
var assert = require('assert')
var sinon = require('sinon')

var NginClient = require('../index')
var ngin = new NginClient({})

describe('NginClient', function() {

  beforeEach(function(done) {
    done()
  })

  describe('Available Models', function() {

    Object.keys(ngin).forEach(function(name){
      if (!/^[A-Z]/.test(name)) return
      it('should have ' + name + ' model', function(done) {
        assert.equal(typeof ngin[name], 'function')
        done()
      })
    })

  })

  describe('Model Getters', function() {

    it('should memoize the model scoping', function(done) {
      var n1 = new NginClient({auth:{access_token:'abc'}})
      var n2 = new NginClient({auth:{access_token:'123'}})
      var n3 = new NginClient({auth:{access_token:'abc'}})

      assert.strictEqual(n1.Team, n1.Team)
      assert.strictEqual(n1.Team, n3.Team)
      assert.notEqual(n1.Team, n2.Team)

      done()
    })

    it('should rescope models if the access_token changes', function(done) {
      var n1 = new NginClient({auth:{access_token:'abc'}})
      var t1 = n1.Team

      n1.setAuth({access_token:'123'})
      var t2 = n1.Team

      n1.setAuth({access_token:'abc'})
      var t3 = n1.Team

      assert.notEqual(t1, t2)
      assert.strictEqual(t1, t3)
      done()
    })

  })



})
