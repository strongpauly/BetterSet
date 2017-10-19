'use strict'

/* jslint node: true */

/**
 * A set proxy that adds some useful methods that should (IMO) be part of the base spec.
 */
module.exports = (function () {
  class BetterSet extends Set {

    /**
     * Add all items in an iterable to this set.
     */
    addAll (iterable) {
      if (!iterable || typeof iterable.forEach !== 'function') {
        return
      }
      iterable.forEach(item => {
        this.add(item)
      })
    }

    /**
     * Deletes all items from this set.
     */
    deleteAll () {
      this.forEach(item => {
        this.delete(item)
      })
    }

    /**
     * Returns a union of this set with another Set or iterable.
     */
    union (otherSet) {
      let newSet = new BetterSet(this)
      newSet.addAll(otherSet)
      return newSet
    }

        /**
         * Returns an intersection of this set with another Set.
         */
    intersection (otherSet) {
      let newSet = new BetterSet()
      this.forEach(item => {
        if (otherSet.has(item)) {
          newSet.add(item)
        }
      })
      return newSet
    }

    /**
     * Returns a relative complement of this set with another,
     * i.e. all the items that are in this set, but not in the other.
     */
    complement (otherSet) {
      let newSet = new BetterSet()
      this.forEach(item => {
        if (!otherSet.has(item)) {
          newSet.add(item)
        }
      })
      return newSet
    }

    /**
     * Returns a symmetric difference of the two sets,
     * i.e. all the items that were not in both sets.
     * Can be thought of as the negative intersection.
     */
    difference (otherSet) {
      let newSet = new BetterSet()
      // Union two sets first.
      let union = this.union(otherSet)
      union.forEach(item => {
        // Only add it to the new set if it doesn't exist in both.
        if (!(otherSet.has(item) && this.has(item))) {
          newSet.add(item)
        }
      })
      return newSet
    }

    equals (otherSet) {
      if (this === otherSet) {
        return true
      } else if (!(otherSet instanceof BetterSet) || this.size !== otherSet.size) {
        return false
      } else {
        for (let value of this.values()) {
          if (!otherSet.has(value)) {
            return false
          }
        }
        return true
      }
    }

    /**
     * Convenience function turning this into an array.
     */
    asArray () {
      return Array.from(this)
    }

    /**
     * Convenience function acting like Array.prototype.map.
     */
    map (mapFunction, thisArg) {
      return new BetterSet(this.asArray().map(mapFunction, thisArg))
    }

    /**
     * Convenience function acting like Array.prototype.reduce.
     */
    reduce (reduceFunction, initialValue) {
      return this.asArray().reduce(reduceFunction, initialValue)
    }

  }
  return BetterSet
}())
