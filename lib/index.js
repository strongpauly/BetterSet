'use strict';

/* jslint node: true */

/**
 * A set proxy that adds some useful methods that should (IMO) be part of the base spec.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

module.exports = function () {
  var BetterSet = function (_extendableBuiltin2) {
    _inherits(BetterSet, _extendableBuiltin2);

    function BetterSet() {
      _classCallCheck(this, BetterSet);

      return _possibleConstructorReturn(this, (BetterSet.__proto__ || Object.getPrototypeOf(BetterSet)).apply(this, arguments));
    }

    _createClass(BetterSet, [{
      key: 'addAll',


      /**
       * Add all items in an iterable to this set.
       */
      value: function addAll(iterable) {
        var _this2 = this;

        if (!iterable || typeof iterable.forEach !== 'function') {
          return;
        }
        iterable.forEach(function (item) {
          _this2.add(item);
        });
      }

      /**
       * Deletes all items from this set.
       */

    }, {
      key: 'deleteAll',
      value: function deleteAll() {
        var _this3 = this;

        this.forEach(function (item) {
          _this3.delete(item);
        });
      }

      /**
       * Returns a union of this set with another Set or iterable.
       */

    }, {
      key: 'union',
      value: function union(otherSet) {
        var newSet = new BetterSet();
        newSet.addAll(this);
        newSet.addAll(otherSet);
        return newSet;
      }

      /**
       * Returns an intersection of this set with another Set.
       */

    }, {
      key: 'intersection',
      value: function intersection(otherSet) {
        var newSet = new BetterSet();
        this.forEach(function (item) {
          if (otherSet.has(item)) {
            newSet.add(item);
          }
        });
        return newSet;
      }

      /**
       * Returns a relative complement of this set with another,
       * i.e. all the items that are in this set, but not in the other.
       */

    }, {
      key: 'complement',
      value: function complement(otherSet) {
        var newSet = new BetterSet();
        this.forEach(function (item) {
          if (!otherSet.has(item)) {
            newSet.add(item);
          }
        });
        return newSet;
      }

      /**
       * Returns a symmetric difference of the two sets,
       * i.e. all the items that were not in both sets.
       * Can be thought of as the negative intersection.
       */

    }, {
      key: 'difference',
      value: function difference(otherSet) {
        var _this4 = this;

        var newSet = new BetterSet();
        // Union two sets first.
        var union = this.union(otherSet);
        union.forEach(function (item) {
          // Only add it to the new set if it doesn't exist in both.
          if (!(otherSet.has(item) && _this4.has(item))) {
            newSet.add(item);
          }
        });
        return newSet;
      }
    }, {
      key: 'equals',
      value: function equals(otherSet) {
        if (this === otherSet) {
          return true;
        } else if (!(otherSet instanceof BetterSet) || this.size !== otherSet.size) {
          return false;
        } else {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var value = _step.value;

              if (!otherSet.has(value)) {
                return false;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return true;
        }
      }

      /**
       * Convenience function turning this into an array.
       */

    }, {
      key: 'asArray',
      value: function asArray() {
        return Array.from(this);
      }

      /**
       * Convenience function acting like Array.prototype.map.
       */

    }, {
      key: 'map',
      value: function map(mapFunction, thisArg) {
        return new BetterSet(this.asArray().map(mapFunction, thisArg));
      }

      /**
       * Convenience function acting like Array.prototype.reduce.
       */

    }, {
      key: 'reduce',
      value: function reduce(reduceFunction, initialValue) {
        return this.asArray().reduce(reduceFunction, initialValue);
      }
    }]);

    return BetterSet;
  }(_extendableBuiltin(Set));

  return BetterSet;
}();