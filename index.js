'use strict';

/*jslint node: true */

/**
 * A set proxy that adds some useful methods that should (IMO) be part of the base spec.
 */
module.exports = (function () {
    var BetterSet = function(iterable) {
        this.internal = new Set(iterable);
    };

    //Methods copied from standard Set object.
    BetterSet.prototype.add = function(item){
        return this.internal.add(item);
    };
    BetterSet.prototype.clear = function() {
        return this.internal.clear();
    };
    BetterSet.prototype.delete = function(item){
        return this.internal.delete(item);
    };
    BetterSet.prototype.entries = function(){
        return this.internal.entries();
    };
    BetterSet.prototype.forEach = function(callback, thisArg){
        return this.internal.forEach(callback, thisArg);
    };
    BetterSet.prototype.has = function(value){
        return this.internal.has(value);
    };
    BetterSet.prototype.values = function(){
        return this.internal.values();
    };
    BetterSet.prototype.keys = function(){
        return this.internal.keys();
    };

    //Properties copied from standard Set object.
    Object.defineProperty(BetterSet.prototype, 'size', {
        get: function() {
            return this.internal.size;
        }
    });


    //New functions;
    /**
     * Add all items in an iterable to this set.
     */
    BetterSet.prototype.addAll = function(iterable) {
        if (!iterable || typeof iterable.forEach !== 'function') {
            return;
        }
        iterable.forEach(item => {
            this.add(item);
        });
    };

    /**
     * Deletes all items from this set.
     */
    BetterSet.prototype.deleteAll = function(iterable) {
        if (!iterable || typeof iterable.forEach !== 'function') {
            return;
        }
        iterable.forEach(item => {
            this.delete(item);
        });
    };

    /**
     * Returns a union of this set with another Set or iterable.
     */
    BetterSet.prototype.union = function(otherSet) {
        var newSet = new BetterSet();
        newSet.addAll(this);
        newSet.addAll(otherSet);
        return newSet;
    };

    /**
     * Returns an intersection of this set with another Set.
     */
    BetterSet.prototype.intersection = function(otherSet) {
        var newSet = new BetterSet();
        this.forEach( item => {
            if (otherSet.has(item)) {
                newSet.add(item);
            }
        });
        return newSet;
    };

    /**
     * Returns a relative complement of this set with another,
     * i.e. all the items that are in this set, but not in the other.
     */
    BetterSet.prototype.complement = function(otherSet) {
        var newSet = new BetterSet();
        this.forEach( item => {
            if (!otherSet.has(item)) {
                newSet.add(item);
            }
        });
        return newSet;
    };

    /**
     * Returns a symmetric difference of the two sets,
     * i.e. all the items that were not in both sets.
     * Can be thought of as the negative intersection.
     */
    BetterSet.prototype.difference = function(otherSet) {
        var newSet = new BetterSet();
        //Union two sets first.
        var union = this.union(otherSet);
        union.forEach( item => {
            //Only add it to the new set if it doesn't exist in both.
            if (!(otherSet.has(item) && this.has(item))) {
                newSet.add(item);
            }
        });
        return newSet;
    };

    /**
     * Convenience function turning this into an array.
     */
    BetterSet.prototype.asArray = function() {
        return Array.from(this.internal);
    };

    /**
     * Convenience function acting like Array.prototype.map.
     */
    BetterSet.prototype.map = function(mapFunction, thisArg) {
        return new BetterSet(this.asArray().map(mapFunction, thisArg));
    };

    /**
     * Convenience function acting like Array.prototype.reduce.
     */
    BetterSet.prototype.reduce = function(reduceFunction, initialValue) {
        return this.asArray().reduce(reduceFunction, initialValue);
    };
    return BetterSet;
}());
