(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["FamousAnimations"] = factory();
	else
		root["FamousAnimations"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _PropertyAnimator = __webpack_require__(1);
	
	var _Transitionable = __webpack_require__(2);
	
	var _Transitionable2 = _interopRequireWildcard(_Transitionable);
	
	var _Easing = __webpack_require__(4);
	
	var _Easing2 = _interopRequireWildcard(_Easing);
	
	var _debounce$throttle = __webpack_require__(3);
	
	exports.throttle = _debounce$throttle.throttle;
	exports.debounce = _debounce$throttle.debounce;
	exports.PropertyAnimator = _PropertyAnimator.PropertyAnimator;
	exports.Transitionable = _Transitionable2['default'];
	exports.Easing = _Easing2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Transitionable = __webpack_require__(2);
	
	var _Transitionable2 = _interopRequireWildcard(_Transitionable);
	
	var _Easing = __webpack_require__(4);
	
	var _Easing2 = _interopRequireWildcard(_Easing);
	
	var SpringTransition = __webpack_require__(5);
	var WallTransition = __webpack_require__(6);
	var SnapTransition = __webpack_require__(7);
	
	function _ensureValue(v) {
	    var val = parseFloat(v);
	    return isNaN(val) ? 0 : val;
	}
	
	var PropertyAnimator = (function () {
	    function PropertyAnimator(object) {
	        _classCallCheck(this, PropertyAnimator);
	
	        this._wrap = object;
	        this._props = {};
	    }
	
	    _createClass(PropertyAnimator, [{
	        key: 'isActive',
	        value: function isActive() {
	            return this._active;
	        }
	    }, {
	        key: '_findProp',
	        value: function _findProp(prop, cb) {
	            var self = this;
	            var original = prop;
	            prop = prop.split('.');
	            var property = this._wrap[prop[0]];
	            var getter,
	                setter,
	                parent,
	                i = 1;
	            while (true) {
	                if (property[prop[i]] !== undefined) {
	                    parent = property;
	                    property = property[prop[i]];
	                } else {
	                    var index = i - 1;
	                    getter = function () {
	                        return _ensureValue(parent[prop[index]]);
	                    };
	                    setter = function (v) {
	                        return parent[prop[index]] = _ensureValue(v);
	                    };
	                    cb(getter, setter);
	                    break;
	                }
	                i++;
	            }
	        }
	    }, {
	        key: 'animate',
	        value: function animate(prop) {
	            var _this = this;
	
	            this._findProp(prop, function (getter, setter) {
	                _this._props[prop] = {
	                    transitionable: new _Transitionable2['default'](getter()),
	                    get: getter,
	                    set: setter,
	                    _active: false
	                };
	            });
	            var result = this._props[prop];
	
	            // Prepare the listener
	            result.transitionable.update(function (v) {
	                return result.set(v);
	            });
	
	            return result;
	        }
	    }, {
	        key: '_provideAnimation',
	        value: function _provideAnimation(input) {
	            var animation = {};
	            if (input.duration) {
	                animation = {
	                    duration: input.duration,
	                    curve: input.animation ? _Easing2['default'][input.animation] : null
	                };
	            } else {
	                _Transitionable2['default'].registerMethod('spring', SpringTransition);
	                _Transitionable2['default'].registerMethod('wall', WallTransition);
	                _Transitionable2['default'].registerMethod('snap', SnapTransition);
	                Object.keys(input).forEach(function (k) {
	                    return animation[k] = input[k];
	                });
	                // By default setup method to be spring
	                if (!animation.method) animation.method = 'spring';
	            }
	            return animation;
	        }
	    }, {
	        key: 'set',
	        value: function set(prop, value, duration, animation) {
	            // Duration may not be specified if physics based animation
	
	            var physicsBased = typeof duration != 'number';
	            if (physicsBased) animation = duration;
	
	            // Obtain the property
	            var property = this._props[prop];
	            if (!property) {
	                property = this.animate(prop);
	            }
	
	            // Is animation active?
	            if (property._active) this.halt(prop);
	            property._active = true;
	
	            var animation = this._provideAnimation(animation);
	            property.transitionable.val(value, animation, function () {
	                return property._active = false;
	            });
	        }
	    }, {
	        key: 'halt',
	        value: function halt(prop) {
	            var property = this._props[prop];
	            if (property) property.transitionable.halt();
	        }
	    }]);
	
	    return PropertyAnimator;
	})();
	
	exports.PropertyAnimator = PropertyAnimator;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var FamousTransitionable = __webpack_require__(8);
	
	var allowAnimations = false;
	var animationID = null;
	
	var transitionables = [];
	var listeners = [];
	
	function haveAllFinishedAnimating() {
	    return transitionables.map(function (t) {
	        return t._isAnimating;
	    }).reduce(function (final, tIsAnimating) {
	        return final && !tIsAnimating;
	    }, true);
	}
	
	function executeListeners() {
	    for (var ls in listeners) {
	        listeners[ls]();
	    }
	}
	
	function requestCancelation() {
	    if (haveAllFinishedAnimating()) {
	        cancelAnimationFrame(animationID);
	        allowAnimations = false;
	        animationID = null;
	    }
	}
	
	// Setup animation
	function animate() {
	    if (!allowAnimations) {
	        return;
	    }executeListeners();
	    animationID = requestAnimationFrame(animate);
	}
	
	var Transitionable = (function (_FamousTransitionable) {
	    function Transitionable(value) {
	        var _this = this;
	
	        _classCallCheck(this, Transitionable);
	
	        _get(Object.getPrototypeOf(Transitionable.prototype), 'constructor', this).call(this, value);
	
	        // Configure for globals
	        transitionables.push(this);
	        this._listenerFn = function () {
	            return _this._executeListeners();
	        };
	        listeners.push(this._listenerFn);
	
	        this._isAnimating = false;
	    }
	
	    _inherits(Transitionable, _FamousTransitionable);
	
	    _createClass(Transitionable, [{
	        key: 'update',
	        value: function update(fn) {
	            this._listeners = this._listeners || [];
	            this._listeners.push(fn);
	        }
	    }, {
	        key: 'val',
	        value: function val(value, animation, complete) {
	            var self = this;
	
	            // Call the original set
	            self.set(value, animation, function () {
	                // Last time execution
	                if (animationID) {
	                    self._isAnimating = false;
	                }
	
	                requestCancelation();
	
	                if (complete) {
	                    complete();
	                };
	            });
	
	            // Prepare for animation
	            self._isAnimating = true;
	            allowAnimations = true;
	
	            // Request animation start
	            animate();
	        }
	    }, {
	        key: '_executeListeners',
	        value: function _executeListeners() {
	            var _this2 = this;
	
	            // Execute listeners
	            if (this._listeners) {
	                this._listeners.forEach(function (fn) {
	                    return fn(_this2.get());
	                });
	            }
	        }
	    }]);
	
	    return Transitionable;
	})(FamousTransitionable);
	
	module.exports = Transitionable;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	exports.debounce = debounce;
	exports.throttle = throttle;
	
	function debounce(func, wait, immediate) {
	  var timeout;
	  return function () {
	    var context = this,
	        args = arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	}
	
	;
	
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last, deferTimer;
	  return function () {
	    var context = scope || this;
	
	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Easing = {
	    inQuad: function (t) {
	        return t * t;
	    },
	    outQuad: function (t) {
	        return -(t -= 1) * t + 1;
	    },
	    inOutQuad: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t;
	        return -0.5 * (--t * (t - 2) - 1);
	    },
	    inCubic: function (t) {
	        return t * t * t;
	    },
	    outCubic: function (t) {
	        return --t * t * t + 1;
	    },
	    inOutCubic: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t;
	        return 0.5 * ((t -= 2) * t * t + 2);
	    },
	    inQuart: function (t) {
	        return t * t * t * t;
	    },
	    outQuart: function (t) {
	        return -(--t * t * t * t - 1);
	    },
	    inOutQuart: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t * t;
	        return -0.5 * ((t -= 2) * t * t * t - 2);
	    },
	    inQuint: function (t) {
	        return t * t * t * t * t;
	    },
	    outQuint: function (t) {
	        return --t * t * t * t * t + 1;
	    },
	    inOutQuint: function (t) {
	        if ((t /= 0.5) < 1)
	            return 0.5 * t * t * t * t * t;
	        return 0.5 * ((t -= 2) * t * t * t * t + 2);
	    },
	    inSine: function (t) {
	        return -1 * Math.cos(t * (Math.PI / 2)) + 1;
	    },
	    outSine: function (t) {
	        return Math.sin(t * (Math.PI / 2));
	    },
	    inOutSine: function (t) {
	        return -0.5 * (Math.cos(Math.PI * t) - 1);
	    },
	    inExpo: function (t) {
	        return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
	    },
	    outExpo: function (t) {
	        return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
	    },
	    inOutExpo: function (t) {
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if ((t /= 0.5) < 1)
	            return 0.5 * Math.pow(2, 10 * (t - 1));
	        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
	    },
	    inCirc: function (t) {
	        return -(Math.sqrt(1 - t * t) - 1);
	    },
	    outCirc: function (t) {
	        return Math.sqrt(1 - --t * t);
	    },
	    inOutCirc: function (t) {
	        if ((t /= 0.5) < 1)
	            return -0.5 * (Math.sqrt(1 - t * t) - 1);
	        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	    },
	    inElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if (!p)
	            p = 0.3;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	    },
	    outElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if (t === 1)
	            return 1;
	        if (!p)
	            p = 0.3;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
	    },
	    inOutElastic: function (t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t === 0)
	            return 0;
	        if ((t /= 0.5) === 2)
	            return 1;
	        if (!p)
	            p = 0.3 * 1.5;
	        s = p / (2 * Math.PI) * Math.asin(1 / a);
	        if (t < 1)
	            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
	    },
	    inBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        return t * t * ((s + 1) * t - s);
	    },
	    outBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        return --t * t * ((s + 1) * t + s) + 1;
	    },
	    inOutBack: function (t, s) {
	        if (s === undefined)
	            s = 1.70158;
	        if ((t /= 0.5) < 1)
	            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
	        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
	    },
	    inBounce: function (t) {
	        return 1 - Easing.outBounce(1 - t);
	    },
	    outBounce: function (t) {
	        if (t < 1 / 2.75) {
	            return 7.5625 * t * t;
	        } else if (t < 2 / 2.75) {
	            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
	        } else if (t < 2.5 / 2.75) {
	            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
	        } else {
	            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
	        }
	    },
	    inOutBounce: function (t) {
	        if (t < 0.5)
	            return Easing.inBounce(t * 2) * 0.5;
	        return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
	    }
	};
	module.exports = Easing;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var PE = __webpack_require__(9);
	var Particle = __webpack_require__(10);
	var Spring = __webpack_require__(11);
	var Vector = __webpack_require__(12);
	function SpringTransition(state) {
	    state = state || 0;
	    this.endState = new Vector(state);
	    this.initState = new Vector();
	    this._dimensions = undefined;
	    this._restTolerance = 1e-10;
	    this._absRestTolerance = this._restTolerance;
	    this._callback = undefined;
	    this.PE = new PE();
	    this.spring = new Spring({ anchor: this.endState });
	    this.particle = new Particle();
	    this.PE.addBody(this.particle);
	    this.PE.attach(this.spring, this.particle);
	}
	SpringTransition.SUPPORTS_MULTIPLE = 3;
	SpringTransition.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.5,
	    velocity: 0
	};
	function _getEnergy() {
	    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
	}
	function _setParticlePosition(p) {
	    this.particle.setPosition(p);
	}
	function _setParticleVelocity(v) {
	    this.particle.setVelocity(v);
	}
	function _getParticlePosition() {
	    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
	}
	function _getParticleVelocity() {
	    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
	}
	function _setCallback(callback) {
	    this._callback = callback;
	}
	function _wake() {
	    this.PE.wake();
	}
	function _sleep() {
	    this.PE.sleep();
	}
	function _update() {
	    if (this.PE.isSleeping()) {
	        if (this._callback) {
	            var cb = this._callback;
	            this._callback = undefined;
	            cb();
	        }
	        return;
	    }
	    if (_getEnergy.call(this) < this._absRestTolerance) {
	        _setParticlePosition.call(this, this.endState);
	        _setParticleVelocity.call(this, [
	            0,
	            0,
	            0
	        ]);
	        _sleep.call(this);
	    }
	}
	function _setupDefinition(definition) {
	    var defaults = SpringTransition.DEFAULT_OPTIONS;
	    if (definition.period === undefined)
	        definition.period = defaults.period;
	    if (definition.dampingRatio === undefined)
	        definition.dampingRatio = defaults.dampingRatio;
	    if (definition.velocity === undefined)
	        definition.velocity = defaults.velocity;
	    if (definition.period < 150) {
	        definition.period = 150;
	        console.warn('The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions');
	    }
	    this.spring.setOptions({
	        period: definition.period,
	        dampingRatio: definition.dampingRatio
	    });
	    _setParticleVelocity.call(this, definition.velocity);
	}
	function _setAbsoluteRestTolerance() {
	    var distance = this.endState.sub(this.initState).normSquared();
	    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
	}
	function _setTarget(target) {
	    this.endState.set(target);
	    _setAbsoluteRestTolerance.call(this);
	}
	SpringTransition.prototype.reset = function reset(pos, vel) {
	    this._dimensions = pos instanceof Array ? pos.length : 0;
	    this.initState.set(pos);
	    _setParticlePosition.call(this, pos);
	    _setTarget.call(this, pos);
	    if (vel)
	        _setParticleVelocity.call(this, vel);
	    _setCallback.call(this, undefined);
	};
	SpringTransition.prototype.getVelocity = function getVelocity() {
	    return _getParticleVelocity.call(this);
	};
	SpringTransition.prototype.setVelocity = function setVelocity(v) {
	    this.call(this, _setParticleVelocity(v));
	};
	SpringTransition.prototype.isActive = function isActive() {
	    return !this.PE.isSleeping();
	};
	SpringTransition.prototype.halt = function halt() {
	    this.set(this.get());
	};
	SpringTransition.prototype.get = function get() {
	    _update.call(this);
	    return _getParticlePosition.call(this);
	};
	SpringTransition.prototype.set = function set(endState, definition, callback) {
	    if (!definition) {
	        this.reset(endState);
	        if (callback)
	            callback();
	        return;
	    }
	    this._dimensions = endState instanceof Array ? endState.length : 0;
	    _wake.call(this);
	    _setupDefinition.call(this, definition);
	    _setTarget.call(this, endState);
	    _setCallback.call(this, callback);
	};
	module.exports = SpringTransition;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var PE = __webpack_require__(9);
	var Particle = __webpack_require__(10);
	var Spring = __webpack_require__(11);
	var Wall = __webpack_require__(13);
	var Vector = __webpack_require__(12);
	function WallTransition(state) {
	    state = state || 0;
	    this.endState = new Vector(state);
	    this.initState = new Vector();
	    this.spring = new Spring({ anchor: this.endState });
	    this.wall = new Wall();
	    this._restTolerance = 1e-10;
	    this._dimensions = 1;
	    this._absRestTolerance = this._restTolerance;
	    this._callback = undefined;
	    this.PE = new PE();
	    this.particle = new Particle();
	    this.PE.addBody(this.particle);
	    this.PE.attach([
	        this.wall,
	        this.spring
	    ], this.particle);
	}
	WallTransition.SUPPORTS_MULTIPLE = 3;
	WallTransition.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.5,
	    velocity: 0,
	    restitution: 0.5
	};
	function _getEnergy() {
	    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
	}
	function _setAbsoluteRestTolerance() {
	    var distance = this.endState.sub(this.initState).normSquared();
	    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
	}
	function _wake() {
	    this.PE.wake();
	}
	function _sleep() {
	    this.PE.sleep();
	}
	function _setTarget(target) {
	    this.endState.set(target);
	    var dist = this.endState.sub(this.initState).norm();
	    this.wall.setOptions({
	        distance: this.endState.norm(),
	        normal: dist === 0 ? this.particle.velocity.normalize(-1) : this.endState.sub(this.initState).normalize(-1)
	    });
	    _setAbsoluteRestTolerance.call(this);
	}
	function _setParticlePosition(p) {
	    this.particle.position.set(p);
	}
	function _setParticleVelocity(v) {
	    this.particle.velocity.set(v);
	}
	function _getParticlePosition() {
	    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
	}
	function _getParticleVelocity() {
	    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
	}
	function _setCallback(callback) {
	    this._callback = callback;
	}
	function _update() {
	    if (this.PE.isSleeping()) {
	        if (this._callback) {
	            var cb = this._callback;
	            this._callback = undefined;
	            cb();
	        }
	        return;
	    }
	    var energy = _getEnergy.call(this);
	    if (energy < this._absRestTolerance) {
	        _sleep.call(this);
	        _setParticlePosition.call(this, this.endState);
	        _setParticleVelocity.call(this, [
	            0,
	            0,
	            0
	        ]);
	    }
	}
	function _setupDefinition(def) {
	    var defaults = WallTransition.DEFAULT_OPTIONS;
	    if (def.period === undefined)
	        def.period = defaults.period;
	    if (def.dampingRatio === undefined)
	        def.dampingRatio = defaults.dampingRatio;
	    if (def.velocity === undefined)
	        def.velocity = defaults.velocity;
	    if (def.restitution === undefined)
	        def.restitution = defaults.restitution;
	    if (def.drift === undefined)
	        def.drift = Wall.DEFAULT_OPTIONS.drift;
	    if (def.slop === undefined)
	        def.slop = Wall.DEFAULT_OPTIONS.slop;
	    this.spring.setOptions({
	        period: def.period,
	        dampingRatio: def.dampingRatio
	    });
	    this.wall.setOptions({
	        restitution: def.restitution,
	        drift: def.drift,
	        slop: def.slop
	    });
	    _setParticleVelocity.call(this, def.velocity);
	}
	WallTransition.prototype.reset = function reset(state, velocity) {
	    this._dimensions = state instanceof Array ? state.length : 0;
	    this.initState.set(state);
	    _setParticlePosition.call(this, state);
	    if (velocity)
	        _setParticleVelocity.call(this, velocity);
	    _setTarget.call(this, state);
	    _setCallback.call(this, undefined);
	};
	WallTransition.prototype.getVelocity = function getVelocity() {
	    return _getParticleVelocity.call(this);
	};
	WallTransition.prototype.setVelocity = function setVelocity(velocity) {
	    this.call(this, _setParticleVelocity(velocity));
	};
	WallTransition.prototype.isActive = function isActive() {
	    return !this.PE.isSleeping();
	};
	WallTransition.prototype.halt = function halt() {
	    this.set(this.get());
	};
	WallTransition.prototype.get = function get() {
	    _update.call(this);
	    return _getParticlePosition.call(this);
	};
	WallTransition.prototype.set = function set(state, definition, callback) {
	    if (!definition) {
	        this.reset(state);
	        if (callback)
	            callback();
	        return;
	    }
	    this._dimensions = state instanceof Array ? state.length : 0;
	    _wake.call(this);
	    _setupDefinition.call(this, definition);
	    _setTarget.call(this, state);
	    _setCallback.call(this, callback);
	};
	module.exports = WallTransition;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var PE = __webpack_require__(9);
	var Particle = __webpack_require__(10);
	var Spring = __webpack_require__(14);
	var Vector = __webpack_require__(12);
	function SnapTransition(state) {
	    state = state || 0;
	    this.endState = new Vector(state);
	    this.initState = new Vector();
	    this._dimensions = 1;
	    this._restTolerance = 1e-10;
	    this._absRestTolerance = this._restTolerance;
	    this._callback = undefined;
	    this.PE = new PE();
	    this.particle = new Particle();
	    this.spring = new Spring({ anchor: this.endState });
	    this.PE.addBody(this.particle);
	    this.PE.attach(this.spring, this.particle);
	}
	SnapTransition.SUPPORTS_MULTIPLE = 3;
	SnapTransition.DEFAULT_OPTIONS = {
	    period: 100,
	    dampingRatio: 0.2,
	    velocity: 0
	};
	function _getEnergy() {
	    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
	}
	function _setAbsoluteRestTolerance() {
	    var distance = this.endState.sub(this.initState).normSquared();
	    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
	}
	function _setTarget(target) {
	    this.endState.set(target);
	    _setAbsoluteRestTolerance.call(this);
	}
	function _wake() {
	    this.PE.wake();
	}
	function _sleep() {
	    this.PE.sleep();
	}
	function _setParticlePosition(p) {
	    this.particle.position.set(p);
	}
	function _setParticleVelocity(v) {
	    this.particle.velocity.set(v);
	}
	function _getParticlePosition() {
	    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
	}
	function _getParticleVelocity() {
	    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
	}
	function _setCallback(callback) {
	    this._callback = callback;
	}
	function _setupDefinition(definition) {
	    var defaults = SnapTransition.DEFAULT_OPTIONS;
	    if (definition.period === undefined)
	        definition.period = defaults.period;
	    if (definition.dampingRatio === undefined)
	        definition.dampingRatio = defaults.dampingRatio;
	    if (definition.velocity === undefined)
	        definition.velocity = defaults.velocity;
	    this.spring.setOptions({
	        period: definition.period,
	        dampingRatio: definition.dampingRatio
	    });
	    _setParticleVelocity.call(this, definition.velocity);
	}
	function _update() {
	    if (this.PE.isSleeping()) {
	        if (this._callback) {
	            var cb = this._callback;
	            this._callback = undefined;
	            cb();
	        }
	        return;
	    }
	    if (_getEnergy.call(this) < this._absRestTolerance) {
	        _setParticlePosition.call(this, this.endState);
	        _setParticleVelocity.call(this, [
	            0,
	            0,
	            0
	        ]);
	        _sleep.call(this);
	    }
	}
	SnapTransition.prototype.reset = function reset(state, velocity) {
	    this._dimensions = state instanceof Array ? state.length : 0;
	    this.initState.set(state);
	    _setParticlePosition.call(this, state);
	    _setTarget.call(this, state);
	    if (velocity)
	        _setParticleVelocity.call(this, velocity);
	    _setCallback.call(this, undefined);
	};
	SnapTransition.prototype.getVelocity = function getVelocity() {
	    return _getParticleVelocity.call(this);
	};
	SnapTransition.prototype.setVelocity = function setVelocity(velocity) {
	    this.call(this, _setParticleVelocity(velocity));
	};
	SnapTransition.prototype.isActive = function isActive() {
	    return !this.PE.isSleeping();
	};
	SnapTransition.prototype.halt = function halt() {
	    this.set(this.get());
	};
	SnapTransition.prototype.get = function get() {
	    _update.call(this);
	    return _getParticlePosition.call(this);
	};
	SnapTransition.prototype.set = function set(state, definition, callback) {
	    if (!definition) {
	        this.reset(state);
	        if (callback)
	            callback();
	        return;
	    }
	    this._dimensions = state instanceof Array ? state.length : 0;
	    _wake.call(this);
	    _setupDefinition.call(this, definition);
	    _setTarget.call(this, state);
	    _setCallback.call(this, callback);
	};
	module.exports = SnapTransition;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var MultipleTransition = __webpack_require__(15);
	var TweenTransition = __webpack_require__(16);
	function Transitionable(start) {
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	    this.state = 0;
	    this.velocity = undefined;
	    this._callback = undefined;
	    this._engineInstance = null;
	    this._currentMethod = null;
	    this.set(start);
	}
	var transitionMethods = {};
	Transitionable.register = function register(methods) {
	    var success = true;
	    for (var method in methods) {
	        if (!Transitionable.registerMethod(method, methods[method]))
	            success = false;
	    }
	    return success;
	};
	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    } else
	        return false;
	};
	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    } else
	        return false;
	};
	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get());
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();
	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string')
	            method = transitionMethods[method];
	    } else {
	        method = TweenTransition;
	    }
	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        } else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }
	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined)
	        transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback)
	            callback();
	        return this;
	    }
	    var action = [
	        endState,
	        transition
	    ];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction)
	        _loadNext.call(this);
	    return this;
	};
	Transitionable.prototype.reset = function reset(startState, startVelocity) {
	    this._currentMethod = null;
	    this._engineInstance = null;
	    this._callback = undefined;
	    this.state = startState;
	    this.velocity = startVelocity;
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	};
	Transitionable.prototype.delay = function delay(duration, callback) {
	    var endValue;
	    if (this.actionQueue.length)
	        endValue = this.actionQueue[this.actionQueue.length - 1][0];
	    else if (this.currentAction)
	        endValue = this.currentAction[0];
	    else
	        endValue = this.get();
	    return this.set(endValue, {
	        duration: duration,
	        curve: function () {
	            return 0;
	        }
	    }, callback);
	};
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};
	Transitionable.prototype.halt = function halt() {
	    return this.set(this.get());
	};
	module.exports = Transitionable;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(17);
	function PhysicsEngine(options) {
	    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._particles = [];
	    this._bodies = [];
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._buffer = 0;
	    this._prevTime = now();
	    this._isSleeping = false;
	    this._eventHandler = null;
	    this._currAgentId = 0;
	    this._hasBodies = false;
	    this._eventHandler = null;
	}
	var TIMESTEP = 17;
	var MIN_TIME_STEP = 1000 / 120;
	var MAX_TIME_STEP = 17;
	var now = Date.now;
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	PhysicsEngine.DEFAULT_OPTIONS = {
	    constraintSteps: 1,
	    sleepTolerance: 1e-7,
	    velocityCap: undefined,
	    angularVelocityCap: undefined
	};
	PhysicsEngine.prototype.setOptions = function setOptions(opts) {
	    for (var key in opts)
	        if (this.options[key])
	            this.options[key] = opts[key];
	};
	PhysicsEngine.prototype.addBody = function addBody(body) {
	    body._engine = this;
	    if (body.isBody) {
	        this._bodies.push(body);
	        this._hasBodies = true;
	    } else
	        this._particles.push(body);
	    body.on('start', this.wake.bind(this));
	    return body;
	};
	PhysicsEngine.prototype.removeBody = function removeBody(body) {
	    var array = body.isBody ? this._bodies : this._particles;
	    var index = array.indexOf(body);
	    if (index > -1) {
	        for (var agentKey in this._agentData) {
	            if (this._agentData.hasOwnProperty(agentKey)) {
	                this.detachFrom(this._agentData[agentKey].id, body);
	            }
	        }
	        array.splice(index, 1);
	    }
	    if (this.getBodies().length === 0)
	        this._hasBodies = false;
	};
	function _mapAgentArray(agent) {
	    if (agent.applyForce)
	        return this._forces;
	    if (agent.applyConstraint)
	        return this._constraints;
	}
	function _attachOne(agent, targets, source) {
	    if (targets === undefined)
	        targets = this.getParticlesAndBodies();
	    if (!(targets instanceof Array))
	        targets = [targets];
	    agent.on('change', this.wake.bind(this));
	    this._agentData[this._currAgentId] = {
	        agent: agent,
	        id: this._currAgentId,
	        targets: targets,
	        source: source
	    };
	    _mapAgentArray.call(this, agent).push(this._currAgentId);
	    return this._currAgentId++;
	}
	PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
	    this.wake();
	    if (agents instanceof Array) {
	        var agentIDs = [];
	        for (var i = 0; i < agents.length; i++)
	            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
	        return agentIDs;
	    } else
	        return _attachOne.call(this, agents, targets, source);
	};
	PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
	    _getAgentData.call(this, agentID).targets.push(target);
	};
	PhysicsEngine.prototype.detach = function detach(id) {
	    var agent = this.getAgent(id);
	    var agentArray = _mapAgentArray.call(this, agent);
	    var index = agentArray.indexOf(id);
	    agentArray.splice(index, 1);
	    delete this._agentData[id];
	};
	PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
	    var boundAgent = _getAgentData.call(this, id);
	    if (boundAgent.source === target)
	        this.detach(id);
	    else {
	        var targets = boundAgent.targets;
	        var index = targets.indexOf(target);
	        if (index > -1)
	            targets.splice(index, 1);
	    }
	};
	PhysicsEngine.prototype.detachAll = function detachAll() {
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._currAgentId = 0;
	};
	function _getAgentData(id) {
	    return this._agentData[id];
	}
	PhysicsEngine.prototype.getAgent = function getAgent(id) {
	    return _getAgentData.call(this, id).agent;
	};
	PhysicsEngine.prototype.getParticles = function getParticles() {
	    return this._particles;
	};
	PhysicsEngine.prototype.getBodies = function getBodies() {
	    return this._bodies;
	};
	PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
	    return this.getParticles().concat(this.getBodies());
	};
	PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
	    var particles = this.getParticles();
	    for (var index = 0, len = particles.length; index < len; index++)
	        fn.call(this, particles[index], dt);
	};
	PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
	    if (!this._hasBodies)
	        return;
	    var bodies = this.getBodies();
	    for (var index = 0, len = bodies.length; index < len; index++)
	        fn.call(this, bodies[index], dt);
	};
	PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
	    this.forEachParticle(fn, dt);
	    this.forEachBody(fn, dt);
	};
	function _updateForce(index) {
	    var boundAgent = _getAgentData.call(this, this._forces[index]);
	    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
	}
	function _updateForces() {
	    for (var index = this._forces.length - 1; index > -1; index--)
	        _updateForce.call(this, index);
	}
	function _updateConstraint(index, dt) {
	    var boundAgent = this._agentData[this._constraints[index]];
	    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
	}
	function _updateConstraints(dt) {
	    var iteration = 0;
	    while (iteration < this.options.constraintSteps) {
	        for (var index = this._constraints.length - 1; index > -1; index--)
	            _updateConstraint.call(this, index, dt);
	        iteration++;
	    }
	}
	function _updateVelocities(body, dt) {
	    body.integrateVelocity(dt);
	    if (this.options.velocityCap)
	        body.velocity.cap(this.options.velocityCap).put(body.velocity);
	}
	function _updateAngularVelocities(body, dt) {
	    body.integrateAngularMomentum(dt);
	    body.updateAngularVelocity();
	    if (this.options.angularVelocityCap)
	        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
	}
	function _updateOrientations(body, dt) {
	    body.integrateOrientation(dt);
	}
	function _updatePositions(body, dt) {
	    body.integratePosition(dt);
	    body.emit(_events.update, body);
	}
	function _integrate(dt) {
	    _updateForces.call(this, dt);
	    this.forEach(_updateVelocities, dt);
	    this.forEachBody(_updateAngularVelocities, dt);
	    _updateConstraints.call(this, dt);
	    this.forEachBody(_updateOrientations, dt);
	    this.forEach(_updatePositions, dt);
	}
	function _getParticlesEnergy() {
	    var energy = 0;
	    var particleEnergy = 0;
	    this.forEach(function (particle) {
	        particleEnergy = particle.getEnergy();
	        energy += particleEnergy;
	    });
	    return energy;
	}
	function _getAgentsEnergy() {
	    var energy = 0;
	    for (var id in this._agentData)
	        energy += this.getAgentEnergy(id);
	    return energy;
	}
	PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
	    var agentData = _getAgentData.call(this, agentId);
	    return agentData.agent.getEnergy(agentData.targets, agentData.source);
	};
	PhysicsEngine.prototype.getEnergy = function getEnergy() {
	    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
	};
	PhysicsEngine.prototype.step = function step() {
	    if (this.isSleeping())
	        return;
	    var currTime = now();
	    var dtFrame = currTime - this._prevTime;
	    this._prevTime = currTime;
	    if (dtFrame < MIN_TIME_STEP)
	        return;
	    if (dtFrame > MAX_TIME_STEP)
	        dtFrame = MAX_TIME_STEP;
	    _integrate.call(this, TIMESTEP);
	    this.emit(_events.update, this);
	    if (this.getEnergy() < this.options.sleepTolerance)
	        this.sleep();
	};
	PhysicsEngine.prototype.isSleeping = function isSleeping() {
	    return this._isSleeping;
	};
	PhysicsEngine.prototype.isActive = function isSleeping() {
	    return !this._isSleeping;
	};
	PhysicsEngine.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.forEach(function (body) {
	        body.sleep();
	    });
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	PhysicsEngine.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this._prevTime = now();
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	};
	PhysicsEngine.prototype.emit = function emit(type, data) {
	    if (this._eventHandler === null)
	        return;
	    this._eventHandler.emit(type, data);
	};
	PhysicsEngine.prototype.on = function on(event, fn) {
	    if (this._eventHandler === null)
	        this._eventHandler = new EventHandler();
	    this._eventHandler.on(event, fn);
	};
	module.exports = PhysicsEngine;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(12);
	var Transform = __webpack_require__(18);
	var EventHandler = __webpack_require__(17);
	var Integrator = __webpack_require__(19);
	function Particle(options) {
	    options = options || {};
	    var defaults = Particle.DEFAULT_OPTIONS;
	    this.position = new Vector();
	    this.velocity = new Vector();
	    this.force = new Vector();
	    this._engine = null;
	    this._isSleeping = true;
	    this._eventOutput = null;
	    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
	    this.inverseMass = 1 / this.mass;
	    this.setPosition(options.position || defaults.position);
	    this.setVelocity(options.velocity || defaults.velocity);
	    this.force.set(options.force || [
	        0,
	        0,
	        0
	    ]);
	    this.transform = Transform.identity.slice();
	    this._spec = {
	        size: [
	            true,
	            true
	        ],
	        target: {
	            transform: this.transform,
	            origin: [
	                0.5,
	                0.5
	            ],
	            target: null
	        }
	    };
	}
	Particle.DEFAULT_OPTIONS = {
	    position: [
	        0,
	        0,
	        0
	    ],
	    velocity: [
	        0,
	        0,
	        0
	    ],
	    mass: 1
	};
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	var now = Date.now;
	Particle.prototype.isBody = false;
	Particle.prototype.isActive = function isActive() {
	    return !this._isSleeping;
	};
	Particle.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	Particle.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	    this._prevTime = now();
	    if (this._engine)
	        this._engine.wake();
	};
	Particle.prototype.setPosition = function setPosition(position) {
	    this.position.set(position);
	};
	Particle.prototype.setPosition1D = function setPosition1D(x) {
	    this.position.x = x;
	};
	Particle.prototype.getPosition = function getPosition() {
	    this._engine.step();
	    return this.position.get();
	};
	Particle.prototype.getPosition1D = function getPosition1D() {
	    this._engine.step();
	    return this.position.x;
	};
	Particle.prototype.setVelocity = function setVelocity(velocity) {
	    this.velocity.set(velocity);
	    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
	        this.wake();
	};
	Particle.prototype.setVelocity1D = function setVelocity1D(x) {
	    this.velocity.x = x;
	    if (x !== 0)
	        this.wake();
	};
	Particle.prototype.getVelocity = function getVelocity() {
	    return this.velocity.get();
	};
	Particle.prototype.setForce = function setForce(force) {
	    this.force.set(force);
	    this.wake();
	};
	Particle.prototype.getVelocity1D = function getVelocity1D() {
	    return this.velocity.x;
	};
	Particle.prototype.setMass = function setMass(mass) {
	    this.mass = mass;
	    this.inverseMass = 1 / mass;
	};
	Particle.prototype.getMass = function getMass() {
	    return this.mass;
	};
	Particle.prototype.reset = function reset(position, velocity) {
	    this.setPosition(position || [
	        0,
	        0,
	        0
	    ]);
	    this.setVelocity(velocity || [
	        0,
	        0,
	        0
	    ]);
	};
	Particle.prototype.applyForce = function applyForce(force) {
	    if (force.isZero())
	        return;
	    this.force.add(force).put(this.force);
	    this.wake();
	};
	Particle.prototype.applyImpulse = function applyImpulse(impulse) {
	    if (impulse.isZero())
	        return;
	    var velocity = this.velocity;
	    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
	};
	Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
	    Integrator.integrateVelocity(this, dt);
	};
	Particle.prototype.integratePosition = function integratePosition(dt) {
	    Integrator.integratePosition(this, dt);
	};
	Particle.prototype._integrate = function _integrate(dt) {
	    this.integrateVelocity(dt);
	    this.integratePosition(dt);
	};
	Particle.prototype.getEnergy = function getEnergy() {
	    return 0.5 * this.mass * this.velocity.normSquared();
	};
	Particle.prototype.getTransform = function getTransform() {
	    this._engine.step();
	    var position = this.position;
	    var transform = this.transform;
	    transform[12] = position.x;
	    transform[13] = position.y;
	    transform[14] = position.z;
	    return transform;
	};
	Particle.prototype.modify = function modify(target) {
	    var _spec = this._spec.target;
	    _spec.transform = this.getTransform();
	    _spec.target = target;
	    return this._spec;
	};
	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Particle.prototype.emit = function emit(type, data) {
	    if (!this._eventOutput)
	        return;
	    this._eventOutput.emit(type, data);
	};
	Particle.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	Particle.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	Particle.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	Particle.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = Particle;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(20);
	var Vector = __webpack_require__(12);
	function Spring(options) {
	    Force.call(this);
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.disp = new Vector(0, 0, 0);
	    _init.call(this);
	}
	Spring.prototype = Object.create(Force.prototype);
	Spring.prototype.constructor = Spring;
	var pi = Math.PI;
	var MIN_PERIOD = 150;
	Spring.FORCE_FUNCTIONS = {
	    FENE: function (dist, rMax) {
	        var rMaxSmall = rMax * 0.99;
	        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
	        return r / (1 - r * r / (rMax * rMax));
	    },
	    HOOK: function (dist) {
	        return dist;
	    }
	};
	Spring.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.1,
	    length: 0,
	    maxLength: Infinity,
	    anchor: undefined,
	    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
	};
	function _calcStiffness() {
	    var options = this.options;
	    options.stiffness = Math.pow(2 * pi / options.period, 2);
	}
	function _calcDamping() {
	    var options = this.options;
	    options.damping = 4 * pi * options.dampingRatio / options.period;
	}
	function _init() {
	    _calcStiffness.call(this);
	    _calcDamping.call(this);
	}
	Spring.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor.position instanceof Vector)
	            this.options.anchor = options.anchor.position;
	        if (options.anchor instanceof Vector)
	            this.options.anchor = options.anchor;
	        if (options.anchor instanceof Array)
	            this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.period !== undefined) {
	        if (options.period < MIN_PERIOD) {
	            options.period = MIN_PERIOD;
	            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
	        }
	        this.options.period = options.period;
	    }
	    if (options.dampingRatio !== undefined)
	        this.options.dampingRatio = options.dampingRatio;
	    if (options.length !== undefined)
	        this.options.length = options.length;
	    if (options.forceFunction !== undefined)
	        this.options.forceFunction = options.forceFunction;
	    if (options.maxLength !== undefined)
	        this.options.maxLength = options.maxLength;
	    _init.call(this);
	    Force.prototype.setOptions.call(this, options);
	};
	Spring.prototype.applyForce = function applyForce(targets, source) {
	    var force = this.force;
	    var disp = this.disp;
	    var options = this.options;
	    var stiffness = options.stiffness;
	    var damping = options.damping;
	    var restLength = options.length;
	    var maxLength = options.maxLength;
	    var anchor = options.anchor || source.position;
	    var forceFunction = options.forceFunction;
	    var i;
	    var target;
	    var p2;
	    var v2;
	    var dist;
	    var m;
	    for (i = 0; i < targets.length; i++) {
	        target = targets[i];
	        p2 = target.position;
	        v2 = target.velocity;
	        anchor.sub(p2).put(disp);
	        dist = disp.norm() - restLength;
	        if (dist === 0)
	            return;
	        m = target.mass;
	        stiffness *= m;
	        damping *= m;
	        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
	        if (damping)
	            if (source)
	                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
	            else
	                force.add(v2.mult(-damping)).put(force);
	        target.applyForce(force);
	        if (source)
	            source.applyForce(force.mult(-1));
	    }
	};
	Spring.prototype.getEnergy = function getEnergy(targets, source) {
	    var options = this.options;
	    var restLength = options.length;
	    var anchor = source ? source.position : options.anchor;
	    var strength = options.stiffness;
	    var energy = 0;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var dist = anchor.sub(target.position).norm() - restLength;
	        energy += 0.5 * strength * dist * dist;
	    }
	    return energy;
	};
	module.exports = Spring;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function Vector(x, y, z) {
	    if (arguments.length === 1 && x !== undefined)
	        this.set(x);
	    else {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	    }
	    return this;
	}
	var _register = new Vector(0, 0, 0);
	Vector.prototype.add = function add(v) {
	    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
	};
	Vector.prototype.sub = function sub(v) {
	    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
	};
	Vector.prototype.mult = function mult(r) {
	    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
	};
	Vector.prototype.div = function div(r) {
	    return this.mult(1 / r);
	};
	Vector.prototype.cross = function cross(v) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var vx = v.x;
	    var vy = v.y;
	    var vz = v.z;
	    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
	};
	Vector.prototype.equals = function equals(v) {
	    return v.x === this.x && v.y === this.y && v.z === this.z;
	};
	Vector.prototype.rotateX = function rotateX(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
	};
	Vector.prototype.rotateY = function rotateY(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
	};
	Vector.prototype.rotateZ = function rotateZ(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
	};
	Vector.prototype.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	Vector.prototype.normSquared = function normSquared() {
	    return this.dot(this);
	};
	Vector.prototype.norm = function norm() {
	    return Math.sqrt(this.normSquared());
	};
	Vector.prototype.normalize = function normalize(length) {
	    if (arguments.length === 0)
	        length = 1;
	    var norm = this.norm();
	    if (norm > 1e-7)
	        return _setFromVector.call(_register, this.mult(length / norm));
	    else
	        return _setXYZ.call(_register, length, 0, 0);
	};
	Vector.prototype.clone = function clone() {
	    return new Vector(this);
	};
	Vector.prototype.isZero = function isZero() {
	    return !(this.x || this.y || this.z);
	};
	function _setXYZ(x, y, z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	}
	function _setFromArray(v) {
	    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
	}
	function _setFromVector(v) {
	    return _setXYZ.call(this, v.x, v.y, v.z);
	}
	function _setFromNumber(x) {
	    return _setXYZ.call(this, x, 0, 0);
	}
	Vector.prototype.set = function set(v) {
	    if (v instanceof Array)
	        return _setFromArray.call(this, v);
	    if (typeof v === 'number')
	        return _setFromNumber.call(this, v);
	    return _setFromVector.call(this, v);
	};
	Vector.prototype.setXYZ = function (x, y, z) {
	    return _setXYZ.apply(this, arguments);
	};
	Vector.prototype.set1D = function (x) {
	    return _setFromNumber.call(this, x);
	};
	Vector.prototype.put = function put(v) {
	    if (this === _register)
	        _setFromVector.call(v, _register);
	    else
	        _setFromVector.call(v, this);
	};
	Vector.prototype.clear = function clear() {
	    return _setXYZ.call(this, 0, 0, 0);
	};
	Vector.prototype.cap = function cap(cap) {
	    if (cap === Infinity)
	        return _setFromVector.call(_register, this);
	    var norm = this.norm();
	    if (norm > cap)
	        return _setFromVector.call(_register, this.mult(cap / norm));
	    else
	        return _setFromVector.call(_register, this);
	};
	Vector.prototype.project = function project(n) {
	    return n.mult(this.dot(n));
	};
	Vector.prototype.reflectAcross = function reflectAcross(n) {
	    n.normalize().put(n);
	    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
	};
	Vector.prototype.get = function get() {
	    return [
	        this.x,
	        this.y,
	        this.z
	    ];
	};
	Vector.prototype.get1D = function () {
	    return this.x;
	};
	module.exports = Vector;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Constraint = __webpack_require__(21);
	var Vector = __webpack_require__(12);
	function Wall(options) {
	    this.options = Object.create(Wall.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.diff = new Vector();
	    this.impulse = new Vector();
	    Constraint.call(this);
	}
	Wall.prototype = Object.create(Constraint.prototype);
	Wall.prototype.constructor = Wall;
	Wall.ON_CONTACT = {
	    REFLECT: 0,
	    SILENT: 1
	};
	Wall.DEFAULT_OPTIONS = {
	    restitution: 0.5,
	    drift: 0.5,
	    slop: 0,
	    normal: [
	        1,
	        0,
	        0
	    ],
	    distance: 0,
	    onContact: Wall.ON_CONTACT.REFLECT
	};
	Wall.prototype.setOptions = function setOptions(options) {
	    if (options.normal !== undefined) {
	        if (options.normal instanceof Vector)
	            this.options.normal = options.normal.clone();
	        if (options.normal instanceof Array)
	            this.options.normal = new Vector(options.normal);
	    }
	    if (options.restitution !== undefined)
	        this.options.restitution = options.restitution;
	    if (options.drift !== undefined)
	        this.options.drift = options.drift;
	    if (options.slop !== undefined)
	        this.options.slop = options.slop;
	    if (options.distance !== undefined)
	        this.options.distance = options.distance;
	    if (options.onContact !== undefined)
	        this.options.onContact = options.onContact;
	};
	function _getNormalVelocity(n, v) {
	    return v.dot(n);
	}
	function _getDistanceFromOrigin(p) {
	    var n = this.options.normal;
	    var d = this.options.distance;
	    return p.dot(n) + d;
	}
	function _onEnter(particle, overlap, dt) {
	    var p = particle.position;
	    var v = particle.velocity;
	    var m = particle.mass;
	    var n = this.options.normal;
	    var action = this.options.onContact;
	    var restitution = this.options.restitution;
	    var impulse = this.impulse;
	    var drift = this.options.drift;
	    var slop = -this.options.slop;
	    var gamma = 0;
	    if (this._eventOutput) {
	        var data = {
	            particle: particle,
	            wall: this,
	            overlap: overlap,
	            normal: n
	        };
	        this._eventOutput.emit('preCollision', data);
	        this._eventOutput.emit('collision', data);
	    }
	    switch (action) {
	    case Wall.ON_CONTACT.REFLECT:
	        var lambda = overlap < slop ? -((1 + restitution) * n.dot(v) + drift / dt * (overlap - slop)) / (m * dt + gamma) : -((1 + restitution) * n.dot(v)) / (m * dt + gamma);
	        impulse.set(n.mult(dt * lambda));
	        particle.applyImpulse(impulse);
	        particle.setPosition(p.add(n.mult(-overlap)));
	        break;
	    }
	    if (this._eventOutput)
	        this._eventOutput.emit('postCollision', data);
	}
	function _onExit(particle, overlap, dt) {
	    var action = this.options.onContact;
	    var p = particle.position;
	    var n = this.options.normal;
	    if (action === Wall.ON_CONTACT.REFLECT) {
	        particle.setPosition(p.add(n.mult(-overlap)));
	    }
	}
	Wall.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
	    var n = this.options.normal;
	    for (var i = 0; i < targets.length; i++) {
	        var particle = targets[i];
	        var p = particle.position;
	        var v = particle.velocity;
	        var r = particle.radius || 0;
	        var overlap = _getDistanceFromOrigin.call(this, p.add(n.mult(-r)));
	        var nv = _getNormalVelocity.call(this, n, v);
	        if (overlap <= 0) {
	            if (nv < 0)
	                _onEnter.call(this, particle, overlap, dt);
	            else
	                _onExit.call(this, particle, overlap, dt);
	        }
	    }
	};
	module.exports = Wall;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Constraint = __webpack_require__(21);
	var Vector = __webpack_require__(12);
	function Snap(options) {
	    Constraint.call(this);
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.pDiff = new Vector();
	    this.vDiff = new Vector();
	    this.impulse1 = new Vector();
	    this.impulse2 = new Vector();
	}
	Snap.prototype = Object.create(Constraint.prototype);
	Snap.prototype.constructor = Snap;
	Snap.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.1,
	    length: 0,
	    anchor: undefined
	};
	var pi = Math.PI;
	Snap.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor instanceof Vector)
	            this.options.anchor = options.anchor;
	        if (options.anchor.position instanceof Vector)
	            this.options.anchor = options.anchor.position;
	        if (options.anchor instanceof Array)
	            this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.length !== undefined)
	        this.options.length = options.length;
	    if (options.dampingRatio !== undefined)
	        this.options.dampingRatio = options.dampingRatio;
	    if (options.period !== undefined)
	        this.options.period = options.period;
	    Constraint.prototype.setOptions.call(this, options);
	};
	Snap.prototype.getEnergy = function getEnergy(targets, source) {
	    var options = this.options;
	    var restLength = options.length;
	    var anchor = options.anchor || source.position;
	    var strength = Math.pow(2 * pi / options.period, 2);
	    var energy = 0;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var dist = anchor.sub(target.position).norm() - restLength;
	        energy += 0.5 * strength * dist * dist;
	    }
	    return energy;
	};
	Snap.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
	    var options = this.options;
	    var pDiff = this.pDiff;
	    var vDiff = this.vDiff;
	    var impulse1 = this.impulse1;
	    var impulse2 = this.impulse2;
	    var length = options.length;
	    var anchor = options.anchor || source.position;
	    var period = options.period;
	    var dampingRatio = options.dampingRatio;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var p1 = target.position;
	        var v1 = target.velocity;
	        var m1 = target.mass;
	        var w1 = target.inverseMass;
	        pDiff.set(p1.sub(anchor));
	        var dist = pDiff.norm() - length;
	        var effMass;
	        if (source) {
	            var w2 = source.inverseMass;
	            var v2 = source.velocity;
	            vDiff.set(v1.sub(v2));
	            effMass = 1 / (w1 + w2);
	        } else {
	            vDiff.set(v1);
	            effMass = m1;
	        }
	        var gamma;
	        var beta;
	        if (this.options.period === 0) {
	            gamma = 0;
	            beta = 1;
	        } else {
	            var k = 4 * effMass * pi * pi / (period * period);
	            var c = 4 * effMass * pi * dampingRatio / period;
	            beta = dt * k / (c + dt * k);
	            gamma = 1 / (c + dt * k);
	        }
	        var antiDrift = beta / dt * dist;
	        pDiff.normalize(-antiDrift).sub(vDiff).mult(dt / (gamma + dt / effMass)).put(impulse1);
	        target.applyImpulse(impulse1);
	        if (source) {
	            impulse1.mult(-1).put(impulse2);
	            source.applyImpulse(impulse2);
	        }
	    }
	};
	module.exports = Snap;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = __webpack_require__(22);
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}
	MultipleTransition.SUPPORTS_MULTIPLE = true;
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].reset(startState[i]);
	    }
	};
	module.exports = MultipleTransition;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._startTime = 0;
	    this._startValue = 0;
	    this._updateTime = 0;
	    this._endValue = 0;
	    this._curve = undefined;
	    this._duration = 0;
	    this._active = false;
	    this._callback = undefined;
	    this.state = 0;
	    this.velocity = undefined;
	}
	TweenTransition.Curves = {
	    linear: function (t) {
	        return t;
	    },
	    easeIn: function (t) {
	        return t * t;
	    },
	    easeOut: function (t) {
	        return t * (2 - t);
	    },
	    easeInOut: function (t) {
	        if (t <= 0.5)
	            return 2 * t * t;
	        else
	            return -2 * t * t + 4 * t - 1;
	    },
	    easeOutBounce: function (t) {
	        return t * (3 - 2 * t);
	    },
	    spring: function (t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};
	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0
	};
	var registeredCurves = {};
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined)
	        return curve;
	    else
	        throw new Error('curve not registered');
	};
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};
	function _interpolate(a, b, t) {
	    return (1 - t) * a + t * b;
	}
	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array)
	            return obj.slice(0);
	        else
	            return Object.create(obj);
	    } else
	        return obj;
	}
	function _normalize(transition, defaultTransition) {
	    var result = { curve: defaultTransition.curve };
	    if (defaultTransition.duration)
	        result.duration = defaultTransition.duration;
	    if (defaultTransition.speed)
	        result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined)
	            result.duration = transition.duration;
	        if (transition.curve)
	            result.curve = transition.curve;
	        if (transition.speed)
	            result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string')
	        result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined)
	        this.options.curve = options.curve;
	    if (options.duration !== undefined)
	        this.options.duration = options.duration;
	    if (options.speed !== undefined)
	        this.options.speed = options.speed;
	};
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback)
	            callback();
	        return;
	    }
	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue)
	                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        } else {
	            transition.duration = Math.abs(endValue - startValue) / transition.speed;
	        }
	    }
	    this._startTime = Date.now();
	    this._endValue = _clone(endValue);
	    this._startVelocity = _clone(transition.velocity);
	    this._duration = transition.duration;
	    this._curve = transition.curve;
	    this._active = true;
	    this._callback = callback;
	};
	TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    this.state = _clone(startValue);
	    this.velocity = _clone(startVelocity);
	    this._startTime = 0;
	    this._duration = 0;
	    this._updateTime = 0;
	    this._startValue = this.state;
	    this._startVelocity = this.velocity;
	    this._endValue = this.state;
	    this._active = false;
	};
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};
	TweenTransition.prototype.get = function get(timestamp) {
	    this.update(timestamp);
	    return this.state;
	};
	function _calculateVelocity(current, start, curve, duration, t) {
	    var velocity;
	    var eps = 1e-7;
	    var speed = (curve(t) - curve(t - eps)) / eps;
	    if (current instanceof Array) {
	        velocity = [];
	        for (var i = 0; i < current.length; i++) {
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }
	    } else
	        velocity = speed * (current - start) / duration;
	    return velocity;
	}
	function _calculateState(start, end, t) {
	    var state;
	    if (start instanceof Array) {
	        state = [];
	        for (var i = 0; i < start.length; i++) {
	            if (typeof start[i] === 'number')
	                state[i] = _interpolate(start[i], end[i], t);
	            else
	                state[i] = start[i];
	        }
	    } else
	        state = _interpolate(start, end, t);
	    return state;
	}
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }
	    if (!timestamp)
	        timestamp = Date.now();
	    if (this._updateTime >= timestamp)
	        return;
	    this._updateTime = timestamp;
	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    } else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    } else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0;
	    v2 = v2 || 0;
	    return function (t) {
	        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
	    };
	};
	module.exports = TweenTransition;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventEmitter = __webpack_require__(23);
	function EventHandler() {
	    EventEmitter.apply(this, arguments);
	    this.downstream = [];
	    this.downstreamFn = [];
	    this.upstream = [];
	    this.upstreamListeners = {};
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler)
	        handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger)
	            this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};
	EventHandler.prototype.trigger = EventHandler.prototype.emit;
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0)
	        downstreamCtx.push(target);
	    if (target instanceof Function)
	        target('pipe', null);
	    else if (target.trigger)
	        target.trigger('pipe', null);
	    return target;
	};
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function)
	            target('unpipe', null);
	        else if (target.trigger)
	            target.trigger('unpipe', null);
	        return target;
	    } else
	        return false;
	};
	EventHandler.prototype.on = function on(type, handler) {
	    EventEmitter.prototype.on.apply(this, arguments);
	    if (!(type in this.upstreamListeners)) {
	        var upstreamListener = this.trigger.bind(this, type);
	        this.upstreamListeners[type] = upstreamListener;
	        for (var i = 0; i < this.upstream.length; i++) {
	            this.upstream[i].on(type, upstreamListener);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.addListener = EventHandler.prototype.on;
	EventHandler.prototype.subscribe = function subscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index < 0) {
	        this.upstream.push(source);
	        for (var type in this.upstreamListeners) {
	            source.on(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index >= 0) {
	        this.upstream.splice(index, 1);
	        for (var type in this.upstreamListeners) {
	            source.removeListener(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	module.exports = EventHandler;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = {};
	Transform.precision = 0.000001;
	Transform.identity = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1
	];
	Transform.multiply4x4 = function multiply4x4(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	    ];
	};
	Transform.multiply = function multiply(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	        0,
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	        0,
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	        0,
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	        1
	    ];
	};
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2])
	        t[2] = 0;
	    return [
	        m[0],
	        m[1],
	        m[2],
	        0,
	        m[4],
	        m[5],
	        m[6],
	        0,
	        m[8],
	        m[9],
	        m[10],
	        0,
	        m[12] + t[0],
	        m[13] + t[1],
	        m[14] + t[2],
	        1
	    ];
	};
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2])
	        v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined)
	        z = 0;
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        x,
	        y,
	        z,
	        1
	    ];
	};
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0],
	        s[1] * m[1],
	        s[2] * m[2],
	        0,
	        s[0] * m[4],
	        s[1] * m[5],
	        s[2] * m[6],
	        0,
	        s[0] * m[8],
	        s[1] * m[9],
	        s[2] * m[10],
	        0,
	        s[0] * m[12],
	        s[1] * m[13],
	        s[2] * m[14],
	        1
	    ];
	};
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined)
	        z = 1;
	    if (y === undefined)
	        y = x;
	    return [
	        x,
	        0,
	        0,
	        0,
	        0,
	        y,
	        0,
	        0,
	        0,
	        0,
	        z,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        0,
	        -sinTheta,
	        0,
	        0,
	        1,
	        0,
	        0,
	        sinTheta,
	        0,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotate = function rotate(phi, theta, psi) {
	    var cosPhi = Math.cos(phi);
	    var sinPhi = Math.sin(phi);
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    var cosPsi = Math.cos(psi);
	    var sinPsi = Math.sin(psi);
	    var result = [
	        cosTheta * cosPsi,
	        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	        0,
	        -cosTheta * sinPsi,
	        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	        0,
	        sinTheta,
	        -sinPhi * cosTheta,
	        cosPhi * cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta;
	    var xxV = v[0] * v[0] * verTheta;
	    var xyV = v[0] * v[1] * verTheta;
	    var xzV = v[0] * v[2] * verTheta;
	    var yyV = v[1] * v[1] * verTheta;
	    var yzV = v[1] * v[2] * verTheta;
	    var zzV = v[2] * v[2] * verTheta;
	    var xs = v[0] * sinTheta;
	    var ys = v[1] * sinTheta;
	    var zs = v[2] * sinTheta;
	    var result = [
	        xxV + cosTheta,
	        xyV + zs,
	        xzV - ys,
	        0,
	        xyV - zs,
	        yyV + cosTheta,
	        yzV + xs,
	        0,
	        xzV + ys,
	        yzV - xs,
	        zzV + cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.skew = function skew(phi, theta, psi) {
	    return [
	        1,
	        Math.tan(theta),
	        0,
	        0,
	        Math.tan(psi),
	        1,
	        0,
	        0,
	        0,
	        Math.tan(phi),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewX = function skewX(angle) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        Math.tan(angle),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewY = function skewY(angle) {
	    return [
	        1,
	        Math.tan(angle),
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.perspective = function perspective(focusZ) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        -1 / focusZ,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.getTranslate = function getTranslate(m) {
	    return [
	        m[12],
	        m[13],
	        m[14]
	    ];
	};
	Transform.inverse = function inverse(m) {
	    var c0 = m[5] * m[10] - m[6] * m[9];
	    var c1 = m[4] * m[10] - m[6] * m[8];
	    var c2 = m[4] * m[9] - m[5] * m[8];
	    var c4 = m[1] * m[10] - m[2] * m[9];
	    var c5 = m[0] * m[10] - m[2] * m[8];
	    var c6 = m[0] * m[9] - m[1] * m[8];
	    var c8 = m[1] * m[6] - m[2] * m[5];
	    var c9 = m[0] * m[6] - m[2] * m[4];
	    var c10 = m[0] * m[5] - m[1] * m[4];
	    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	    var invD = 1 / detM;
	    var result = [
	        invD * c0,
	        -invD * c4,
	        invD * c8,
	        0,
	        -invD * c1,
	        invD * c5,
	        -invD * c9,
	        0,
	        invD * c2,
	        -invD * c6,
	        invD * c10,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};
	Transform.transpose = function transpose(m) {
	    return [
	        m[0],
	        m[4],
	        m[8],
	        m[12],
	        m[1],
	        m[5],
	        m[9],
	        m[13],
	        m[2],
	        m[6],
	        m[10],
	        m[14],
	        m[3],
	        m[7],
	        m[11],
	        m[15]
	    ];
	};
	function _normSquared(v) {
	    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return n < 0 ? -1 : 1;
	}
	Transform.interpret = function interpret(M) {
	    var x = [
	        M[0],
	        M[1],
	        M[2]
	    ];
	    var sgn = _sign(x[0]);
	    var xNorm = _norm(x);
	    var v = [
	        x[0] + sgn * xNorm,
	        x[1],
	        x[2]
	    ];
	    var mult = 2 / _normSquared(v);
	    if (mult >= Infinity) {
	        return {
	            translate: Transform.getTranslate(M),
	            rotate: [
	                0,
	                0,
	                0
	            ],
	            scale: [
	                0,
	                0,
	                0
	            ],
	            skew: [
	                0,
	                0,
	                0
	            ]
	        };
	    }
	    var Q1 = [
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q1[0] = 1 - mult * v[0] * v[0];
	    Q1[5] = 1 - mult * v[1] * v[1];
	    Q1[10] = 1 - mult * v[2] * v[2];
	    Q1[1] = -mult * v[0] * v[1];
	    Q1[2] = -mult * v[0] * v[2];
	    Q1[6] = -mult * v[1] * v[2];
	    Q1[4] = Q1[1];
	    Q1[8] = Q1[2];
	    Q1[9] = Q1[6];
	    var MQ1 = Transform.multiply(Q1, M);
	    var x2 = [
	        MQ1[5],
	        MQ1[6]
	    ];
	    var sgn2 = _sign(x2[0]);
	    var x2Norm = _norm(x2);
	    var v2 = [
	        x2[0] + sgn2 * x2Norm,
	        x2[1]
	    ];
	    var mult2 = 2 / _normSquared(v2);
	    var Q2 = [
	        1,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q2[5] = 1 - mult2 * v2[0] * v2[0];
	    Q2[10] = 1 - mult2 * v2[1] * v2[1];
	    Q2[6] = -mult2 * v2[0] * v2[1];
	    Q2[9] = Q2[6];
	    var Q = Transform.multiply(Q2, Q1);
	    var R = Transform.multiply(Q, M);
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [
	        Math.atan2(-Q[6], Q[10]),
	        Math.asin(Q[2]),
	        Math.atan2(-Q[1], Q[0])
	    ];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [
	        R[0],
	        R[5],
	        R[10]
	    ];
	    result.skew = [
	        Math.atan2(R[9], result.scale[2]),
	        Math.atan2(R[8], result.scale[2]),
	        Math.atan2(R[4], result.scale[0])
	    ];
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI)
	            result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI)
	            result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0)
	            result.rotate[0] += Math.PI;
	        else
	            result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0)
	            result.rotate[2] += Math.PI;
	        else
	            result.rotate[2] -= Math.PI;
	    }
	    return result;
	};
	Transform.average = function average(M1, M2, t) {
	    t = t === undefined ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);
	    var specAvg = {
	        translate: [
	            0,
	            0,
	            0
	        ],
	        rotate: [
	            0,
	            0,
	            0
	        ],
	        scale: [
	            0,
	            0,
	            0
	        ],
	        skew: [
	            0,
	            0,
	            0
	        ]
	    };
	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b)
	        return false;
	    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};
	Transform.normalizeRotation = function normalizeRotation(rotation) {
	    var result = rotation.slice(0);
	    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	        result[0] = -result[0];
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] > Math.PI * 0.5) {
	        result[0] = result[0] - Math.PI;
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] < -Math.PI * 0.5) {
	        result[0] = result[0] + Math.PI;
	        result[1] = -Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    while (result[1] < -Math.PI)
	        result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI)
	        result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI)
	        result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI)
	        result[2] -= 2 * Math.PI;
	    return result;
	};
	Transform.inFront = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0.001,
	    1
	];
	Transform.behind = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    -0.001,
	    1
	];
	module.exports = Transform;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var SymplecticEuler = {};
	SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
	    var v = body.velocity;
	    var w = body.inverseMass;
	    var f = body.force;
	    if (f.isZero())
	        return;
	    v.add(f.mult(dt * w)).put(v);
	    f.clear();
	};
	SymplecticEuler.integratePosition = function integratePosition(body, dt) {
	    var p = body.position;
	    var v = body.velocity;
	    p.add(v.mult(dt)).put(p);
	};
	SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
	    var L = body.angularMomentum;
	    var t = body.torque;
	    if (t.isZero())
	        return;
	    L.add(t.mult(dt)).put(L);
	    t.clear();
	};
	SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
	    var q = body.orientation;
	    var w = body.angularVelocity;
	    if (w.isZero())
	        return;
	    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
	};
	module.exports = SymplecticEuler;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(12);
	var EventHandler = __webpack_require__(17);
	function Force(force) {
	    this.force = new Vector(force);
	    this._eventOutput = new EventHandler();
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Force.prototype.setOptions = function setOptions(options) {
	    this._eventOutput.emit('change', options);
	};
	Force.prototype.applyForce = function applyForce(targets) {
	    var length = targets.length;
	    while (length--) {
	        targets[length].applyForce(this.force);
	    }
	};
	Force.prototype.getEnergy = function getEnergy() {
	    return 0;
	};
	module.exports = Force;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(17);
	function Constraint() {
	    this.options = this.options || {};
	    this._eventOutput = new EventHandler();
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Constraint.prototype.setOptions = function setOptions(options) {
	    this._eventOutput.emit('change', options);
	};
	Constraint.prototype.applyConstraint = function applyConstraint() {
	};
	Constraint.prototype.getEnergy = function getEnergy() {
	    return 0;
	};
	module.exports = Constraint;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = {};
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function () {
	        counter--;
	        if (counter === 0)
	            callback.apply(this, arguments);
	    };
	};
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback)
	                callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes())
	        result.appendChild(element.firstChild);
	    return result;
	};
	Utility.clone = function clone(b) {
	    var a;
	    if (typeof b === 'object') {
	        a = b instanceof Array ? [] : {};
	        for (var key in b) {
	            if (typeof b[key] === 'object' && b[key] !== null) {
	                if (b[key] instanceof Array) {
	                    a[key] = new Array(b[key].length);
	                    for (var i = 0; i < b[key].length; i++) {
	                        a[key][i] = Utility.clone(b[key][i]);
	                    }
	                } else {
	                    a[key] = Utility.clone(b[key]);
	                }
	            } else {
	                a[key] = b[key];
	            }
	        }
	    } else {
	        a = b;
	    }
	    return a;
	};
	module.exports = Utility;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};
	EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners))
	        this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0)
	        this.listeners[type].push(handler);
	    return this;
	};
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var listener = this.listeners[type];
	    if (listener !== undefined) {
	        var index = listener.indexOf(handler);
	        if (index >= 0)
	            listener.splice(index, 1);
	    }
	    return this;
	};
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};
	module.exports = EventEmitter;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZmYxMDJjYmFiZDNkZDE4N2M0NiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9FYXNpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nLmpzIiwid2VicGFjazovLy8uL34vZmFtb3VzL21hdGgvVmVjdG9yLmpzIiwid2VicGFjazovLy8uL34vZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvTXVsdGlwbGVUcmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL34vZmFtb3VzL3RyYW5zaXRpb25zL1R3ZWVuVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9jb3JlL1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Gb3JjZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL0NvbnN0cmFpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvY29yZS9FdmVudEVtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7NkNDdEMrQixDQUFZOzsyQ0FDaEIsQ0FBa0I7Ozs7bUNBQzFCLENBQTJCOzs7OzhDQUNiLENBQWlCOztTQUk5QyxRQUFRLHNCQUpNLFFBQVE7U0FLdEIsUUFBUSxzQkFMSixRQUFRO1NBTVosZ0JBQWdCLHFCQVRaLGdCQUFnQjtTQVVwQixjQUFjO1NBQ2QsTUFBTSx1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQ1hpQixDQUFrQjs7OzttQ0FDMUIsQ0FBMkI7Ozs7QUFFOUMsS0FBSSxnQkFBZ0IsR0FBRyxtQkFBTyxDQUFDLENBQXFDLENBQUMsQ0FBQztBQUN0RSxLQUFJLGNBQWMsR0FBRyxtQkFBTyxDQUFDLENBQW1DLENBQUMsQ0FBQztBQUNsRSxLQUFJLGNBQWMsR0FBRyxtQkFBTyxDQUFDLENBQW1DLENBQUMsQ0FBQzs7QUFFbEUsVUFBUyxZQUFZLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLFNBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixZQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQy9COztLQUVLLGdCQUFnQjtBQUNQLGNBRFQsZ0JBQWdCLENBQ04sTUFBTSxFQUFFOytCQURsQixnQkFBZ0I7O0FBRWQsYUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDcEIsYUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7TUFDcEI7O2tCQUpDLGdCQUFnQjs7Z0JBTVYsb0JBQUc7QUFDUCxvQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1VBQ3ZCOzs7Z0JBRVEsbUJBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNoQixpQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGlCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsaUJBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLGlCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLGlCQUFJLE1BQU07aUJBQUUsTUFBTTtpQkFBRSxNQUFNO2lCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsb0JBQU0sSUFBSSxFQUFFO0FBQ1IscUJBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNqQywyQkFBTSxHQUFHLFFBQVEsQ0FBQztBQUNsQiw2QkFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFDaEMsTUFBTTtBQUNILHlCQUFJLEtBQUssR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ2hCLDJCQUFNLEdBQUc7Z0NBQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztzQkFBQSxDQUFDO0FBQ2pELDJCQUFNLEdBQUcsV0FBQztnQ0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztzQkFBQSxDQUFDO0FBQ3BELHVCQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztBQUNsQiwyQkFBTTtrQkFDVDtBQUNELGtCQUFDLEVBQUUsQ0FBQztjQUNQO1VBQ0o7OztnQkFFTSxpQkFBQyxJQUFJLEVBQUU7OztBQUNWLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUs7QUFDckMsdUJBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO0FBQ2hCLG1DQUFjLEVBQUUsZ0NBQW1CLE1BQU0sRUFBRSxDQUFDO0FBQzVDLHdCQUFHLEVBQUUsTUFBTTtBQUNYLHdCQUFHLEVBQUUsTUFBTTtBQUNYLDRCQUFPLEVBQUUsS0FBSztrQkFDakIsQ0FBQztjQUNMLENBQUM7QUFDRixpQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBRy9CLG1CQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFDO3dCQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2NBQUEsQ0FBQyxDQUFDOztBQUVqRCxvQkFBTyxNQUFNLENBQUM7VUFDakI7OztnQkFFZ0IsMkJBQUMsS0FBSyxFQUFFO0FBQ3JCLGlCQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIsaUJBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNoQiwwQkFBUyxHQUFHO0FBQ1IsNkJBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtBQUN4QiwwQkFBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLEdBQ2xCLG9CQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJO2tCQUNyQztjQUNKLE1BQU07QUFDSCw2Q0FBZSxjQUFjLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDMUQsNkNBQWUsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN0RCw2Q0FBZSxjQUFjLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3RELHVCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFDOzRCQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2tCQUFBLENBQUMsQ0FBQzs7QUFFekQscUJBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO2NBQ3REO0FBQ0Qsb0JBQU8sU0FBUyxDQUFDO1VBQ3BCOzs7Z0JBRUUsYUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7OztBQUVsQyxpQkFBSSxZQUFZLEdBQUcsT0FBTyxRQUFRLElBQUksUUFBUSxDQUFDO0FBQy9DLGlCQUFJLFlBQVksRUFBRSxTQUFTLEdBQUcsUUFBUSxDQUFDOzs7QUFHdkMsaUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsaUJBQUksQ0FBQyxRQUFRLEVBQUU7QUFDWCx5QkFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Y0FDakM7OztBQUdELGlCQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxxQkFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O0FBRXhCLGlCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEQscUJBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7d0JBQU0sUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLO2NBQUEsQ0FBQyxDQUFDO1VBQ2pGOzs7Z0JBRUcsY0FBQyxJQUFJLEVBQUU7QUFDUCxpQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxpQkFBSSxRQUFRLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztVQUNoRDs7O1lBekZDLGdCQUFnQjs7O1NBNkZsQixnQkFBZ0IsR0FBaEIsZ0JBQWdCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6R3BCLEtBQUksb0JBQW9CLEdBQUcsbUJBQU8sQ0FBQyxDQUFtQyxDQUFDLENBQUM7O0FBRXhFLEtBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUM1QixLQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7O0FBRXZCLEtBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixLQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLFVBQVMsd0JBQXdCLEdBQUc7QUFDaEMsWUFBTyxlQUFlLENBQ2IsR0FBRyxDQUFDLFdBQUM7Z0JBQUksQ0FBQyxDQUFDLFlBQVk7TUFBQSxDQUFDLENBQ3hCLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxZQUFZO2dCQUFLLEtBQUssSUFBSSxDQUFDLFlBQVk7TUFBQSxFQUFFLElBQUksQ0FBQztFQUN6RTs7QUFFRCxVQUFTLGdCQUFnQixHQUFHO0FBQ3hCLFVBQUssSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFO0FBQ3RCLGtCQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7TUFDbEI7RUFDSjs7QUFFRCxVQUFTLGtCQUFrQixHQUFHO0FBQzFCLFNBQUksd0JBQXdCLEVBQUUsRUFBRTtBQUM1Qiw2QkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyx3QkFBZSxHQUFHLEtBQUssQ0FBQztBQUN4QixvQkFBVyxHQUFHLElBQUksQ0FBQztNQUN0QjtFQUNKOzs7QUFHRCxVQUFTLE9BQU8sR0FBRztBQUNmLFNBQUksQ0FBQyxlQUFlO0FBQUUsZ0JBQU07TUFDNUIsZ0JBQWdCLEVBQUUsQ0FBQztBQUNuQixnQkFBVyxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQ2hEOztLQUdLLGNBQWM7QUFDTCxjQURULGNBQWMsQ0FDSixLQUFLLEVBQUU7OzsrQkFEakIsY0FBYzs7QUFFWixvQ0FGRixjQUFjLDZDQUVOLEtBQUssRUFBQzs7O0FBR1osd0JBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsYUFBSSxDQUFDLFdBQVcsR0FBRztvQkFBTSxNQUFLLGlCQUFpQixFQUFFO1VBQUEsQ0FBQztBQUNsRCxrQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWpDLGFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO01BQzdCOztlQVZDLGNBQWM7O2tCQUFkLGNBQWM7O2dCQVdWLGdCQUFDLEVBQUUsRUFBRTtBQUNQLGlCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQ3hDLGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUM1Qjs7O2dCQUNFLGFBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDNUIsaUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7O0FBR2hCLGlCQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBVzs7QUFFcEMscUJBQUksV0FBVyxFQUFFO0FBQ2IseUJBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2tCQUM3Qjs7QUFFRCxtQ0FBa0IsRUFBRSxDQUFDOztBQUVyQixxQkFBSSxRQUFRLEVBQUU7QUFDViw2QkFBUSxFQUFFLENBQUM7a0JBQ2QsQ0FBQztjQUNILENBQUMsQ0FBQzs7O0FBR0gsaUJBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLDRCQUFlLEdBQUcsSUFBSSxDQUFDOzs7QUFHdkIsb0JBQU8sRUFBRSxDQUFDO1VBQ2I7OztnQkFFZ0IsNkJBQUc7Ozs7QUFFaEIsaUJBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixxQkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUUsWUFBRTs0QkFBSSxFQUFFLENBQUMsT0FBSyxHQUFHLEVBQUUsQ0FBQztrQkFBQSxDQUFFO2NBQ2hEO1VBQ0o7OztZQTdDQyxjQUFjO0lBQVMsb0JBQW9COztBQWdEakQsT0FBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLEM7Ozs7Ozs7Ozs7Ozs7OztTQ2hGZixRQUFRLEdBQVIsUUFBUTtTQWVSLFFBQVEsR0FBUixRQUFROztBQWZqQixVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUMvQyxPQUFJLE9BQU8sQ0FBQztBQUNaLFVBQU8sWUFBVztBQUNqQixTQUFJLE9BQU8sR0FBRyxJQUFJO1NBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQyxTQUFJLEtBQUssR0FBRyxpQkFBVztBQUN0QixjQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztNQUMxQyxDQUFDO0FBQ0YsU0FBSSxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3BDLGlCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsWUFBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEMsU0FBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztFQUNGOztBQUFBLEVBQUM7O0FBRUssVUFBUyxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7QUFDOUMsYUFBVSxLQUFLLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNqQyxPQUFJLElBQUksRUFDSixVQUFVLENBQUM7QUFDZixVQUFPLFlBQVk7QUFDakIsU0FBSSxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQzs7QUFFNUIsU0FBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUk7U0FDZixJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3JCLFNBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsVUFBVSxFQUFFOztBQUVuQyxtQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pCLGlCQUFVLEdBQUcsVUFBVSxDQUFDLFlBQVk7QUFDbEMsYUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNYLFdBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsVUFBVSxDQUFDLENBQUM7TUFDaEIsTUFBTTtBQUNMLFdBQUksR0FBRyxHQUFHLENBQUM7QUFDWCxTQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN6QjtJQUNGLENBQUM7Ozs7Ozs7QUN2Q0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCOzs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4Qix3QkFBd0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHdCQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7OztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsd0JBQXdCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLGFBQWE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLGFBQWE7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxZQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxZQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkI7Ozs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUI7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qjs7Ozs7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUI7Ozs7OztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qjs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLDhCQUE4QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQjs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCOzs7Ozs7QUMvckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qjs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCIiwiZmlsZSI6IkZhbW91c0FuaW1hdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkZhbW91c0FuaW1hdGlvbnNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRmFtb3VzQW5pbWF0aW9uc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOWZmMTAyY2JhYmQzZGQxODdjNDZcbiAqKi8iLCJpbXBvcnQge1Byb3BlcnR5QW5pbWF0b3J9IGZyb20gJy4vYW5pbWF0b3InO1xuaW1wb3J0IFRyYW5zaXRpb25hYmxlIGZyb20gJy4vdHJhbnNpdGlvbmFibGUnO1xuaW1wb3J0IEVhc2luZyBmcm9tICdmYW1vdXMvdHJhbnNpdGlvbnMvRWFzaW5nJztcbmltcG9ydCB7ZGVib3VuY2UsIHRocm90dGxlfSBmcm9tICcuL3V0aWwvZGVib3VuY2UnO1xuXG5cbmV4cG9ydCB7XG4gICAgdGhyb3R0bGUsXG4gICAgZGVib3VuY2UsXG4gICAgUHJvcGVydHlBbmltYXRvcixcbiAgICBUcmFuc2l0aW9uYWJsZSxcbiAgICBFYXNpbmdcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IFRyYW5zaXRpb25hYmxlIGZyb20gJy4vdHJhbnNpdGlvbmFibGUnO1xuaW1wb3J0IEVhc2luZyBmcm9tICdmYW1vdXMvdHJhbnNpdGlvbnMvRWFzaW5nJztcblxudmFyIFNwcmluZ1RyYW5zaXRpb24gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbicpO1xudmFyIFdhbGxUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1dhbGxUcmFuc2l0aW9uJyk7XG52YXIgU25hcFRyYW5zaXRpb24gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvU25hcFRyYW5zaXRpb24nKTtcblxuZnVuY3Rpb24gX2Vuc3VyZVZhbHVlKHYpIHtcbiAgICB2YXIgdmFsID0gcGFyc2VGbG9hdCh2KTtcbiAgICByZXR1cm4gaXNOYU4odmFsKSA/IDAgOiB2YWw7XG59XG5cbmNsYXNzIFByb3BlcnR5QW5pbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICB0aGlzLl93cmFwID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9wcm9wcyA9IHt9O1xuICAgIH1cblxuICAgIGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICAgIH1cblxuICAgIF9maW5kUHJvcChwcm9wLCBjYikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBvcmlnaW5hbCA9IHByb3A7XG4gICAgICAgIHByb3AgPSBwcm9wLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuX3dyYXBbcHJvcFswXV07XG4gICAgICAgIHZhciBnZXR0ZXIsIHNldHRlciwgcGFyZW50LCBpID0gMTtcbiAgICAgICAgd2hpbGUodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5W3Byb3BbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5W3Byb3BbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpLTE7XG4gICAgICAgICAgICAgICAgZ2V0dGVyID0gKCkgPT4gX2Vuc3VyZVZhbHVlKHBhcmVudFtwcm9wW2luZGV4XV0pO1xuICAgICAgICAgICAgICAgIHNldHRlciA9IHYgPT4gcGFyZW50W3Byb3BbaW5kZXhdXSA9IF9lbnN1cmVWYWx1ZSh2KTtcbiAgICAgICAgICAgICAgICBjYihnZXR0ZXIsIHNldHRlcilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUocHJvcCkge1xuICAgICAgICB0aGlzLl9maW5kUHJvcChwcm9wLCAoZ2V0dGVyLCBzZXR0ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3BzW3Byb3BdID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25hYmxlOiBuZXcgVHJhbnNpdGlvbmFibGUoZ2V0dGVyKCkpLFxuICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICAgICAgICAgIF9hY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcHJvcHNbcHJvcF07XG5cbiAgICAgICAgLy8gUHJlcGFyZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgcmVzdWx0LnRyYW5zaXRpb25hYmxlLnVwZGF0ZSh2ID0+IHJlc3VsdC5zZXQodikpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgX3Byb3ZpZGVBbmltYXRpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHt9O1xuICAgICAgICBpZiAoaW5wdXQuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW5wdXQuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgY3VydmU6IGlucHV0LmFuaW1hdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgIEVhc2luZ1tpbnB1dC5hbmltYXRpb25dIDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QoJ3NwcmluZycsIFNwcmluZ1RyYW5zaXRpb24pO1xuICAgICAgICAgICAgVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QoJ3dhbGwnLCBXYWxsVHJhbnNpdGlvbik7XG4gICAgICAgICAgICBUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCgnc25hcCcsIFNuYXBUcmFuc2l0aW9uKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGlucHV0KS5mb3JFYWNoKGsgPT4gYW5pbWF0aW9uW2tdID0gaW5wdXRba10pO1xuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCBzZXR1cCBtZXRob2QgdG8gYmUgc3ByaW5nXG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbi5tZXRob2QpIGFuaW1hdGlvbi5tZXRob2QgPSBcInNwcmluZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmltYXRpb247XG4gICAgfVxuXG4gICAgc2V0KHByb3AsIHZhbHVlLCBkdXJhdGlvbiwgYW5pbWF0aW9uKSB7IC8vIER1cmF0aW9uIG1heSBub3QgYmUgc3BlY2lmaWVkIGlmIHBoeXNpY3MgYmFzZWQgYW5pbWF0aW9uXG5cbiAgICAgICAgdmFyIHBoeXNpY3NCYXNlZCA9IHR5cGVvZiBkdXJhdGlvbiAhPSBcIm51bWJlclwiO1xuICAgICAgICBpZiAocGh5c2ljc0Jhc2VkKSBhbmltYXRpb24gPSBkdXJhdGlvbjtcblxuICAgICAgICAvLyBPYnRhaW4gdGhlIHByb3BlcnR5XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BzW3Byb3BdO1xuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHRoaXMuYW5pbWF0ZShwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGFuaW1hdGlvbiBhY3RpdmU/XG4gICAgICAgIGlmIChwcm9wZXJ0eS5fYWN0aXZlKSB0aGlzLmhhbHQocHJvcCk7XG4gICAgICAgIHByb3BlcnR5Ll9hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLl9wcm92aWRlQW5pbWF0aW9uKGFuaW1hdGlvbik7XG4gICAgICAgIHByb3BlcnR5LnRyYW5zaXRpb25hYmxlLnZhbCh2YWx1ZSwgYW5pbWF0aW9uLCAoKSA9PiBwcm9wZXJ0eS5fYWN0aXZlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIGhhbHQocHJvcCkge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wc1twcm9wXTtcbiAgICAgICAgaWYgKHByb3BlcnR5KSBwcm9wZXJ0eS50cmFuc2l0aW9uYWJsZS5oYWx0KCk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIFByb3BlcnR5QW5pbWF0b3Jcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FuaW1hdG9yLmpzXG4gKiovIiwidmFyIEZhbW91c1RyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5cbnZhciBhbGxvd0FuaW1hdGlvbnMgPSBmYWxzZTtcbnZhciBhbmltYXRpb25JRCA9IG51bGw7XG5cbnZhciB0cmFuc2l0aW9uYWJsZXMgPSBbXTtcbnZhciBsaXN0ZW5lcnMgPSBbXTtcblxuZnVuY3Rpb24gaGF2ZUFsbEZpbmlzaGVkQW5pbWF0aW5nKCkge1xuICAgIHJldHVybiB0cmFuc2l0aW9uYWJsZXNcbiAgICAgICAgICAgIC5tYXAodCA9PiB0Ll9pc0FuaW1hdGluZylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGZpbmFsLCB0SXNBbmltYXRpbmcpID0+IGZpbmFsICYmICF0SXNBbmltYXRpbmcsIHRydWUpXG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgbHMgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgIGxpc3RlbmVyc1tsc10oKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVxdWVzdENhbmNlbGF0aW9uKCkge1xuICAgIGlmIChoYXZlQWxsRmluaXNoZWRBbmltYXRpbmcoKSkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25JRCk7XG4gICAgICAgIGFsbG93QW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgICAgICBhbmltYXRpb25JRCA9IG51bGw7XG4gICAgfVxufVxuXG4vLyBTZXR1cCBhbmltYXRpb25cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgaWYgKCFhbGxvd0FuaW1hdGlvbnMpIHJldHVyblxuICAgIGV4ZWN1dGVMaXN0ZW5lcnMoKTtcbiAgICBhbmltYXRpb25JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cblxuXG5jbGFzcyBUcmFuc2l0aW9uYWJsZSBleHRlbmRzIEZhbW91c1RyYW5zaXRpb25hYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcih2YWx1ZSlcblxuICAgICAgICAvLyBDb25maWd1cmUgZm9yIGdsb2JhbHNcbiAgICAgICAgdHJhbnNpdGlvbmFibGVzLnB1c2godGhpcyk7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyRm4gPSAoKSA9PiB0aGlzLl9leGVjdXRlTGlzdGVuZXJzKCk7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKHRoaXMuX2xpc3RlbmVyRm4pO1xuXG4gICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHVwZGF0ZShmbikge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGZuKTtcbiAgICB9XG4gICAgdmFsKHZhbHVlLCBhbmltYXRpb24sIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBDYWxsIHRoZSBvcmlnaW5hbCBzZXRcbiAgICAgICAgc2VsZi5zZXQodmFsdWUsIGFuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gTGFzdCB0aW1lIGV4ZWN1dGlvblxuICAgICAgICAgIGlmIChhbmltYXRpb25JRCkge1xuICAgICAgICAgICAgICBzZWxmLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3RDYW5jZWxhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBmb3IgYW5pbWF0aW9uXG4gICAgICAgIHNlbGYuX2lzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgYWxsb3dBbmltYXRpb25zID0gdHJ1ZTtcblxuICAgICAgICAvLyBSZXF1ZXN0IGFuaW1hdGlvbiBzdGFydFxuICAgICAgICBhbmltYXRlKCk7XG4gICAgfVxuXG4gICAgX2V4ZWN1dGVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIEV4ZWN1dGUgbGlzdGVuZXJzXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCggZm4gPT4gZm4odGhpcy5nZXQoKSkgKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHJhbnNpdGlvbmFibGUuanNcbiAqKi8iLCIvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4vLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbi8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG5cdHZhciB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHR9O1xuXHRcdHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdFx0aWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XG4gIHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xuICB2YXIgbGFzdCxcbiAgICAgIGRlZmVyVGltZXI7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRleHQgPSBzY29wZSB8fCB0aGlzO1xuXG4gICAgdmFyIG5vdyA9ICtuZXcgRGF0ZSxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xuICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0ID0gbm93O1xuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kZWJvdW5jZS5qc1xuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBFYXNpbmcgPSB7XG4gICAgaW5RdWFkOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgfSxcbiAgICBvdXRRdWFkOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gLSh0IC09IDEpICogdCArIDE7XG4gICAgfSxcbiAgICBpbk91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiB0ICogdDtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoLS10ICogKHQgLSAyKSAtIDEpO1xuICAgIH0sXG4gICAgaW5DdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogdDtcbiAgICB9LFxuICAgIG91dEN1YmljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xuICAgIH0sXG4gICAgaW5PdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdDtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICsgMik7XG4gICAgfSxcbiAgICBpblF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdDtcbiAgICB9LFxuICAgIG91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gLSgtLXQgKiB0ICogdCAqIHQgLSAxKTtcbiAgICB9LFxuICAgIGluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICByZXR1cm4gLTAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xuICAgIH0sXG4gICAgaW5RdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgIH0sXG4gICAgb3V0UXVpbnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAtLXQgKiB0ICogdCAqIHQgKiB0ICsgMTtcbiAgICB9LFxuICAgIGluT3V0UXVpbnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiB0ICogdCAqIHQgKiB0ICogdDtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKTtcbiAgICB9LFxuICAgIGluU2luZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIC0xICogTWF0aC5jb3ModCAqIChNYXRoLlBJIC8gMikpICsgMTtcbiAgICB9LFxuICAgIG91dFNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNpbih0ICogKE1hdGguUEkgLyAyKSk7XG4gICAgfSxcbiAgICBpbk91dFNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB0KSAtIDEpO1xuICAgIH0sXG4gICAgaW5FeHBvOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgIH0sXG4gICAgb3V0RXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMTtcbiAgICB9LFxuICAgIGluT3V0RXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKHQgPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKTtcbiAgICB9LFxuICAgIGluQ2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcbiAgICB9LFxuICAgIG91dENpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIC0tdCAqIHQpO1xuICAgIH0sXG4gICAgaW5PdXRDaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpO1xuICAgIH0sXG4gICAgaW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICBpZiAoIXApXG4gICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oMSAvIGEpO1xuICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICB9LFxuICAgIG91dEVsYXN0aWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICB2YXIgYSA9IDE7XG4gICAgICAgIGlmICh0ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIGlmICghcClcbiAgICAgICAgICAgIHAgPSAwLjM7XG4gICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMTtcbiAgICB9LFxuICAgIGluT3V0RWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPT09IDIpXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgaWYgKCFwKVxuICAgICAgICAgICAgcCA9IDAuMyAqIDEuNTtcbiAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgaWYgKHQgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSk7XG4gICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIDAuNSArIDE7XG4gICAgfSxcbiAgICBpbkJhY2s6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XG4gICAgfSxcbiAgICBvdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiAtLXQgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxO1xuICAgIH0sXG4gICAgaW5PdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKTtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMik7XG4gICAgfSxcbiAgICBpbkJvdW5jZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIDEgLSBFYXNpbmcub3V0Qm91bmNlKDEgLSB0KTtcbiAgICB9LFxuICAgIG91dEJvdW5jZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHQgKiB0O1xuICAgICAgICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIDAuNzU7XG4gICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgMC45Mzc1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA8IDAuNSlcbiAgICAgICAgICAgIHJldHVybiBFYXNpbmcuaW5Cb3VuY2UodCAqIDIpICogMC41O1xuICAgICAgICByZXR1cm4gRWFzaW5nLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVhc2luZztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvRWFzaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFBFID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCcuLi9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZScpO1xudmFyIFNwcmluZyA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvZm9yY2VzL1NwcmluZycpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTcHJpbmdUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Jlc3RUb2xlcmFuY2UgPSAxZS0xMDtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gdGhpcy5fcmVzdFRvbGVyYW5jZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLlBFID0gbmV3IFBFKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuU3ByaW5nVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5TcHJpbmdUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuNSxcbiAgICB2ZWxvY2l0eTogMFxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnNldFBvc2l0aW9uKHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUuc2V0VmVsb2NpdHkodik7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24xRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKSA6IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkoKTtcbn1cbmZ1bmN0aW9uIF9zZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IGRlZmF1bHRzLnBlcmlvZDtcbiAgICBpZiAoZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZmluaXRpb24udmVsb2NpdHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA8IDE1MCkge1xuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IDE1MDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgMTUwIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgfVxuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZmluaXRpb24ucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZmluaXRpb24uZGFtcGluZ1JhdGlvXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWZpbml0aW9uLnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlLmNhbGwodGhpcyk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHBvcywgdmVsKSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHBvcyBpbnN0YW5jZW9mIEFycmF5ID8gcG9zLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHBvcyk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBwb3MpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBwb3MpO1xuICAgIGlmICh2ZWwpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBlbmRTdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gZW5kU3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgZW5kU3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwcmluZ1RyYW5zaXRpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3RyYW5zaXRpb25zL1NwcmluZ1RyYW5zaXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgV2FsbCA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxsVHJhbnNpdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgMDtcbiAgICB0aGlzLmVuZFN0YXRlID0gbmV3IFZlY3RvcihzdGF0ZSk7XG4gICAgdGhpcy5pbml0U3RhdGUgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMud2FsbCA9IG5ldyBXYWxsKCk7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSAxO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5QRS5hZGRCb2R5KHRoaXMucGFydGljbGUpO1xuICAgIHRoaXMuUEUuYXR0YWNoKFtcbiAgICAgICAgdGhpcy53YWxsLFxuICAgICAgICB0aGlzLnNwcmluZ1xuICAgIF0sIHRoaXMucGFydGljbGUpO1xufVxuV2FsbFRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSAzO1xuV2FsbFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC41LFxuICAgIHZlbG9jaXR5OiAwLFxuICAgIHJlc3RpdHV0aW9uOiAwLjVcbn07XG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KFt0aGlzLnBhcnRpY2xlXSk7XG59XG5mdW5jdGlvbiBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlKCkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtU3F1YXJlZCgpO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSBkaXN0YW5jZSA9PT0gMCA/IHRoaXMuX3Jlc3RUb2xlcmFuY2UgOiB0aGlzLl9yZXN0VG9sZXJhbmNlICogZGlzdGFuY2U7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfc2V0VGFyZ2V0KHRhcmdldCkge1xuICAgIHRoaXMuZW5kU3RhdGUuc2V0KHRhcmdldCk7XG4gICAgdmFyIGRpc3QgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybSgpO1xuICAgIHRoaXMud2FsbC5zZXRPcHRpb25zKHtcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuZW5kU3RhdGUubm9ybSgpLFxuICAgICAgICBub3JtYWw6IGRpc3QgPT09IDAgPyB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5Lm5vcm1hbGl6ZSgtMSkgOiB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybWFsaXplKC0xKVxuICAgIH0pO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZW5lcmd5ID0gX2dldEVuZXJneS5jYWxsKHRoaXMpO1xuICAgIGlmIChlbmVyZ3kgPCB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlKSB7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfc2V0dXBEZWZpbml0aW9uKGRlZikge1xuICAgIHZhciBkZWZhdWx0cyA9IFdhbGxUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWYuZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYudmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICBpZiAoZGVmLnJlc3RpdHV0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5yZXN0aXR1dGlvbiA9IGRlZmF1bHRzLnJlc3RpdHV0aW9uO1xuICAgIGlmIChkZWYuZHJpZnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLmRyaWZ0ID0gV2FsbC5ERUZBVUxUX09QVElPTlMuZHJpZnQ7XG4gICAgaWYgKGRlZi5zbG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5zbG9wID0gV2FsbC5ERUZBVUxUX09QVElPTlMuc2xvcDtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiBkZWYucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICB0aGlzLndhbGwuc2V0T3B0aW9ucyh7XG4gICAgICAgIHJlc3RpdHV0aW9uOiBkZWYucmVzdGl0dXRpb24sXG4gICAgICAgIGRyaWZ0OiBkZWYuZHJpZnQsXG4gICAgICAgIHNsb3A6IGRlZi5zbG9wXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWYudmVsb2NpdHkpO1xufVxuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhdGUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIHRoaXMuaW5pdFN0YXRlLnNldChzdGF0ZSk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgaWYgKHZlbG9jaXR5KVxuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIHZlbG9jaXR5KTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodmVsb2NpdHkpKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuUEUuaXNTbGVlcGluZygpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHN0YXRlLCBkZWZpbml0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KHN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgX3dha2UuY2FsbCh0aGlzKTtcbiAgICBfc2V0dXBEZWZpbml0aW9uLmNhbGwodGhpcywgZGVmaW5pdGlvbik7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsVHJhbnNpdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvV2FsbFRyYW5zaXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNuYXBUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gMTtcbiAgICB0aGlzLl9yZXN0VG9sZXJhbmNlID0gMWUtMTA7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IHRoaXMuX3Jlc3RUb2xlcmFuY2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5QRSA9IG5ldyBQRSgpO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy5QRS5hZGRCb2R5KHRoaXMucGFydGljbGUpO1xuICAgIHRoaXMuUEUuYXR0YWNoKHRoaXMuc3ByaW5nLCB0aGlzLnBhcnRpY2xlKTtcbn1cblNuYXBUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gMztcblNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDEwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMixcbiAgICB2ZWxvY2l0eTogMFxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlLmNhbGwodGhpcyk7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVQb3NpdGlvbihwKSB7XG4gICAgdGhpcy5wYXJ0aWNsZS5wb3NpdGlvbi5zZXQocCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5wYXJ0aWNsZS52ZWxvY2l0eS5zZXQodik7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24xRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKSA6IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkoKTtcbn1cbmZ1bmN0aW9uIF9zZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5mdW5jdGlvbiBfc2V0dXBEZWZpbml0aW9uKGRlZmluaXRpb24pIHtcbiAgICB2YXIgZGVmYXVsdHMgPSBTbmFwVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlM7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmaW5pdGlvbi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnZlbG9jaXR5ID0gZGVmYXVsdHMudmVsb2NpdHk7XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmaW5pdGlvbi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5QRS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2IgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfZ2V0RW5lcmd5LmNhbGwodGhpcykgPCB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlKSB7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgdGhpcy5lbmRTdGF0ZSk7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0pO1xuICAgICAgICBfc2xlZXAuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGF0ZSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHN0YXRlKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIGlmICh2ZWxvY2l0eSlcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWxvY2l0eSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMuY2FsbCh0aGlzLCBfc2V0UGFydGljbGVWZWxvY2l0eSh2ZWxvY2l0eSkpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoc3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoc3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNuYXBUcmFuc2l0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBNdWx0aXBsZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL011bHRpcGxlVHJhbnNpdGlvbicpO1xudmFyIFR3ZWVuVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vVHdlZW5UcmFuc2l0aW9uJyk7XG5mdW5jdGlvbiBUcmFuc2l0aW9uYWJsZShzdGFydCkge1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuc2V0KHN0YXJ0KTtcbn1cbnZhciB0cmFuc2l0aW9uTWV0aG9kcyA9IHt9O1xuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihtZXRob2RzKSB7XG4gICAgdmFyIHN1Y2Nlc3MgPSB0cnVlO1xuICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgIGlmICghVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QobWV0aG9kLCBtZXRob2RzW21ldGhvZF0pKVxuICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc3VjY2Vzcztcbn07XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCA9IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kKG5hbWUsIGVuZ2luZUNsYXNzKSB7XG4gICAgaWYgKCEobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykpIHtcbiAgICAgICAgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV0gPSBlbmdpbmVDbGFzcztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5UcmFuc2l0aW9uYWJsZS51bnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gdW5yZWdpc3Rlck1ldGhvZChuYW1lKSB7XG4gICAgaWYgKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zaXRpb25NZXRob2RzW25hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9sb2FkTmV4dCgpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSB0aGlzLmFjdGlvblF1ZXVlLnNoaWZ0KCk7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrUXVldWUuc2hpZnQoKTtcbiAgICB2YXIgbWV0aG9kID0gbnVsbDtcbiAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLmN1cnJlbnRBY3Rpb25bMF07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmN1cnJlbnRBY3Rpb25bMV07XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QgJiYgdHJhbnNpdGlvbi5tZXRob2QpIHtcbiAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbi5tZXRob2Q7XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIG1ldGhvZCA9IHRyYW5zaXRpb25NZXRob2RzW21ldGhvZF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kID0gVHdlZW5UcmFuc2l0aW9uO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY3VycmVudE1ldGhvZCAhPT0gbWV0aG9kKSB7XG4gICAgICAgIGlmICghKGVuZFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUgPT09IHRydWUgfHwgZW5kVmFsdWUubGVuZ3RoIDw9IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSkge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgbWV0aG9kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5yZXNldCh0aGlzLnN0YXRlLCB0aGlzLnZlbG9jaXR5KTtcbiAgICBpZiAodGhpcy52ZWxvY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0cmFuc2l0aW9uLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5zZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIF9sb2FkTmV4dC5iaW5kKHRoaXMpKTtcbn1cblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIGFjdGlvbiA9IFtcbiAgICAgICAgZW5kU3RhdGUsXG4gICAgICAgIHRyYW5zaXRpb25cbiAgICBdO1xuICAgIHRoaXMuYWN0aW9uUXVldWUucHVzaChhY3Rpb24pO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudEFjdGlvbilcbiAgICAgICAgX2xvYWROZXh0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gc3RhcnRTdGF0ZTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gc3RhcnRWZWxvY2l0eTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiBkZWxheShkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgZW5kVmFsdWU7XG4gICAgaWYgKHRoaXMuYWN0aW9uUXVldWUubGVuZ3RoKVxuICAgICAgICBlbmRWYWx1ZSA9IHRoaXMuYWN0aW9uUXVldWVbdGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggLSAxXVswXTtcbiAgICBlbHNlIGlmICh0aGlzLmN1cnJlbnRBY3Rpb24pXG4gICAgICAgIGVuZFZhbHVlID0gdGhpcy5jdXJyZW50QWN0aW9uWzBdO1xuICAgIGVsc2VcbiAgICAgICAgZW5kVmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIHJldHVybiB0aGlzLnNldChlbmRWYWx1ZSwge1xuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGN1cnZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sIGNhbGxiYWNrKTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZSkge1xuICAgICAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkpXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldCh0aW1lc3RhbXApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRBY3Rpb247XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHJldHVybiB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gUGh5c2ljc0VuZ2luZShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShQaHlzaWNzRW5naW5lLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLl9ib2RpZXMgPSBbXTtcbiAgICB0aGlzLl9hZ2VudERhdGEgPSB7fTtcbiAgICB0aGlzLl9mb3JjZXMgPSBbXTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyA9IFtdO1xuICAgIHRoaXMuX2J1ZmZlciA9IDA7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyQWdlbnRJZCA9IDA7XG4gICAgdGhpcy5faGFzQm9kaWVzID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbnVsbDtcbn1cbnZhciBUSU1FU1RFUCA9IDE3O1xudmFyIE1JTl9USU1FX1NURVAgPSAxMDAwIC8gMTIwO1xudmFyIE1BWF9USU1FX1NURVAgPSAxNztcbnZhciBub3cgPSBEYXRlLm5vdztcbnZhciBfZXZlbnRzID0ge1xuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgZW5kOiAnZW5kJ1xufTtcblBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGNvbnN0cmFpbnRTdGVwczogMSxcbiAgICBzbGVlcFRvbGVyYW5jZTogMWUtNyxcbiAgICB2ZWxvY2l0eUNhcDogdW5kZWZpbmVkLFxuICAgIGFuZ3VsYXJWZWxvY2l0eUNhcDogdW5kZWZpbmVkXG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0cykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zW2tleV0pXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hZGRCb2R5ID0gZnVuY3Rpb24gYWRkQm9keShib2R5KSB7XG4gICAgYm9keS5fZW5naW5lID0gdGhpcztcbiAgICBpZiAoYm9keS5pc0JvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9kaWVzLnB1c2goYm9keSk7XG4gICAgICAgIHRoaXMuX2hhc0JvZGllcyA9IHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHRoaXMuX3BhcnRpY2xlcy5wdXNoKGJvZHkpO1xuICAgIGJvZHkub24oJ3N0YXJ0JywgdGhpcy53YWtlLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBib2R5O1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnJlbW92ZUJvZHkgPSBmdW5jdGlvbiByZW1vdmVCb2R5KGJvZHkpIHtcbiAgICB2YXIgYXJyYXkgPSBib2R5LmlzQm9keSA/IHRoaXMuX2JvZGllcyA6IHRoaXMuX3BhcnRpY2xlcztcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGJvZHkpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGZvciAodmFyIGFnZW50S2V5IGluIHRoaXMuX2FnZW50RGF0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FnZW50RGF0YS5oYXNPd25Qcm9wZXJ0eShhZ2VudEtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFjaEZyb20odGhpcy5fYWdlbnREYXRhW2FnZW50S2V5XS5pZCwgYm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Qm9kaWVzKCkubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLl9oYXNCb2RpZXMgPSBmYWxzZTtcbn07XG5mdW5jdGlvbiBfbWFwQWdlbnRBcnJheShhZ2VudCkge1xuICAgIGlmIChhZ2VudC5hcHBseUZvcmNlKVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9yY2VzO1xuICAgIGlmIChhZ2VudC5hcHBseUNvbnN0cmFpbnQpXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbn1cbmZ1bmN0aW9uIF9hdHRhY2hPbmUoYWdlbnQsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIGlmICh0YXJnZXRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRhcmdldHMgPSB0aGlzLmdldFBhcnRpY2xlc0FuZEJvZGllcygpO1xuICAgIGlmICghKHRhcmdldHMgaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICAgIHRhcmdldHMgPSBbdGFyZ2V0c107XG4gICAgYWdlbnQub24oJ2NoYW5nZScsIHRoaXMud2FrZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9hZ2VudERhdGFbdGhpcy5fY3VyckFnZW50SWRdID0ge1xuICAgICAgICBhZ2VudDogYWdlbnQsXG4gICAgICAgIGlkOiB0aGlzLl9jdXJyQWdlbnRJZCxcbiAgICAgICAgdGFyZ2V0czogdGFyZ2V0cyxcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICB9O1xuICAgIF9tYXBBZ2VudEFycmF5LmNhbGwodGhpcywgYWdlbnQpLnB1c2godGhpcy5fY3VyckFnZW50SWQpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyQWdlbnRJZCsrO1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gYXR0YWNoKGFnZW50cywgdGFyZ2V0cywgc291cmNlKSB7XG4gICAgdGhpcy53YWtlKCk7XG4gICAgaWYgKGFnZW50cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhciBhZ2VudElEcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGFnZW50SURzW2ldID0gX2F0dGFjaE9uZS5jYWxsKHRoaXMsIGFnZW50c1tpXSwgdGFyZ2V0cywgc291cmNlKTtcbiAgICAgICAgcmV0dXJuIGFnZW50SURzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gX2F0dGFjaE9uZS5jYWxsKHRoaXMsIGFnZW50cywgdGFyZ2V0cywgc291cmNlKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hdHRhY2hUbyA9IGZ1bmN0aW9uIGF0dGFjaFRvKGFnZW50SUQsIHRhcmdldCkge1xuICAgIF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBhZ2VudElEKS50YXJnZXRzLnB1c2godGFyZ2V0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiBkZXRhY2goaWQpIHtcbiAgICB2YXIgYWdlbnQgPSB0aGlzLmdldEFnZW50KGlkKTtcbiAgICB2YXIgYWdlbnRBcnJheSA9IF9tYXBBZ2VudEFycmF5LmNhbGwodGhpcywgYWdlbnQpO1xuICAgIHZhciBpbmRleCA9IGFnZW50QXJyYXkuaW5kZXhPZihpZCk7XG4gICAgYWdlbnRBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRlbGV0ZSB0aGlzLl9hZ2VudERhdGFbaWRdO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaEZyb20gPSBmdW5jdGlvbiBkZXRhY2hGcm9tKGlkLCB0YXJnZXQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBpZCk7XG4gICAgaWYgKGJvdW5kQWdlbnQuc291cmNlID09PSB0YXJnZXQpXG4gICAgICAgIHRoaXMuZGV0YWNoKGlkKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRhcmdldHMgPSBib3VuZEFnZW50LnRhcmdldHM7XG4gICAgICAgIHZhciBpbmRleCA9IHRhcmdldHMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgICAgICAgIHRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoQWxsID0gZnVuY3Rpb24gZGV0YWNoQWxsKCkge1xuICAgIHRoaXMuX2FnZW50RGF0YSA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gW107XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xufTtcbmZ1bmN0aW9uIF9nZXRBZ2VudERhdGEoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fYWdlbnREYXRhW2lkXTtcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEFnZW50ID0gZnVuY3Rpb24gZ2V0QWdlbnQoaWQpIHtcbiAgICByZXR1cm4gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGlkKS5hZ2VudDtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnRpY2xlcztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRCb2RpZXMgPSBmdW5jdGlvbiBnZXRCb2RpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvZGllcztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFydGljbGVzKCkuY29uY2F0KHRoaXMuZ2V0Qm9kaWVzKCkpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hQYXJ0aWNsZSA9IGZ1bmN0aW9uIGZvckVhY2hQYXJ0aWNsZShmbiwgZHQpIHtcbiAgICB2YXIgcGFydGljbGVzID0gdGhpcy5nZXRQYXJ0aWNsZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IHBhcnRpY2xlcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIHBhcnRpY2xlc1tpbmRleF0sIGR0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoQm9keSA9IGZ1bmN0aW9uIGZvckVhY2hCb2R5KGZuLCBkdCkge1xuICAgIGlmICghdGhpcy5faGFzQm9kaWVzKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGJvZGllcyA9IHRoaXMuZ2V0Qm9kaWVzKCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW4gPSBib2RpZXMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKylcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBib2RpZXNbaW5kZXhdLCBkdCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4sIGR0KSB7XG4gICAgdGhpcy5mb3JFYWNoUGFydGljbGUoZm4sIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KGZuLCBkdCk7XG59O1xuZnVuY3Rpb24gX3VwZGF0ZUZvcmNlKGluZGV4KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgdGhpcy5fZm9yY2VzW2luZGV4XSk7XG4gICAgYm91bmRBZ2VudC5hZ2VudC5hcHBseUZvcmNlKGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUZvcmNlcygpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2ZvcmNlcy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICBfdXBkYXRlRm9yY2UuY2FsbCh0aGlzLCBpbmRleCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludChpbmRleCwgZHQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IHRoaXMuX2FnZW50RGF0YVt0aGlzLl9jb25zdHJhaW50c1tpbmRleF1dO1xuICAgIHJldHVybiBib3VuZEFnZW50LmFnZW50LmFwcGx5Q29uc3RyYWludChib3VuZEFnZW50LnRhcmdldHMsIGJvdW5kQWdlbnQuc291cmNlLCBkdCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludHMoZHQpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgICB3aGlsZSAoaXRlcmF0aW9uIDwgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRTdGVwcykge1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2NvbnN0cmFpbnRzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgICAgICBfdXBkYXRlQ29uc3RyYWludC5jYWxsKHRoaXMsIGluZGV4LCBkdCk7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF91cGRhdGVWZWxvY2l0aWVzKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcClcbiAgICAgICAgYm9keS52ZWxvY2l0eS5jYXAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKS5wdXQoYm9keS52ZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShkdCk7XG4gICAgYm9keS51cGRhdGVBbmd1bGFyVmVsb2NpdHkoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuZ3VsYXJWZWxvY2l0eUNhcClcbiAgICAgICAgYm9keS5hbmd1bGFyVmVsb2NpdHkuY2FwKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApLnB1dChib2R5LmFuZ3VsYXJWZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlT3JpZW50YXRpb25zKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVPcmllbnRhdGlvbihkdCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlUG9zaXRpb25zKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG4gICAgYm9keS5lbWl0KF9ldmVudHMudXBkYXRlLCBib2R5KTtcbn1cbmZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICBfdXBkYXRlRm9yY2VzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlVmVsb2NpdGllcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZUFuZ3VsYXJWZWxvY2l0aWVzLCBkdCk7XG4gICAgX3VwZGF0ZUNvbnN0cmFpbnRzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZU9yaWVudGF0aW9ucywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlUG9zaXRpb25zLCBkdCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVzRW5lcmd5KCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIHZhciBwYXJ0aWNsZUVuZXJneSA9IDA7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZSkge1xuICAgICAgICBwYXJ0aWNsZUVuZXJneSA9IHBhcnRpY2xlLmdldEVuZXJneSgpO1xuICAgICAgICBlbmVyZ3kgKz0gcGFydGljbGVFbmVyZ3k7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cbmZ1bmN0aW9uIF9nZXRBZ2VudHNFbmVyZ3koKSB7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fYWdlbnREYXRhKVxuICAgICAgICBlbmVyZ3kgKz0gdGhpcy5nZXRBZ2VudEVuZXJneShpZCk7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEFnZW50RW5lcmd5ID0gZnVuY3Rpb24gKGFnZW50SWQpIHtcbiAgICB2YXIgYWdlbnREYXRhID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGFnZW50SWQpO1xuICAgIHJldHVybiBhZ2VudERhdGEuYWdlbnQuZ2V0RW5lcmd5KGFnZW50RGF0YS50YXJnZXRzLCBhZ2VudERhdGEuc291cmNlKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZXNFbmVyZ3kuY2FsbCh0aGlzKSArIF9nZXRBZ2VudHNFbmVyZ3kuY2FsbCh0aGlzKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCgpIHtcbiAgICBpZiAodGhpcy5pc1NsZWVwaW5nKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgY3VyclRpbWUgPSBub3coKTtcbiAgICB2YXIgZHRGcmFtZSA9IGN1cnJUaW1lIC0gdGhpcy5fcHJldlRpbWU7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICBpZiAoZHRGcmFtZSA8IE1JTl9USU1FX1NURVApXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZHRGcmFtZSA+IE1BWF9USU1FX1NURVApXG4gICAgICAgIGR0RnJhbWUgPSBNQVhfVElNRV9TVEVQO1xuICAgIF9pbnRlZ3JhdGUuY2FsbCh0aGlzLCBUSU1FU1RFUCk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMudXBkYXRlLCB0aGlzKTtcbiAgICBpZiAodGhpcy5nZXRFbmVyZ3koKSA8IHRoaXMub3B0aW9ucy5zbGVlcFRvbGVyYW5jZSlcbiAgICAgICAgdGhpcy5zbGVlcCgpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmlzU2xlZXBpbmcgPSBmdW5jdGlvbiBpc1NsZWVwaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNTbGVlcGluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuX2lzU2xlZXBpbmc7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICBib2R5LnNsZWVwKCk7XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS53YWtlID0gZnVuY3Rpb24gd2FrZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU2xlZXBpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuZW1pdCh0eXBlLCBkYXRhKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbikge1xuICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIgPT09IG51bGwpXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIub24oZXZlbnQsIGZuKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NFbmdpbmU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3BoeXNpY3MvUGh5c2ljc0VuZ2luZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBJbnRlZ3JhdG9yID0gcmVxdWlyZSgnLi4vaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyJyk7XG5mdW5jdGlvbiBQYXJ0aWNsZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGRlZmF1bHRzID0gUGFydGljbGUuREVGQVVMVF9PUFRJT05TO1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmZvcmNlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2VuZ2luZSA9IG51bGw7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBudWxsO1xuICAgIHRoaXMubWFzcyA9IG9wdGlvbnMubWFzcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tYXNzIDogZGVmYXVsdHMubWFzcztcbiAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcbiAgICB0aGlzLnNldFBvc2l0aW9uKG9wdGlvbnMucG9zaXRpb24gfHwgZGVmYXVsdHMucG9zaXRpb24pO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkob3B0aW9ucy52ZWxvY2l0eSB8fCBkZWZhdWx0cy52ZWxvY2l0eSk7XG4gICAgdGhpcy5mb3JjZS5zZXQob3B0aW9ucy5mb3JjZSB8fCBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS5pZGVudGl0eS5zbGljZSgpO1xuICAgIHRoaXMuX3NwZWMgPSB7XG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgIF0sXG4gICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLnRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgIDAuNSxcbiAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICAgICAgfVxuICAgIH07XG59XG5QYXJ0aWNsZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcG9zaXRpb246IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgdmVsb2NpdHk6IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgbWFzczogMVxufTtcbnZhciBfZXZlbnRzID0ge1xuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgZW5kOiAnZW5kJ1xufTtcbnZhciBub3cgPSBEYXRlLm5vdztcblBhcnRpY2xlLnByb3RvdHlwZS5pc0JvZHkgPSBmYWxzZTtcblBhcnRpY2xlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5faXNTbGVlcGluZztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuUGFydGljbGUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICBpZiAodGhpcy5fZW5naW5lKVxuICAgICAgICB0aGlzLl9lbmdpbmUud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24pO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRQb3NpdGlvbjFEID0gZnVuY3Rpb24gc2V0UG9zaXRpb24xRCh4KSB7XG4gICAgdGhpcy5wb3NpdGlvbi54ID0geDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RlcCgpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmdldCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbjFEID0gZnVuY3Rpb24gZ2V0UG9zaXRpb24xRCgpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RlcCgpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLnZlbG9jaXR5LnNldCh2ZWxvY2l0eSk7XG4gICAgaWYgKCEodmVsb2NpdHlbMF0gPT09IDAgJiYgdmVsb2NpdHlbMV0gPT09IDAgJiYgdmVsb2NpdHlbMl0gPT09IDApKVxuICAgICAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkxRCA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5MUQoeCkge1xuICAgIHRoaXMudmVsb2NpdHkueCA9IHg7XG4gICAgaWYgKHggIT09IDApXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5LmdldCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRGb3JjZSA9IGZ1bmN0aW9uIHNldEZvcmNlKGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZS5zZXQoZm9yY2UpO1xuICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkxRCgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eS54O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRNYXNzID0gZnVuY3Rpb24gc2V0TWFzcyhtYXNzKSB7XG4gICAgdGhpcy5tYXNzID0gbWFzcztcbiAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIG1hc3M7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldE1hc3MgPSBmdW5jdGlvbiBnZXRNYXNzKCkge1xuICAgIHJldHVybiB0aGlzLm1hc3M7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihwb3NpdGlvbiB8fCBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KHZlbG9jaXR5IHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZShmb3JjZSkge1xuICAgIGlmIChmb3JjZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZm9yY2UuYWRkKGZvcmNlKS5wdXQodGhpcy5mb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5SW1wdWxzZSA9IGZ1bmN0aW9uIGFwcGx5SW1wdWxzZShpbXB1bHNlKSB7XG4gICAgaWYgKGltcHVsc2UuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHZlbG9jaXR5LmFkZChpbXB1bHNlLm11bHQodGhpcy5pbnZlcnNlTWFzcykpLnB1dCh2ZWxvY2l0eSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoZHQpIHtcbiAgICBJbnRlZ3JhdG9yLmludGVncmF0ZVZlbG9jaXR5KHRoaXMsIGR0KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlUG9zaXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVQb3NpdGlvbihkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlUG9zaXRpb24odGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5faW50ZWdyYXRlID0gZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIHRoaXMuaW50ZWdyYXRlVmVsb2NpdHkoZHQpO1xuICAgIHRoaXMuaW50ZWdyYXRlUG9zaXRpb24oZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIDAuNSAqIHRoaXMubWFzcyAqIHRoaXMudmVsb2NpdHkubm9ybVNxdWFyZWQoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm07XG4gICAgdHJhbnNmb3JtWzEyXSA9IHBvc2l0aW9uLng7XG4gICAgdHJhbnNmb3JtWzEzXSA9IHBvc2l0aW9uLnk7XG4gICAgdHJhbnNmb3JtWzE0XSA9IHBvc2l0aW9uLno7XG4gICAgcmV0dXJuIHRyYW5zZm9ybTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIHZhciBfc3BlYyA9IHRoaXMuX3NwZWMudGFyZ2V0O1xuICAgIF9zcGVjLnRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgX3NwZWMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHJldHVybiB0aGlzLl9zcGVjO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5QYXJ0aWNsZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgIGlmICghdGhpcy5fZXZlbnRPdXRwdXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIEZvcmNlID0gcmVxdWlyZSgnLi9Gb3JjZScpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTcHJpbmcob3B0aW9ucykge1xuICAgIEZvcmNlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmRpc3AgPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG59XG5TcHJpbmcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb3JjZS5wcm90b3R5cGUpO1xuU3ByaW5nLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNwcmluZztcbnZhciBwaSA9IE1hdGguUEk7XG52YXIgTUlOX1BFUklPRCA9IDE1MDtcblNwcmluZy5GT1JDRV9GVU5DVElPTlMgPSB7XG4gICAgRkVORTogZnVuY3Rpb24gKGRpc3QsIHJNYXgpIHtcbiAgICAgICAgdmFyIHJNYXhTbWFsbCA9IHJNYXggKiAwLjk5O1xuICAgICAgICB2YXIgciA9IE1hdGgubWF4KE1hdGgubWluKGRpc3QsIHJNYXhTbWFsbCksIC1yTWF4U21hbGwpO1xuICAgICAgICByZXR1cm4gciAvICgxIC0gciAqIHIgLyAock1heCAqIHJNYXgpKTtcbiAgICB9LFxuICAgIEhPT0s6IGZ1bmN0aW9uIChkaXN0KSB7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH1cbn07XG5TcHJpbmcuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4xLFxuICAgIGxlbmd0aDogMCxcbiAgICBtYXhMZW5ndGg6IEluZmluaXR5LFxuICAgIGFuY2hvcjogdW5kZWZpbmVkLFxuICAgIGZvcmNlRnVuY3Rpb246IFNwcmluZy5GT1JDRV9GVU5DVElPTlMuSE9PS1xufTtcbmZ1bmN0aW9uIF9jYWxjU3RpZmZuZXNzKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIG9wdGlvbnMuc3RpZmZuZXNzID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xufVxuZnVuY3Rpb24gX2NhbGNEYW1waW5nKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIG9wdGlvbnMuZGFtcGluZyA9IDQgKiBwaSAqIG9wdGlvbnMuZGFtcGluZ1JhdGlvIC8gb3B0aW9ucy5wZXJpb2Q7XG59XG5mdW5jdGlvbiBfaW5pdCgpIHtcbiAgICBfY2FsY1N0aWZmbmVzcy5jYWxsKHRoaXMpO1xuICAgIF9jYWxjRGFtcGluZy5jYWxsKHRoaXMpO1xufVxuU3ByaW5nLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuYW5jaG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3Iob3B0aW9ucy5hbmNob3IpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wZXJpb2QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5wZXJpb2QgPCBNSU5fUEVSSU9EKSB7XG4gICAgICAgICAgICBvcHRpb25zLnBlcmlvZCA9IE1JTl9QRVJJT0Q7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBwZXJpb2Qgb2YgYSBTcHJpbmdUcmFuc2l0aW9uIGlzIGNhcHBlZCBhdCAnICsgTUlOX1BFUklPRCArICcgbXMuIFVzZSBhIFNuYXBUcmFuc2l0aW9uIGZvciBmYXN0ZXIgdHJhbnNpdGlvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMucGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRhbXBpbmdSYXRpbyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICBpZiAob3B0aW9ucy5mb3JjZUZ1bmN0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JjZUZ1bmN0aW9uID0gb3B0aW9ucy5mb3JjZUZ1bmN0aW9uO1xuICAgIGlmIChvcHRpb25zLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGg7XG4gICAgX2luaXQuY2FsbCh0aGlzKTtcbiAgICBGb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufTtcblNwcmluZy5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cywgc291cmNlKSB7XG4gICAgdmFyIGZvcmNlID0gdGhpcy5mb3JjZTtcbiAgICB2YXIgZGlzcCA9IHRoaXMuZGlzcDtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgc3RpZmZuZXNzID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGRhbXBpbmcgPSBvcHRpb25zLmRhbXBpbmc7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgbWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yIHx8IHNvdXJjZS5wb3NpdGlvbjtcbiAgICB2YXIgZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICB2YXIgaTtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBwMjtcbiAgICB2YXIgdjI7XG4gICAgdmFyIGRpc3Q7XG4gICAgdmFyIG07XG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgcDIgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHYyID0gdGFyZ2V0LnZlbG9jaXR5O1xuICAgICAgICBhbmNob3Iuc3ViKHAyKS5wdXQoZGlzcCk7XG4gICAgICAgIGRpc3QgPSBkaXNwLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgICAgIGlmIChkaXN0ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBtID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHN0aWZmbmVzcyAqPSBtO1xuICAgICAgICBkYW1waW5nICo9IG07XG4gICAgICAgIGRpc3Aubm9ybWFsaXplKHN0aWZmbmVzcyAqIGZvcmNlRnVuY3Rpb24oZGlzdCwgbWF4TGVuZ3RoKSkucHV0KGZvcmNlKTtcbiAgICAgICAgaWYgKGRhbXBpbmcpXG4gICAgICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgICAgIGZvcmNlLmFkZCh2Mi5zdWIoc291cmNlLnZlbG9jaXR5KS5tdWx0KC1kYW1waW5nKSkucHV0KGZvcmNlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgIHRhcmdldC5hcHBseUZvcmNlKGZvcmNlKTtcbiAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUZvcmNlKGZvcmNlLm11bHQoLTEpKTtcbiAgICB9XG59O1xuU3ByaW5nLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3kodGFyZ2V0cywgc291cmNlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gc291cmNlID8gc291cmNlLnBvc2l0aW9uIDogb3B0aW9ucy5hbmNob3I7XG4gICAgdmFyIHN0cmVuZ3RoID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgZGlzdCA9IGFuY2hvci5zdWIodGFyZ2V0LnBvc2l0aW9uKS5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBlbmVyZ3kgKz0gMC41ICogc3RyZW5ndGggKiBkaXN0ICogZGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZXJneTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwcmluZztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbmZ1bmN0aW9uIFZlY3Rvcih4LCB5LCB6KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLnNldCh4KTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgICAgIHRoaXMueiA9IHogfHwgMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG52YXIgX3JlZ2lzdGVyID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcblZlY3Rvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgdGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnksIHRoaXMueiArIHYueik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbiBzdWIodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLm11bHQgPSBmdW5jdGlvbiBtdWx0KHIpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgciAqIHRoaXMueCwgciAqIHRoaXMueSwgciAqIHRoaXMueik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbiBkaXYocikge1xuICAgIHJldHVybiB0aGlzLm11bHQoMSAvIHIpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY3Jvc3MgPSBmdW5jdGlvbiBjcm9zcyh2KSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIHZ4ID0gdi54O1xuICAgIHZhciB2eSA9IHYueTtcbiAgICB2YXIgdnogPSB2Lno7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHogKiB2eSAtIHkgKiB2eiwgeCAqIHZ6IC0geiAqIHZ4LCB5ICogdnggLSB4ICogdnkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi54ID09PSB0aGlzLnggJiYgdi55ID09PSB0aGlzLnkgJiYgdi56ID09PSB0aGlzLno7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVYID0gZnVuY3Rpb24gcm90YXRlWCh0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHgsIHkgKiBjb3NUaGV0YSAtIHogKiBzaW5UaGV0YSwgeSAqIHNpblRoZXRhICsgeiAqIGNvc1RoZXRhKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVkgPSBmdW5jdGlvbiByb3RhdGVZKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeiAqIHNpblRoZXRhICsgeCAqIGNvc1RoZXRhLCB5LCB6ICogY29zVGhldGEgLSB4ICogc2luVGhldGEpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB4ICogY29zVGhldGEgLSB5ICogc2luVGhldGEsIHggKiBzaW5UaGV0YSArIHkgKiBjb3NUaGV0YSwgeik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtU3F1YXJlZCA9IGZ1bmN0aW9uIG5vcm1TcXVhcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLm5vcm0gPSBmdW5jdGlvbiBub3JtKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5ub3JtU3F1YXJlZCgpKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZShsZW5ndGgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgbGVuZ3RoID0gMTtcbiAgICB2YXIgbm9ybSA9IHRoaXMubm9ybSgpO1xuICAgIGlmIChub3JtID4gMWUtNylcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLm11bHQobGVuZ3RoIC8gbm9ybSkpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIGxlbmd0aCwgMCwgMCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xuICAgIHJldHVybiAhKHRoaXMueCB8fCB0aGlzLnkgfHwgdGhpcy56KTtcbn07XG5mdW5jdGlvbiBfc2V0WFlaKHgsIHksIHopIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy56ID0gejtcbiAgICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIF9zZXRGcm9tQXJyYXkodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgdlswXSwgdlsxXSwgdlsyXSB8fCAwKTtcbn1cbmZ1bmN0aW9uIF9zZXRGcm9tVmVjdG9yKHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHYueCwgdi55LCB2LnopO1xufVxuZnVuY3Rpb24gX3NldEZyb21OdW1iZXIoeCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgeCwgMCwgMCk7XG59XG5WZWN0b3IucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tQXJyYXkuY2FsbCh0aGlzLCB2KTtcbiAgICBpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gX3NldEZyb21OdW1iZXIuY2FsbCh0aGlzLCB2KTtcbiAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbCh0aGlzLCB2KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnNldFhZWiA9IGZ1bmN0aW9uICh4LCB5LCB6KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnNldDFEID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gX3NldEZyb21OdW1iZXIuY2FsbCh0aGlzLCB4KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIHB1dCh2KSB7XG4gICAgaWYgKHRoaXMgPT09IF9yZWdpc3RlcilcbiAgICAgICAgX3NldEZyb21WZWN0b3IuY2FsbCh2LCBfcmVnaXN0ZXIpO1xuICAgIGVsc2VcbiAgICAgICAgX3NldEZyb21WZWN0b3IuY2FsbCh2LCB0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCAwLCAwLCAwKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNhcCA9IGZ1bmN0aW9uIGNhcChjYXApIHtcbiAgICBpZiAoY2FwID09PSBJbmZpbml0eSlcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzKTtcbiAgICB2YXIgbm9ybSA9IHRoaXMubm9ybSgpO1xuICAgIGlmIChub3JtID4gY2FwKVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMubXVsdChjYXAgLyBub3JtKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucHJvamVjdCA9IGZ1bmN0aW9uIHByb2plY3Qobikge1xuICAgIHJldHVybiBuLm11bHQodGhpcy5kb3QobikpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucmVmbGVjdEFjcm9zcyA9IGZ1bmN0aW9uIHJlZmxlY3RBY3Jvc3Mobikge1xuICAgIG4ubm9ybWFsaXplKCkucHV0KG4pO1xuICAgIHJldHVybiBfc2V0RnJvbVZlY3RvcihfcmVnaXN0ZXIsIHRoaXMuc3ViKHRoaXMucHJvamVjdChuKS5tdWx0KDIpKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy54LFxuICAgICAgICB0aGlzLnksXG4gICAgICAgIHRoaXMuelxuICAgIF07XG59O1xuVmVjdG9yLnByb3RvdHlwZS5nZXQxRCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy54O1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9tYXRoL1ZlY3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxsKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFdhbGwuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuZGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuV2FsbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbldhbGwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gV2FsbDtcbldhbGwuT05fQ09OVEFDVCA9IHtcbiAgICBSRUZMRUNUOiAwLFxuICAgIFNJTEVOVDogMVxufTtcbldhbGwuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgZHJpZnQ6IDAuNSxcbiAgICBzbG9wOiAwLFxuICAgIG5vcm1hbDogW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBkaXN0YW5jZTogMCxcbiAgICBvbkNvbnRhY3Q6IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUXG59O1xuV2FsbC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm5vcm1hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5vcm1hbCBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBvcHRpb25zLm5vcm1hbC5jbG9uZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5ub3JtYWwgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBuZXcgVmVjdG9yKG9wdGlvbnMubm9ybWFsKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucmVzdGl0dXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uID0gb3B0aW9ucy5yZXN0aXR1dGlvbjtcbiAgICBpZiAob3B0aW9ucy5kcmlmdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHJpZnQgPSBvcHRpb25zLmRyaWZ0O1xuICAgIGlmIChvcHRpb25zLnNsb3AgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNsb3AgPSBvcHRpb25zLnNsb3A7XG4gICAgaWYgKG9wdGlvbnMuZGlzdGFuY2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZTtcbiAgICBpZiAob3B0aW9ucy5vbkNvbnRhY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ29udGFjdCA9IG9wdGlvbnMub25Db250YWN0O1xufTtcbmZ1bmN0aW9uIF9nZXROb3JtYWxWZWxvY2l0eShuLCB2KSB7XG4gICAgcmV0dXJuIHYuZG90KG4pO1xufVxuZnVuY3Rpb24gX2dldERpc3RhbmNlRnJvbU9yaWdpbihwKSB7XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIHZhciBkID0gdGhpcy5vcHRpb25zLmRpc3RhbmNlO1xuICAgIHJldHVybiBwLmRvdChuKSArIGQ7XG59XG5mdW5jdGlvbiBfb25FbnRlcihwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpIHtcbiAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgIHZhciB2ID0gcGFydGljbGUudmVsb2NpdHk7XG4gICAgdmFyIG0gPSBwYXJ0aWNsZS5tYXNzO1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICB2YXIgYWN0aW9uID0gdGhpcy5vcHRpb25zLm9uQ29udGFjdDtcbiAgICB2YXIgcmVzdGl0dXRpb24gPSB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb247XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIGRyaWZ0ID0gdGhpcy5vcHRpb25zLmRyaWZ0O1xuICAgIHZhciBzbG9wID0gLXRoaXMub3B0aW9ucy5zbG9wO1xuICAgIHZhciBnYW1tYSA9IDA7XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcGFydGljbGU6IHBhcnRpY2xlLFxuICAgICAgICAgICAgd2FsbDogdGhpcyxcbiAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICBub3JtYWw6IG5cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncHJlQ29sbGlzaW9uJywgZGF0YSk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NvbGxpc2lvbicsIGRhdGEpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgV2FsbC5PTl9DT05UQUNULlJFRkxFQ1Q6XG4gICAgICAgIHZhciBsYW1iZGEgPSBvdmVybGFwIDwgc2xvcCA/IC0oKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2KSArIGRyaWZ0IC8gZHQgKiAob3ZlcmxhcCAtIHNsb3ApKSAvIChtICogZHQgKyBnYW1tYSkgOiAtKCgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodikpIC8gKG0gKiBkdCArIGdhbW1hKTtcbiAgICAgICAgaW1wdWxzZS5zZXQobi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5SW1wdWxzZShpbXB1bHNlKTtcbiAgICAgICAgcGFydGljbGUuc2V0UG9zaXRpb24ocC5hZGQobi5tdWx0KC1vdmVybGFwKSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KVxuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwb3N0Q29sbGlzaW9uJywgZGF0YSk7XG59XG5mdW5jdGlvbiBfb25FeGl0KHBhcnRpY2xlLCBvdmVybGFwLCBkdCkge1xuICAgIHZhciBhY3Rpb24gPSB0aGlzLm9wdGlvbnMub25Db250YWN0O1xuICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIGlmIChhY3Rpb24gPT09IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUKSB7XG4gICAgICAgIHBhcnRpY2xlLnNldFBvc2l0aW9uKHAuYWRkKG4ubXVsdCgtb3ZlcmxhcCkpKTtcbiAgICB9XG59XG5XYWxsLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRpY2xlID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHYgPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICAgICAgdmFyIHIgPSBwYXJ0aWNsZS5yYWRpdXMgfHwgMDtcbiAgICAgICAgdmFyIG92ZXJsYXAgPSBfZ2V0RGlzdGFuY2VGcm9tT3JpZ2luLmNhbGwodGhpcywgcC5hZGQobi5tdWx0KC1yKSkpO1xuICAgICAgICB2YXIgbnYgPSBfZ2V0Tm9ybWFsVmVsb2NpdHkuY2FsbCh0aGlzLCBuLCB2KTtcbiAgICAgICAgaWYgKG92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgaWYgKG52IDwgMClcbiAgICAgICAgICAgICAgICBfb25FbnRlci5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgX29uRXhpdC5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIENvbnN0cmFpbnQgPSByZXF1aXJlKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU25hcChvcHRpb25zKSB7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5wRGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZEaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTEgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlMiA9IG5ldyBWZWN0b3IoKTtcbn1cblNuYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5TbmFwLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNuYXA7XG5TbmFwLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgYW5jaG9yOiB1bmRlZmluZWRcbn07XG52YXIgcGkgPSBNYXRoLlBJO1xuU25hcC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLnBlcmlvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMucGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgQ29uc3RyYWludC5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufTtcblNuYXAucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSh0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHN0cmVuZ3RoID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgZW5lcmd5ICs9IDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlbmVyZ3k7XG59O1xuU25hcC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcERpZmYgPSB0aGlzLnBEaWZmO1xuICAgIHZhciB2RGlmZiA9IHRoaXMudkRpZmY7XG4gICAgdmFyIGltcHVsc2UxID0gdGhpcy5pbXB1bHNlMTtcbiAgICB2YXIgaW1wdWxzZTIgPSB0aGlzLmltcHVsc2UyO1xuICAgIHZhciBsZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcDEgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MSA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgdmFyIG0xID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHZhciB3MSA9IHRhcmdldC5pbnZlcnNlTWFzcztcbiAgICAgICAgcERpZmYuc2V0KHAxLnN1YihhbmNob3IpKTtcbiAgICAgICAgdmFyIGRpc3QgPSBwRGlmZi5ub3JtKCkgLSBsZW5ndGg7XG4gICAgICAgIHZhciBlZmZNYXNzO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgdzIgPSBzb3VyY2UuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICB2YXIgdjIgPSBzb3VyY2UudmVsb2NpdHk7XG4gICAgICAgICAgICB2RGlmZi5zZXQodjEuc3ViKHYyKSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gMSAvICh3MSArIHcyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZEaWZmLnNldCh2MSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gbTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdhbW1hO1xuICAgICAgICB2YXIgYmV0YTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogZWZmTWFzcyAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIHZhciBjID0gNCAqIGVmZk1hc3MgKiBwaSAqIGRhbXBpbmdSYXRpbyAvIHBlcmlvZDtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgICAgICBnYW1tYSA9IDEgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIGRpc3Q7XG4gICAgICAgIHBEaWZmLm5vcm1hbGl6ZSgtYW50aURyaWZ0KS5zdWIodkRpZmYpLm11bHQoZHQgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpKS5wdXQoaW1wdWxzZTEpO1xuICAgICAgICB0YXJnZXQuYXBwbHlJbXB1bHNlKGltcHVsc2UxKTtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgaW1wdWxzZTEubXVsdCgtMSkucHV0KGltcHVsc2UyKTtcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUltcHVsc2UoaW1wdWxzZTIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gU25hcDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpIHtcbiAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB0aGlzLl9pbnN0YW5jZXMgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gW107XG59XG5NdWx0aXBsZVRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zdGF0ZVtpXSA9IHRoaXMuX2luc3RhbmNlc1tpXS5nZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIF9hbGxDYWxsYmFjayA9IFV0aWxpdHkuYWZ0ZXIoZW5kU3RhdGUubGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0uc2V0KGVuZFN0YXRlW2ldLCB0cmFuc2l0aW9uLCBfYWxsQ2FsbGJhY2spO1xuICAgIH1cbn07XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0ucmVzZXQoc3RhcnRTdGF0ZVtpXSk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVUcmFuc2l0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9NdWx0aXBsZVRyYW5zaXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xuZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fY3VydmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG59XG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW46IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPD0gMC41KVxuICAgICAgICAgICAgcmV0dXJuIDIgKiB0ICogdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIC0yICogdCAqIHQgKyA0ICogdCAtIDE7XG4gICAgfSxcbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgzIC0gMiAqIHQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKDEgLSB0KSAqIE1hdGguc2luKDYgKiBNYXRoLlBJICogdCkgKyB0O1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjdXJ2ZTogVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIsXG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBzcGVlZDogMFxufTtcbnZhciByZWdpc3RlcmVkQ3VydmVzID0ge307XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi51bnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZSA9IGZ1bmN0aW9uIGdldEN1cnZlKGN1cnZlTmFtZSkge1xuICAgIHZhciBjdXJ2ZSA9IHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGN1cnZlO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXJ2ZSBub3QgcmVnaXN0ZXJlZCcpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKDEgLSB0KSAqIGEgKyB0ICogYjtcbn1cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBvYmouc2xpY2UoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG9iaik7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgY3VydmU6IGRlZmF1bHRUcmFuc2l0aW9uLmN1cnZlIH07XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uKVxuICAgICAgICByZXN1bHQuZHVyYXRpb24gPSBkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgIHJlc3VsdC5zcGVlZCA9IGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSlcbiAgICAgICAgICAgIHJlc3VsdC5jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICAgICAgcmVzdWx0LnNwZWVkID0gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQuY3VydmUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHQuY3VydmUgPSBUd2VlblRyYW5zaXRpb24uZ2V0Q3VydmUocmVzdWx0LmN1cnZlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgIGlmIChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBfY2xvbmUodGhpcy5nZXQoKSk7XG4gICAgdHJhbnNpdGlvbiA9IF9ub3JtYWxpemUodHJhbnNpdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBpZiAodHJhbnNpdGlvbi5zcGVlZCkge1xuICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdGFydFZhbHVlKVxuICAgICAgICAgICAgICAgIHZhcmlhbmNlICs9IChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pICogKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5zcXJ0KHZhcmlhbmNlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5hYnMoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IF9jbG9uZShlbmRWYWx1ZSk7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IF9jbG9uZSh0cmFuc2l0aW9uLnZlbG9jaXR5KTtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgdGhpcy5fY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5O1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIHRoaXMudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gc3BlZWQgKiAoY3VycmVudFtpXSAtIHN0YXJ0W2ldKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5mdW5jdGlvbiBfY2FsY3VsYXRlU3RhdGUoc3RhcnQsIGVuZCwgdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IF9pbnRlcnBvbGF0ZShzdGFydFtpXSwgZW5kW2ldLCB0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IHN0YXJ0W2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0YXRlID0gX2ludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGFtcCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRpbWVzdGFtcClcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlVGltZSA+PSB0aW1lc3RhbXApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGltZVNpbmNlU3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fc3RhcnRWZWxvY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdCA9IHRpbWVTaW5jZVN0YXJ0IC8gdGhpcy5fZHVyYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBfY2FsY3VsYXRlU3RhdGUodGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fZW5kVmFsdWUsIHRoaXMuX2N1cnZlKHQpKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIHQpO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMucmVzZXQodGhpcy5nZXQoKSk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblR3ZWVuVHJhbnNpdGlvbi5jdXN0b21DdXJ2ZSA9IGZ1bmN0aW9uIGN1c3RvbUN1cnZlKHYxLCB2Mikge1xuICAgIHYxID0gdjEgfHwgMDtcbiAgICB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB2MSAqIHQgKyAoLTIgKiB2MSAtIHYyICsgMykgKiB0ICogdCArICh2MSArIHYyIC0gMikgKiB0ICogdCAqIHQ7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuVHJhbnNpdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvVHdlZW5UcmFuc2l0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlcicpO1xuZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCkge1xuICAgIEV2ZW50RW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZG93bnN0cmVhbSA9IFtdO1xuICAgIHRoaXMuZG93bnN0cmVhbUZuID0gW107XG4gICAgdGhpcy51cHN0cmVhbSA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMgPSB7fTtcbn1cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV2ZW50SGFuZGxlcjtcbkV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRJbnB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgb2JqZWN0LnRyaWdnZXIgPSBoYW5kbGVyLnRyaWdnZXIuYmluZChoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlci5zdWJzY3JpYmUgJiYgaGFuZGxlci51bnN1YnNjcmliZSkge1xuICAgICAgICBvYmplY3Quc3Vic2NyaWJlID0gaGFuZGxlci5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICAgICAgb2JqZWN0LnVuc3Vic2NyaWJlID0gaGFuZGxlci51bnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgIH1cbn07XG5FdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldE91dHB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXIpXG4gICAgICAgIGhhbmRsZXIuYmluZFRoaXMob2JqZWN0KTtcbiAgICBvYmplY3QucGlwZSA9IGhhbmRsZXIucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC51bnBpcGUgPSBoYW5kbGVyLnVucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5vbiA9IGhhbmRsZXIub24uYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QuYWRkTGlzdGVuZXIgPSBvYmplY3Qub247XG4gICAgb2JqZWN0LnJlbW92ZUxpc3RlbmVyID0gaGFuZGxlci5yZW1vdmVMaXN0ZW5lci5iaW5kKGhhbmRsZXIpO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIpXG4gICAgICAgICAgICB0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcih0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW1Gbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmRvd25zdHJlYW1GbltpXSh0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdDtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIGRvd25zdHJlYW1DdHgucHVzaCh0YXJnZXQpO1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGFyZ2V0KCdwaXBlJywgbnVsbCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgIHRhcmdldC50cmlnZ2VyKCdwaXBlJywgbnVsbCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGRvd25zdHJlYW1DdHguc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICAgICAgdGFyZ2V0KCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgICAgICB0YXJnZXQudHJpZ2dlcigndW5waXBlJywgbnVsbCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpKSB7XG4gICAgICAgIHZhciB1cHN0cmVhbUxpc3RlbmVyID0gdGhpcy50cmlnZ2VyLmJpbmQodGhpcywgdHlwZSk7XG4gICAgICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0gPSB1cHN0cmVhbUxpc3RlbmVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBzdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudXBzdHJlYW1baV0ub24odHlwZSwgdXBzdHJlYW1MaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUub247XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0ucHVzaChzb3VyY2UpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5vbih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50SGFuZGxlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvY29yZS9FdmVudEhhbmRsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFRyYW5zZm9ybSA9IHt9O1xuVHJhbnNmb3JtLnByZWNpc2lvbiA9IDAuMDAwMDAxO1xuVHJhbnNmb3JtLmlkZW50aXR5ID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDFcbl07XG5UcmFuc2Zvcm0ubXVsdGlwbHk0eDQgPSBmdW5jdGlvbiBtdWx0aXBseTR4NChhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdICsgYVsxMl0gKiBiWzNdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0gKyBhWzEzXSAqIGJbM10sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0gKyBhWzE0XSAqIGJbM10sXG4gICAgICAgIGFbM10gKiBiWzBdICsgYVs3XSAqIGJbMV0gKyBhWzExXSAqIGJbMl0gKyBhWzE1XSAqIGJbM10sXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSArIGFbMTJdICogYls3XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdICsgYVsxM10gKiBiWzddLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdICsgYVsxNF0gKiBiWzddLFxuICAgICAgICBhWzNdICogYls0XSArIGFbN10gKiBiWzVdICsgYVsxMV0gKiBiWzZdICsgYVsxNV0gKiBiWzddLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdICsgYVsxMl0gKiBiWzExXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSArIGFbMTNdICogYlsxMV0sXG4gICAgICAgIGFbMl0gKiBiWzhdICsgYVs2XSAqIGJbOV0gKyBhWzEwXSAqIGJbMTBdICsgYVsxNF0gKiBiWzExXSxcbiAgICAgICAgYVszXSAqIGJbOF0gKyBhWzddICogYls5XSArIGFbMTFdICogYlsxMF0gKyBhWzE1XSAqIGJbMTFdLFxuICAgICAgICBhWzBdICogYlsxMl0gKyBhWzRdICogYlsxM10gKyBhWzhdICogYlsxNF0gKyBhWzEyXSAqIGJbMTVdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSAqIGJbMTVdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0gKiBiWzE1XSxcbiAgICAgICAgYVszXSAqIGJbMTJdICsgYVs3XSAqIGJbMTNdICsgYVsxMV0gKiBiWzE0XSArIGFbMTVdICogYlsxNV1cbiAgICBdO1xufTtcblRyYW5zZm9ybS5tdWx0aXBseSA9IGZ1bmN0aW9uIG11bHRpcGx5KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0sXG4gICAgICAgIGFbMl0gKiBiWzhdICsgYVs2XSAqIGJbOV0gKyBhWzEwXSAqIGJbMTBdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYlsxMl0gKyBhWzRdICogYlsxM10gKyBhWzhdICogYlsxNF0gKyBhWzEyXSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnRoZW5Nb3ZlID0gZnVuY3Rpb24gdGhlbk1vdmUobSwgdCkge1xuICAgIGlmICghdFsyXSlcbiAgICAgICAgdFsyXSA9IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVswXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgbVs0XSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs2XSxcbiAgICAgICAgMCxcbiAgICAgICAgbVs4XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bMTJdICsgdFswXSxcbiAgICAgICAgbVsxM10gKyB0WzFdLFxuICAgICAgICBtWzE0XSArIHRbMl0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5tb3ZlVGhlbiA9IGZ1bmN0aW9uIG1vdmVUaGVuKHYsIG0pIHtcbiAgICBpZiAoIXZbMl0pXG4gICAgICAgIHZbMl0gPSAwO1xuICAgIHZhciB0MCA9IHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XTtcbiAgICB2YXIgdDEgPSB2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV07XG4gICAgdmFyIHQyID0gdlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKG0sIFtcbiAgICAgICAgdDAsXG4gICAgICAgIHQxLFxuICAgICAgICB0MlxuICAgIF0pO1xufTtcblRyYW5zZm9ybS50cmFuc2xhdGUgPSBmdW5jdGlvbiB0cmFuc2xhdGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHosXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuU2NhbGUgPSBmdW5jdGlvbiB0aGVuU2NhbGUobSwgcykge1xuICAgIHJldHVybiBbXG4gICAgICAgIHNbMF0gKiBtWzBdLFxuICAgICAgICBzWzFdICogbVsxXSxcbiAgICAgICAgc1syXSAqIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzRdLFxuICAgICAgICBzWzFdICogbVs1XSxcbiAgICAgICAgc1syXSAqIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzhdLFxuICAgICAgICBzWzFdICogbVs5XSxcbiAgICAgICAgc1syXSAqIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVsxMl0sXG4gICAgICAgIHNbMV0gKiBtWzEzXSxcbiAgICAgICAgc1syXSAqIG1bMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2NhbGUgPSBmdW5jdGlvbiBzY2FsZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZClcbiAgICAgICAgeiA9IDE7XG4gICAgaWYgKHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgeSA9IHg7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgeCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgeSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgeixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZSA9IGZ1bmN0aW9uIHJvdGF0ZShwaGksIHRoZXRhLCBwc2kpIHtcbiAgICB2YXIgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICB2YXIgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NQc2kgPSBNYXRoLmNvcyhwc2kpO1xuICAgIHZhciBzaW5Qc2kgPSBNYXRoLnNpbihwc2kpO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgIGNvc1RoZXRhICogY29zUHNpLFxuICAgICAgICBjb3NQaGkgKiBzaW5Qc2kgKyBzaW5QaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgc2luUGhpICogc2luUHNpIC0gY29zUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgIDAsXG4gICAgICAgIC1jb3NUaGV0YSAqIHNpblBzaSxcbiAgICAgICAgY29zUGhpICogY29zUHNpIC0gc2luUGhpICogc2luVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgIHNpblBoaSAqIGNvc1BzaSArIGNvc1BoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAwLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgLXNpblBoaSAqIGNvc1RoZXRhLFxuICAgICAgICBjb3NQaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0ucm90YXRlQXhpcyA9IGZ1bmN0aW9uIHJvdGF0ZUF4aXModiwgdGhldGEpIHtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciB2ZXJUaGV0YSA9IDEgLSBjb3NUaGV0YTtcbiAgICB2YXIgeHhWID0gdlswXSAqIHZbMF0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHlWID0gdlswXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHpWID0gdlswXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXlWID0gdlsxXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXpWID0gdlsxXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgenpWID0gdlsyXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHMgPSB2WzBdICogc2luVGhldGE7XG4gICAgdmFyIHlzID0gdlsxXSAqIHNpblRoZXRhO1xuICAgIHZhciB6cyA9IHZbMl0gKiBzaW5UaGV0YTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICB4eFYgKyBjb3NUaGV0YSxcbiAgICAgICAgeHlWICsgenMsXG4gICAgICAgIHh6ViAtIHlzLFxuICAgICAgICAwLFxuICAgICAgICB4eVYgLSB6cyxcbiAgICAgICAgeXlWICsgY29zVGhldGEsXG4gICAgICAgIHl6ViArIHhzLFxuICAgICAgICAwLFxuICAgICAgICB4elYgKyB5cyxcbiAgICAgICAgeXpWIC0geHMsXG4gICAgICAgIHp6ViArIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hYm91dE9yaWdpbiA9IGZ1bmN0aW9uIGFib3V0T3JpZ2luKHYsIG0pIHtcbiAgICB2YXIgdDAgPSB2WzBdIC0gKHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSk7XG4gICAgdmFyIHQxID0gdlsxXSAtICh2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0pO1xuICAgIHZhciB0MiA9IHZbMl0gLSAodlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0uc2tldyA9IGZ1bmN0aW9uIHNrZXcocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4odGhldGEpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwc2kpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwaGkpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1ggPSBmdW5jdGlvbiBza2V3WChhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdZID0gZnVuY3Rpb24gc2tld1koYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKGZvY3VzWikge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIC0xIC8gZm9jdXNaLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMTRdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uaW52ZXJzZSA9IGZ1bmN0aW9uIGludmVyc2UobSkge1xuICAgIHZhciBjMCA9IG1bNV0gKiBtWzEwXSAtIG1bNl0gKiBtWzldO1xuICAgIHZhciBjMSA9IG1bNF0gKiBtWzEwXSAtIG1bNl0gKiBtWzhdO1xuICAgIHZhciBjMiA9IG1bNF0gKiBtWzldIC0gbVs1XSAqIG1bOF07XG4gICAgdmFyIGM0ID0gbVsxXSAqIG1bMTBdIC0gbVsyXSAqIG1bOV07XG4gICAgdmFyIGM1ID0gbVswXSAqIG1bMTBdIC0gbVsyXSAqIG1bOF07XG4gICAgdmFyIGM2ID0gbVswXSAqIG1bOV0gLSBtWzFdICogbVs4XTtcbiAgICB2YXIgYzggPSBtWzFdICogbVs2XSAtIG1bMl0gKiBtWzVdO1xuICAgIHZhciBjOSA9IG1bMF0gKiBtWzZdIC0gbVsyXSAqIG1bNF07XG4gICAgdmFyIGMxMCA9IG1bMF0gKiBtWzVdIC0gbVsxXSAqIG1bNF07XG4gICAgdmFyIGRldE0gPSBtWzBdICogYzAgLSBtWzFdICogYzEgKyBtWzJdICogYzI7XG4gICAgdmFyIGludkQgPSAxIC8gZGV0TTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICBpbnZEICogYzAsXG4gICAgICAgIC1pbnZEICogYzQsXG4gICAgICAgIGludkQgKiBjOCxcbiAgICAgICAgMCxcbiAgICAgICAgLWludkQgKiBjMSxcbiAgICAgICAgaW52RCAqIGM1LFxuICAgICAgICAtaW52RCAqIGM5LFxuICAgICAgICAwLFxuICAgICAgICBpbnZEICogYzIsXG4gICAgICAgIC1pbnZEICogYzYsXG4gICAgICAgIGludkQgKiBjMTAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIHJlc3VsdFsxMl0gPSAtbVsxMl0gKiByZXN1bHRbMF0gLSBtWzEzXSAqIHJlc3VsdFs0XSAtIG1bMTRdICogcmVzdWx0WzhdO1xuICAgIHJlc3VsdFsxM10gPSAtbVsxMl0gKiByZXN1bHRbMV0gLSBtWzEzXSAqIHJlc3VsdFs1XSAtIG1bMTRdICogcmVzdWx0WzldO1xuICAgIHJlc3VsdFsxNF0gPSAtbVsxMl0gKiByZXN1bHRbMl0gLSBtWzEzXSAqIHJlc3VsdFs2XSAtIG1bMTRdICogcmVzdWx0WzEwXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS50cmFuc3Bvc2UgPSBmdW5jdGlvbiB0cmFuc3Bvc2UobSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bMTJdLFxuICAgICAgICBtWzFdLFxuICAgICAgICBtWzVdLFxuICAgICAgICBtWzldLFxuICAgICAgICBtWzEzXSxcbiAgICAgICAgbVsyXSxcbiAgICAgICAgbVs2XSxcbiAgICAgICAgbVsxMF0sXG4gICAgICAgIG1bMTRdLFxuICAgICAgICBtWzNdLFxuICAgICAgICBtWzddLFxuICAgICAgICBtWzExXSxcbiAgICAgICAgbVsxNV1cbiAgICBdO1xufTtcbmZ1bmN0aW9uIF9ub3JtU3F1YXJlZCh2KSB7XG4gICAgcmV0dXJuIHYubGVuZ3RoID09PSAyID8gdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSA6IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXTtcbn1cbmZ1bmN0aW9uIF9ub3JtKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KF9ub3JtU3F1YXJlZCh2KSk7XG59XG5mdW5jdGlvbiBfc2lnbihuKSB7XG4gICAgcmV0dXJuIG4gPCAwID8gLTEgOiAxO1xufVxuVHJhbnNmb3JtLmludGVycHJldCA9IGZ1bmN0aW9uIGludGVycHJldChNKSB7XG4gICAgdmFyIHggPSBbXG4gICAgICAgIE1bMF0sXG4gICAgICAgIE1bMV0sXG4gICAgICAgIE1bMl1cbiAgICBdO1xuICAgIHZhciBzZ24gPSBfc2lnbih4WzBdKTtcbiAgICB2YXIgeE5vcm0gPSBfbm9ybSh4KTtcbiAgICB2YXIgdiA9IFtcbiAgICAgICAgeFswXSArIHNnbiAqIHhOb3JtLFxuICAgICAgICB4WzFdLFxuICAgICAgICB4WzJdXG4gICAgXTtcbiAgICB2YXIgbXVsdCA9IDIgLyBfbm9ybVNxdWFyZWQodik7XG4gICAgaWYgKG11bHQgPj0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKSxcbiAgICAgICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgUTEgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIFExWzBdID0gMSAtIG11bHQgKiB2WzBdICogdlswXTtcbiAgICBRMVs1XSA9IDEgLSBtdWx0ICogdlsxXSAqIHZbMV07XG4gICAgUTFbMTBdID0gMSAtIG11bHQgKiB2WzJdICogdlsyXTtcbiAgICBRMVsxXSA9IC1tdWx0ICogdlswXSAqIHZbMV07XG4gICAgUTFbMl0gPSAtbXVsdCAqIHZbMF0gKiB2WzJdO1xuICAgIFExWzZdID0gLW11bHQgKiB2WzFdICogdlsyXTtcbiAgICBRMVs0XSA9IFExWzFdO1xuICAgIFExWzhdID0gUTFbMl07XG4gICAgUTFbOV0gPSBRMVs2XTtcbiAgICB2YXIgTVExID0gVHJhbnNmb3JtLm11bHRpcGx5KFExLCBNKTtcbiAgICB2YXIgeDIgPSBbXG4gICAgICAgIE1RMVs1XSxcbiAgICAgICAgTVExWzZdXG4gICAgXTtcbiAgICB2YXIgc2duMiA9IF9zaWduKHgyWzBdKTtcbiAgICB2YXIgeDJOb3JtID0gX25vcm0oeDIpO1xuICAgIHZhciB2MiA9IFtcbiAgICAgICAgeDJbMF0gKyBzZ24yICogeDJOb3JtLFxuICAgICAgICB4MlsxXVxuICAgIF07XG4gICAgdmFyIG11bHQyID0gMiAvIF9ub3JtU3F1YXJlZCh2Mik7XG4gICAgdmFyIFEyID0gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbiAgICBRMls1XSA9IDEgLSBtdWx0MiAqIHYyWzBdICogdjJbMF07XG4gICAgUTJbMTBdID0gMSAtIG11bHQyICogdjJbMV0gKiB2MlsxXTtcbiAgICBRMls2XSA9IC1tdWx0MiAqIHYyWzBdICogdjJbMV07XG4gICAgUTJbOV0gPSBRMls2XTtcbiAgICB2YXIgUSA9IFRyYW5zZm9ybS5tdWx0aXBseShRMiwgUTEpO1xuICAgIHZhciBSID0gVHJhbnNmb3JtLm11bHRpcGx5KFEsIE0pO1xuICAgIHZhciByZW1vdmVyID0gVHJhbnNmb3JtLnNjYWxlKFJbMF0gPCAwID8gLTEgOiAxLCBSWzVdIDwgMCA/IC0xIDogMSwgUlsxMF0gPCAwID8gLTEgOiAxKTtcbiAgICBSID0gVHJhbnNmb3JtLm11bHRpcGx5KFIsIHJlbW92ZXIpO1xuICAgIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkocmVtb3ZlciwgUSk7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC50cmFuc2xhdGUgPSBUcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKE0pO1xuICAgIHJlc3VsdC5yb3RhdGUgPSBbXG4gICAgICAgIE1hdGguYXRhbjIoLVFbNl0sIFFbMTBdKSxcbiAgICAgICAgTWF0aC5hc2luKFFbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKC1RWzFdLCBRWzBdKVxuICAgIF07XG4gICAgaWYgKCFyZXN1bHQucm90YXRlWzBdKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gPSAwO1xuICAgICAgICByZXN1bHQucm90YXRlWzJdID0gTWF0aC5hdGFuMihRWzRdLCBRWzVdKTtcbiAgICB9XG4gICAgcmVzdWx0LnNjYWxlID0gW1xuICAgICAgICBSWzBdLFxuICAgICAgICBSWzVdLFxuICAgICAgICBSWzEwXVxuICAgIF07XG4gICAgcmVzdWx0LnNrZXcgPSBbXG4gICAgICAgIE1hdGguYXRhbjIoUls5XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzhdLCByZXN1bHQuc2NhbGVbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKFJbNF0sIHJlc3VsdC5zY2FsZVswXSlcbiAgICBdO1xuICAgIGlmIChNYXRoLmFicyhyZXN1bHQucm90YXRlWzBdKSArIE1hdGguYWJzKHJlc3VsdC5yb3RhdGVbMl0pID4gMS41ICogTWF0aC5QSSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzFdID0gTWF0aC5QSSAtIHJlc3VsdC5yb3RhdGVbMV07XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzFdID4gTWF0aC5QSSlcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzFdIDwgLU1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVswXSA8IDApXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gLT0gTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMl0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmF2ZXJhZ2UgPSBmdW5jdGlvbiBhdmVyYWdlKE0xLCBNMiwgdCkge1xuICAgIHQgPSB0ID09PSB1bmRlZmluZWQgPyAwLjUgOiB0O1xuICAgIHZhciBzcGVjTTEgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0xKTtcbiAgICB2YXIgc3BlY00yID0gVHJhbnNmb3JtLmludGVycHJldChNMik7XG4gICAgdmFyIHNwZWNBdmcgPSB7XG4gICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHNwZWNBdmcudHJhbnNsYXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS50cmFuc2xhdGVbaV0gKyB0ICogc3BlY00yLnRyYW5zbGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5yb3RhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnJvdGF0ZVtpXSArIHQgKiBzcGVjTTIucm90YXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnNjYWxlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5zY2FsZVtpXSArIHQgKiBzcGVjTTIuc2NhbGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2tld1tpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2tld1tpXSArIHQgKiBzcGVjTTIuc2tld1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZChzcGVjQXZnKTtcbn07XG5UcmFuc2Zvcm0uYnVpbGQgPSBmdW5jdGlvbiBidWlsZChzcGVjKSB7XG4gICAgdmFyIHNjYWxlTWF0cml4ID0gVHJhbnNmb3JtLnNjYWxlKHNwZWMuc2NhbGVbMF0sIHNwZWMuc2NhbGVbMV0sIHNwZWMuc2NhbGVbMl0pO1xuICAgIHZhciBza2V3TWF0cml4ID0gVHJhbnNmb3JtLnNrZXcoc3BlYy5za2V3WzBdLCBzcGVjLnNrZXdbMV0sIHNwZWMuc2tld1syXSk7XG4gICAgdmFyIHJvdGF0ZU1hdHJpeCA9IFRyYW5zZm9ybS5yb3RhdGUoc3BlYy5yb3RhdGVbMF0sIHNwZWMucm90YXRlWzFdLCBzcGVjLnJvdGF0ZVsyXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShUcmFuc2Zvcm0ubXVsdGlwbHkoVHJhbnNmb3JtLm11bHRpcGx5KHJvdGF0ZU1hdHJpeCwgc2tld01hdHJpeCksIHNjYWxlTWF0cml4KSwgc3BlYy50cmFuc2xhdGUpO1xufTtcblRyYW5zZm9ybS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICAgIHJldHVybiAhVHJhbnNmb3JtLm5vdEVxdWFscyhhLCBiKTtcbn07XG5UcmFuc2Zvcm0ubm90RXF1YWxzID0gZnVuY3Rpb24gbm90RXF1YWxzKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhKGEgJiYgYikgfHwgYVsxMl0gIT09IGJbMTJdIHx8IGFbMTNdICE9PSBiWzEzXSB8fCBhWzE0XSAhPT0gYlsxNF0gfHwgYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIHx8IGFbMl0gIT09IGJbMl0gfHwgYVs0XSAhPT0gYls0XSB8fCBhWzVdICE9PSBiWzVdIHx8IGFbNl0gIT09IGJbNl0gfHwgYVs4XSAhPT0gYls4XSB8fCBhWzldICE9PSBiWzldIHx8IGFbMTBdICE9PSBiWzEwXTtcbn07XG5UcmFuc2Zvcm0ubm9ybWFsaXplUm90YXRpb24gPSBmdW5jdGlvbiBub3JtYWxpemVSb3RhdGlvbihyb3RhdGlvbikge1xuICAgIHZhciByZXN1bHQgPSByb3RhdGlvbi5zbGljZSgwKTtcbiAgICBpZiAocmVzdWx0WzBdID09PSBNYXRoLlBJICogMC41IHx8IHJlc3VsdFswXSA9PT0gLU1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gLXJlc3VsdFswXTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPiBNYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSAtIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdIDwgLU1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdICsgTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gLU1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICB3aGlsZSAocmVzdWx0WzFdIDwgLU1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsxXSArPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzFdID49IE1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsxXSAtPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzJdIDwgLU1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsyXSArPSAyICogTWF0aC5QSTtcbiAgICB3aGlsZSAocmVzdWx0WzJdID49IE1hdGguUEkpXG4gICAgICAgIHJlc3VsdFsyXSAtPSAyICogTWF0aC5QSTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5pbkZyb250ID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLjAwMSxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLmJlaGluZCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgLTAuMDAxLFxuICAgIDFcbl07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvY29yZS9UcmFuc2Zvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFN5bXBsZWN0aWNFdWxlciA9IHt9O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoYm9keSwgZHQpIHtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgdmFyIHcgPSBib2R5LmludmVyc2VNYXNzO1xuICAgIHZhciBmID0gYm9keS5mb3JjZTtcbiAgICBpZiAoZi5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHYuYWRkKGYubXVsdChkdCAqIHcpKS5wdXQodik7XG4gICAgZi5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGJvZHksIGR0KSB7XG4gICAgdmFyIHAgPSBib2R5LnBvc2l0aW9uO1xuICAgIHZhciB2ID0gYm9keS52ZWxvY2l0eTtcbiAgICBwLmFkZCh2Lm11bHQoZHQpKS5wdXQocCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bSA9IGZ1bmN0aW9uIGludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShib2R5LCBkdCkge1xuICAgIHZhciBMID0gYm9keS5hbmd1bGFyTW9tZW50dW07XG4gICAgdmFyIHQgPSBib2R5LnRvcnF1ZTtcbiAgICBpZiAodC5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIEwuYWRkKHQubXVsdChkdCkpLnB1dChMKTtcbiAgICB0LmNsZWFyKCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcSA9IGJvZHkub3JpZW50YXRpb247XG4gICAgdmFyIHcgPSBib2R5LmFuZ3VsYXJWZWxvY2l0eTtcbiAgICBpZiAody5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHEuYWRkKHEubXVsdGlwbHkodykuc2NhbGFyTXVsdGlwbHkoMC41ICogZHQpKS5wdXQocSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTeW1wbGVjdGljRXVsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3BoeXNpY3MvaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBGb3JjZShmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKGZvcmNlKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRhcmdldHMubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICB0YXJnZXRzW2xlbmd0aF0uYXBwbHlGb3JjZSh0aGlzLmZvcmNlKTtcbiAgICB9XG59O1xuRm9yY2UucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcmNlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Gb3JjZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIENvbnN0cmFpbnQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbkNvbnN0cmFpbnQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCBvcHRpb25zKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQoKSB7XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiAwO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29uc3RyYWludDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9Db25zdHJhaW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBVdGlsaXR5ID0ge307XG5VdGlsaXR5LkRpcmVjdGlvbiA9IHtcbiAgICBYOiAwLFxuICAgIFk6IDEsXG4gICAgWjogMlxufTtcblV0aWxpdHkuYWZ0ZXIgPSBmdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY291bnRlciA9IGNvdW50O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPT09IDApXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuVXRpbGl0eS5sb2FkVVJMID0gZnVuY3Rpb24gbG9hZFVSTCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5zZW5kKCk7XG59O1xuVXRpbGl0eS5jcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwoaHRtbCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblV0aWxpdHkuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShiKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gYiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYltrZXldID09PSAnb2JqZWN0JyAmJiBiW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoYltrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gbmV3IEFycmF5KGJba2V5XS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJba2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYVtrZXldW2ldID0gVXRpbGl0eS5jbG9uZShiW2tleV1baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gVXRpbGl0eS5jbG9uZShiW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IGI7XG4gICAgfVxuICAgIHJldHVybiBhO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVXRpbGl0eTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fb3duZXIgPSB0aGlzO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHZhciBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMuX293bmVyLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSlcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGxpc3RlbmVyLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKVxuICAgICAgICAgICAgbGlzdGVuZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5iaW5kVGhpcyA9IGZ1bmN0aW9uIGJpbmRUaGlzKG93bmVyKSB7XG4gICAgdGhpcy5fb3duZXIgPSBvd25lcjtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvY29yZS9FdmVudEVtaXR0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==