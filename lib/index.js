(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("prop-types")) : factory(root["react"], root["prop-types"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var StoreContainer_1 = __webpack_require__(1);
	exports.StoreContainer = StoreContainer_1.StoreContainer;
	var StoreProvider_1 = __webpack_require__(3);
	exports.StoreProvider = StoreProvider_1.StoreProvider;
	var inject_1 = __webpack_require__(6);
	exports.inject = inject_1.inject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(2);

	var StoreContainer = function () {
	    function StoreContainer() {
	        var stores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var parentStore = arguments[1];

	        _classCallCheck(this, StoreContainer);

	        this.map = new Map(stores);
	        this.map.set(StoreContainer, this);
	        if (parentStore) {
	            this.parentStore = parentStore;
	        }
	    }

	    _createClass(StoreContainer, [{
	        key: "hasInParentStore",
	        value: function hasInParentStore(constructor) {
	            return this.parentStore && this.parentStore.has(constructor);
	        }
	    }, {
	        key: "has",
	        value: function has(constructor) {
	            return this.map.has(constructor) || this.hasInParentStore(constructor);
	        }
	    }, {
	        key: "get",
	        value: function get(constructor) {
	            if (this.hasInParentStore(constructor)) {
	                return this.parentStore.get(constructor);
	            }
	            if (!this.map.has(constructor)) {
	                this.map.set(constructor, this.resolve(constructor));
	            }
	            return this.map.get(constructor);
	        }
	    }, {
	        key: "resolve",
	        value: function resolve(constructor) {
	            var _this = this;

	            var resolvedDependencies = utils_1.resolveDependencies(constructor, this).map(function (dependency) {
	                return _this.get(dependency);
	            });

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            return new (Function.prototype.bind.apply(constructor, [null].concat(_toConsumableArray(resolvedDependencies), args)))();
	        }
	    }]);

	    return StoreContainer;
	}();

	exports.StoreContainer = StoreContainer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var nativeExp = /\{\s*\[native code\]\s*\}/;
	exports.metadataKey = Symbol();
	function resolveDependencies(constructor, container) {
	    var parentDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

	    var argumentPositions = Reflect.getOwnMetadata(exports.metadataKey, constructor) || [];
	    var constructorDependencies = Reflect.getMetadata("design:paramtypes", constructor) || [];
	    var resolvedDependencies = new Array(constructorDependencies.length);
	    parentDependencies.add(constructor);
	    argumentPositions.forEach(function (position) {
	        var dependency = constructorDependencies[position];
	        if (!container.has(dependency)) {
	            detectCircularDependencies(parentDependencies, dependency);
	            resolveDependencies(dependency, container, parentDependencies);
	        }
	        resolvedDependencies[position] = dependency;
	    });
	    parentDependencies.delete(constructor);
	    return resolvedDependencies;
	}
	exports.resolveDependencies = resolveDependencies;
	function isNative(fn) {
	    return nativeExp.test("" + fn);
	}
	function throwError(message, target) {
	    throw new Error(message + "." + (target ? " Error occurred in " + target.name : ""));
	}
	exports.throwError = throwError;
	function detectCircularDependencies(dependencies, constructor) {
	    if (dependencies.has(constructor)) {
	        var chains = Array.from(dependencies.values()).map(function (dependency) {
	            return dependency.name;
	        }).join(" -> ");
	        throwError("Circular dependencies are found in the following chain \"" + chains + "\"");
	    }
	}
	exports.detectCircularDependencies = detectCircularDependencies;
	function checkValidDependency(target, dependency) {
	    if (!dependency || !("constructor" in dependency)) {
	        throwError("Dependency must have a constructor", target);
	    }
	    if (isNative(dependency)) {
	        throwError("Dependency may not be native implementation", target);
	    }
	}
	exports.checkValidDependency = checkValidDependency;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(4);
	var PropTypes = __webpack_require__(5);
	var StoreContainer_1 = __webpack_require__(1);

	var StoreProvider = function (_React$Component) {
	    _inherits(StoreProvider, _React$Component);

	    function StoreProvider() {
	        _classCallCheck(this, StoreProvider);

	        return _possibleConstructorReturn(this, (StoreProvider.__proto__ || Object.getPrototypeOf(StoreProvider)).apply(this, arguments));
	    }

	    _createClass(StoreProvider, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            this.storeContainer = this.props.storeContainer ? this.props.storeContainer : new StoreContainer_1.StoreContainer(this.props.stores, this.context.storeContainer);
	        }
	    }, {
	        key: "getChildContext",
	        value: function getChildContext() {
	            return { storeContainer: this.storeContainer };
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.Children.only(this.props.children);
	        }
	    }]);

	    return StoreProvider;
	}(React.Component);

	StoreProvider.defaultProps = {
	    stores: []
	};
	StoreProvider.contextTypes = {
	    storeContainer: PropTypes.instanceOf(StoreContainer_1.StoreContainer)
	};
	StoreProvider.childContextTypes = {
	    storeContainer: PropTypes.instanceOf(StoreContainer_1.StoreContainer).isRequired
	};
	exports.StoreProvider = StoreProvider;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("prop-types");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(4);
	var PropTypes = __webpack_require__(5);
	var StoreContainer_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(2);
	function propertyDecorator(target, propertyName) {
	    if (!(target instanceof React.Component)) {
	        utils_1.throwError("Injection store can implement only in React.Component", target);
	    }
	    var targetConstructor = target.constructor;
	    var storeConstructor = Reflect.getMetadata("design:type", target, propertyName);
	    utils_1.checkValidDependency(target, storeConstructor);
	    if (targetConstructor.contextTypes == null) {
	        targetConstructor.contextTypes = {};
	    }
	    if (targetConstructor.contextTypes.storeContainer == null) {
	        targetConstructor.contextTypes.storeContainer = PropTypes.instanceOf(StoreContainer_1.StoreContainer).isRequired;
	    }
	    Object.defineProperty(target, propertyName, {
	        get: function get() {
	            return this.context.storeContainer.get(storeConstructor);
	        }
	    });
	}
	function parameterDecorator(target, parameterIndex) {
	    var injectParameters = Reflect.getMetadata(utils_1.metadataKey, target) || [];
	    var parametersTypes = Reflect.getMetadata("design:paramtypes", target);
	    utils_1.checkValidDependency(target, parametersTypes[parameterIndex]);
	    injectParameters.push(parameterIndex);
	    Reflect.defineMetadata(utils_1.metadataKey, injectParameters, target);
	}
	function inject(target, propertyName, propertyIndex) {
	    if (propertyName && propertyIndex === void 0) {
	        return propertyDecorator(target, propertyName);
	    } else if (!propertyName && propertyIndex !== void 0) {
	        return parameterDecorator(target, propertyIndex);
	    }
	    utils_1.throwError("Decorator is to be applied to property in React.Component, or to a store constructor argument", target);
	}
	exports.inject = inject;

/***/ })
/******/ ])
});
;