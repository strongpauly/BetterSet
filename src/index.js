/* jslint node: true */

/**
 * A set proxy that adds some useful methods that should (IMO) be part of the base spec.
 */
export default class BetterSet extends Set {
  /**
   * Add all items in an iterable to this set.
   */
  addAll(iterable) {
    if (!iterable) {
      return;
    }
    if(typeof iterable.forEach === 'function') {
      iterable.forEach(item => {
        this.add(item)
      })
      return;
    }
    if(typeof iterable.next === 'function') {
      let next = iterable.next();
      while(typeof next?.value !== 'undefined') {
        this.add(next.value)
        next = iterable.next()
      }
    }
  }

  /**
   * Deletes all items from this set.
   */
  deleteAll() {
    this.forEach(item => {
      this.delete(item);
    });
  }

  /**
   * Returns a union of this set with another Set or iterable.
   */
  union(otherSet) {
    const newSet = new BetterSet(this);
    newSet.addAll(otherSet);
    return newSet;
  }

  /**
   * Returns an intersection of this set with another Set.
   */
  intersection(otherSet) {
    const newSet = new BetterSet();
    this.forEach(item => {
      if (otherSet.has(item)) {
        newSet.add(item);
      }
    });
    return newSet;
  }

  /**
   * Returns a relative complement of this set with another,
   * i.e. all the items that are in this set, but not in the other.
   * A short hand for relativeComplement.
   */
  complement(otherSet) {
    return this.relativeComplement(otherSet);
  }

  /**
   * Returns a relative complement of this set with another,
   * i.e. all the items that are in this set, but not in the other.
   */
  relativeComplement(otherSet) {
    const newSet = new BetterSet();
    this.forEach(item => {
      if (!otherSet.has(item)) {
        newSet.add(item);
      }
    });
    return newSet;
  }

  /**
   * Returns a symmetric difference, or disjunctive union, of the two sets,
   * i.e. all the items that were not in both sets.
   * Can be thought of as the negative intersection.
   * @deprecated Causes developer confusion.  Currently the symmetric difference,
   * but will be changed to relative complement in a future release.
   */
  difference(otherSet) {
    return this.disjunctiveUnion(otherSet);
  }

  /**
   * Returns a symmetric difference, or disjunctive union, of the two sets,
   * i.e. all the items that were not in both sets.
   * Can be thought of as the negative intersection.
   */
  disjunctiveUnion(otherSet) {
    let newSet = new BetterSet();
    // Union two sets first.
    let union = this.union(otherSet);
    union.forEach(item => {
      // Only add it to the new set if it doesn't exist in both.
      if (!(otherSet.has(item) && this.has(item))) {
        newSet.add(item);
      }
    });
    return newSet;
  }

  /**
   * Returns whether this set and the otherSet contain all the same items and no extras.
   */
  equals(otherSet) {
    if (this === otherSet) {
      return true;
    } else if (
      !(otherSet instanceof BetterSet) ||
      this.size !== otherSet.size
    ) {
      return false;
    } else {
      for (let value of this.values()) {
        if (!otherSet.has(value)) {
          return false;
        }
      }
      return true;
    }
  }

  /**
   * Convenience function turning this into an array.
   */
  asArray() {
    return Array.from(this);
  }

  /**
   * Convenience function acting like Array.prototype.map.
   */
  map(mapFunction, thisArg) {
    return new BetterSet(this.asArray().map(mapFunction, thisArg));
  }

  /**
   * Convenience function acting like Array.prototype.reduce.
   */
  reduce(reduceFunction, initialValue) {
    return this.asArray().reduce(reduceFunction, initialValue);
  }
}
