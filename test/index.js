'use strict'
/* eslint-env node, mocha */
/* jslint node: true */

// Chai
let chai = require('chai')

// Chai Promises
let chaiAsPromised = require('chai-as-promised')

// Get utilities.
let Set = require('../src/index.js')

chai.use(chaiAsPromised)
chai.should()

describe('Set', function () {
  it('should allow items to be added', () => {
    let theSet = new Set()
    theSet.add(1)
    theSet.has(1).should.equal(true)
    theSet.size.should.equal(1)
  })

  it('should allow items to be deleted', () => {
    let theSet = new Set()
    theSet.add(1)
    theSet.has(1).should.equal(true)
    theSet.size.should.equal(1)
    theSet.delete(1)
    theSet.has(1).should.equal(false)
    theSet.size.should.equal(0)
  })

  it('should be clearable', () => {
    let theSet = new Set()
    theSet.add(1)
    theSet.has(1).should.equal(true)
    theSet.size.should.equal(1)
    theSet.clear()
    theSet.has(1).should.equal(false)
    theSet.size.should.equal(0)
  })

  it('items should be iterable via entries function', () => {
    let mySet = new Set()
    mySet.add('foobar')
    mySet.add(1)
    mySet.add('baz')

    let setIter = mySet.entries()
    setIter.next().value.should.eql(['foobar', 'foobar'])
    setIter.next().value.should.eql([1, 1])
    setIter.next().value.should.eql(['baz', 'baz'])
    setIter.next().done.should.equal(true)
  })

  it('items should be iterable via values function', () => {
    let mySet = new Set()
    mySet.add('foobar')
    mySet.add(1)
    mySet.add('baz')

    let setIter = mySet.values()
    setIter.next().value.should.eql('foobar')
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql('baz')
    setIter.next().done.should.equal(true)
  })

  it('items should be iterable via keys function', () => {
    let mySet = new Set()
    mySet.add('foobar')
    mySet.add(1)
    mySet.add('baz')

    let setIter = mySet.keys()
    setIter.next().value.should.eql('foobar')
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql('baz')
    setIter.next().done.should.equal(true)
  })

  it('items should be iterable via forEach function', (done) => {
    let sawFoo = false
    let sawBar = false
    let sawUndefined = false
    new Set(['foo', 'bar', undefined]).forEach(value => {
      if (value === 'foo') {
        sawFoo.should.equal(false)
        sawFoo = true
      } else if (value === 'bar') {
        sawBar.should.equal(false)
        sawBar = true
      } else if (value === undefined) {
        sawUndefined.should.equal(false)
        sawUndefined = true
      } else {
        done('forEach called with unknown value: ' + value)
      }
    })
    sawFoo.should.equal(true)
    sawBar.should.equal(true)
    sawUndefined.should.equal(true)
    done()
  })

  it('should be able to be unioned', () => {
    let setA = new Set([1, 2, 3])
    let setB = new Set([4, 5, 6])
    let setC = setA.union(setB)
    let setIter = setC.keys()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    setIter.next().value.should.eql(4)
    setIter.next().value.should.eql(5)
    setIter.next().value.should.eql(6)
    setIter.next().done.should.equal(true)
  })

  it('should be able to be intersectioned', () => {
    let setA = new Set([1, 2, 3, 4, 5])
    let setB = new Set([4, 5, 6])
    let setC = setA.intersection(setB)
    let setIter = setC.keys()
    setIter.next().value.should.eql(4)
    setIter.next().value.should.eql(5)
    setIter.next().done.should.equal(true)
    setA.size.should.equal(5)
    setB.size.should.equal(3)
    setC.size.should.equal(2)
  })

  it('should be able to be complemented', () => {
    let setA = new Set([1, 2, 3, 4, 5])
    let setB = new Set([4, 5, 6])
    let setC = setA.complement(setB)
    let setIter = setC.keys()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    setIter.next().done.should.equal(true)
    setA.size.should.equal(5)
    setB.size.should.equal(3)
    setC.size.should.equal(3)
  })

  it('should be able to be differenced', () => {
    let setA = new Set([1, 2, 3, 4, 5])
    let setB = new Set([4, 5, 6])
    let setC = setA.difference(setB)
    let setIter = setC.keys()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    setIter.next().value.should.eql(6)
    setIter.next().done.should.equal(true)
    setA.size.should.equal(5)
    setB.size.should.equal(3)
    setC.size.should.equal(4)
  })

  it('should receive all items from addAll', () => {
    let set = new Set([1, 2, 3])
    set.addAll([4, 5, 6])
    let setIter = set.values()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    setIter.next().value.should.eql(4)
    setIter.next().value.should.eql(5)
    setIter.next().value.should.eql(6)
    setIter.next().done.should.equal(true)
  })

  it('should not error if passed nothing into addAll', () => {
    let set = new Set([1, 2, 3])
    set.addAll()
    let setIter = set.values()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
  })

  it('should not error if passed non-iterable into addAll', () => {
    let set = new Set([1, 2, 3])
    set.addAll(4)
    let setIter = set.values()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    setIter.next().done.should.equal(true)
  })

  it('should remove all items from deleteAll', () => {
    let set = new Set([1, 2, 3])
    let setIter = set.values()
    setIter.next().value.should.eql(1)
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(3)
    set.deleteAll()
    set.size.should.equal(0)
    setIter = set.values()
    setIter.next().done.should.equal(true)
  })

  it('should be mappable into another set.', () => {
    let set = new Set([1, 2, 3])
    let newSet = set.map(item => item * 2)
    let setIter = newSet.values()
    setIter.next().value.should.eql(2)
    setIter.next().value.should.eql(4)
    setIter.next().value.should.eql(6)
    setIter.next().done.should.equal(true)
  })

  it('should be reduceable.', () => {
    let set = new Set([1, 2, 3])
    let result = set.reduce((lastItem, item) => lastItem + item, 0)
    result.should.equal(6)
  })
})
