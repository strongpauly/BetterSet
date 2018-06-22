declare namespace betterset {
    export default class BetterSet<T> extends Set<T> {
        /**
        * Add all items in an iterable to this set.
        */
       addAll: (iterable:Iterable<T>) => void;
       /**
        * Deletes all items from this set.
        */
       deleteAll: () => void;
        /**
        * Returns a union of this set with another Set or iterable.
        */
       union(otherSet:Set<T>): BetterSet<T>
       /**
        * Returns an intersection of this set with another Set.
        */
       intersection(otherSet:Set<T>): BetterSet<T>
        /**
        * Returns a relative complement of this set with another,
        * i.e. all the items that are in this set, but not in the other.
        */
       complement(otherSet:Set<T>): BetterSet<T>
       /**
        * Returns a symmetric difference of the two sets,
        * i.e. all the items that were not in both sets.
        * Can be thought of as the negative intersection.
        */
       difference(otherSet:Set<T>): BetterSet<T>
       equals(otherSet:Set<T>):boolean;
       /**
        * Convenience function turning this into an array.
        */
       asArray():T[];
        /**
        * Convenience function acting like Array.prototype.map.
        */
       map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): BetterSet<U>
       /**
        * Convenience function acting like Array.prototype.reduce.
        */
       reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
   }
}
