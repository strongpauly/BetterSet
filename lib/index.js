"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
var BetterSet = exports["default"] = /*#__PURE__*/function (_extendableBuiltin2) {
  _inherits(BetterSet, _extendableBuiltin2);
  var _super = _createSuper(BetterSet);
  function BetterSet() {
    _classCallCheck(this, BetterSet);
    return _super.apply(this, arguments);
  }
  _createClass(BetterSet, [{
    key: "addAll",
    value:
    /**
     * Add all items in an iterable to this set.
     */
    function addAll(iterable) {
      var _this = this;
      if (!iterable) {
        return;
      }
      if (typeof iterable.forEach === 'function') {
        iterable.forEach(function (item) {
          _this.add(item);
        });
        return;
      }
      if (typeof iterable.next === 'function') {
        var next = iterable.next();
        while (typeof ((_next = next) === null || _next === void 0 ? void 0 : _next.value) !== 'undefined') {
          var _next;
          this.add(next.value);
          next = iterable.next();
        }
      }
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
      var newSet = new BetterSet();
      // Union two sets first.
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
        var _iterator = _createForOfIteratorHelper(this.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value = _step.value;
            if (!otherSet.has(value)) {
              return false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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