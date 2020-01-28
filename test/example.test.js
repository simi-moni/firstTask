var assert = require('assert'),
 expect = require('chai').expect,
 foo = 'bar';


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('#concat()', function() {
    it('should concatenated array', function() {
        expect([1,2,3].concat(4)).to.deep.equal([1,2,3,4]);
       //assert.equal([1, 2, 3].concat(4), [1,2,3,4]);
    });
  });
});

describe('String', function () {
    describe('#stringEqual', function(){
       it('return if it is equal', function(){
        expect(foo).to.equal('bar');
    });
    });
});

describe('Object Test', function(){
    it('should have property name', function(){
      var car = {name:'Figo', Maker:'Ford'}
      expect(car).have.property('name');
    });
});

/*describe('database test', function(){
    describe('#getMessages', function () {
        it('should return messages', function(){
            
            expect(res.body).to.be.a('object');
        })        
    })
})*/