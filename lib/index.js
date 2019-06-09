"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

/* jslint node: true */

/**
 * A set proxy that adds some useful methods that should (IMO) be part of the base spec.
 */
var BetterSet =
/*#__PURE__*/
function (_extendableBuiltin2) {
  _inherits(BetterSet, _extendableBuiltin2);

  function BetterSet() {
    _classCallCheck(this, BetterSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(BetterSet).apply(this, arguments));
  }

  _createClass(BetterSet, [{
    key: "addAll",

    /**
     * Add all items in an iterable to this set.
     */
    value: function addAll(iterable) {
      var _this = this;

      if (!iterable || typeof iterable.forEach !== 'function') {
        return;
      }

      iterable.forEach(function (item) {
        _this.add(item);
      });
    }
    /**
     * Deletes all items from this set.
     */

  }, {
    key: "deleteAll",
    value: function deleteAll() {
      var _this2 = this;

      this.forEach(function (item) {
        _this2["delete"](item);
      });
    }
    /**
     * Returns a union of this set with another Set or iterable.
     */

  }, {
    key: "union",
    value: function union(otherSet) {
      var newSet = new BetterSet(this);
      newSet.addAll(otherSet);
      return newSet;
    }
    /**
     * Returns an intersection of this set with another Set.
     */

  }, {
    key: "intersection",
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
     * A short hand for relativeComplement.
     */

  }, {
    key: "complement",
    value: function complement(otherSet) {
      return this.relativeComplement(otherSet);
    }
    /**
     * Returns a relative complement of this set with another,
     * i.e. all the items that are in this set, but not in the other.
     */

  }, {
    key: "relativeComplement",
    value: function relativeComplement(otherSet) {
      var newSet = new BetterSet();
      this.forEach(function (item) {
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

  }, {
    key: "difference",
    value: function difference(otherSet) {
      return this.disjunctiveUnion(otherSet);
    }
    /**
     * Returns a symmetric difference, or disjunctive union, of the two sets,
     * i.e. all the items that were not in both sets.
     * Can be thought of as the negative intersection.
     */

  }, {
    key: "disjunctiveUnion",
    value: function disjunctiveUnion(otherSet) {
      var _this3 = this;

      var newSet = new BetterSet(); // Union two sets first.

      var union = this.union(otherSet);
      union.forEach(function (item) {
        // Only add it to the new set if it doesn't exist in both.
        if (!(otherSet.has(item) && _this3.has(item))) {
          newSet.add(item);
        }
      });
      return newSet;
    }
    /**
     * Returns whether this set and the otherSet contain all the same items and no extras.
     */

  }, {
    key: "equals",
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
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
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
    key: "asArray",
    value: function asArray() {
      return Array.from(this);
    }
    /**
     * Convenience function acting like Array.prototype.map.
     */

  }, {
    key: "map",
    value: function map(mapFunction, thisArg) {
      return new BetterSet(this.asArray().map(mapFunction, thisArg));
    }
    /**
     * Convenience function acting like Array.prototype.reduce.
     */

  }, {
    key: "reduce",
    value: function reduce(reduceFunction, initialValue) {
      return this.asArray().reduce(reduceFunction, initialValue);
    }
  }]);

  return BetterSet;
}(_extendableBuiltin(Set));

exports["default"] = BetterSet;