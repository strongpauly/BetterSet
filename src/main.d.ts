
export default class BetterSet<T> extends Set<T> {
    addAll: (iterable:Iterable<T>) => void;
    deleteAll: () => void;
    union(otherSet:Set<T>): BetterSet<T>
    intersection(otherSet:Set<T>): BetterSet<T>
    complement(otherSet:Set<T>): BetterSet<T>
    difference(otherSet:Set<T>): BetterSet<T>
    equals(otherSet:Set<T>):boolean;
    asArray():T[];
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): BetterSet<U>
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
}