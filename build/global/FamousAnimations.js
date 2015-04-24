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
	                if (property[prop[i]]) {
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
	            property.transitionable.set(value, animation, function () {
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

	"use strict";
	
	var Transitionable = __webpack_require__(8);
	
	Transitionable.prototype.update = function (fn) {
	  this._listeners = this._listeners || [];
	  this._listeners.push(fn);
	};
	
	Transitionable.prototype["@@set"] = Transitionable.prototype.set;
	
	Transitionable.prototype.set = function (duration, animation, complete) {
	  var self = this;
	
	  // Call the original set
	  self["@@set"](duration, animation, function () {
	    // Last time execution
	    self._executeListeners();
	    cancelAnimationFrame(self._animationID);
	    self._animationID = undefined;
	    if (complete) {
	      complete();
	    };
	  });
	
	  // Setup animation
	  if (!this._animationID) {
	    this._animate();
	  } else {
	    cancelAnimationFrame(self._animationID);
	    this._animate();
	  }
	};
	
	Transitionable.prototype._executeListeners = function () {
	  var _this = this;
	
	  // Execute listeners
	  if (this._listeners) {
	    this._listeners.forEach(function (fn) {
	      return fn(_this.get());
	    });
	  }
	};
	
	Transitionable.prototype._animate = function () {
	  // Request frame
	  this._executeListeners();
	  this._animationID = requestAnimationFrame(Transitionable.prototype._animate.bind(this));
	};
	
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
	var PE = __webpack_require__(11);
	var Particle = __webpack_require__(12);
	var Spring = __webpack_require__(15);
	var Vector = __webpack_require__(14);
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
	var PE = __webpack_require__(11);
	var Particle = __webpack_require__(12);
	var Spring = __webpack_require__(15);
	var Wall = __webpack_require__(16);
	var Vector = __webpack_require__(14);
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
	var PE = __webpack_require__(11);
	var Particle = __webpack_require__(12);
	var Spring = __webpack_require__(13);
	var Vector = __webpack_require__(14);
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
	var MultipleTransition = __webpack_require__(9);
	var TweenTransition = __webpack_require__(10);
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
	var Utility = __webpack_require__(17);
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(18);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(14);
	var Transform = __webpack_require__(19);
	var EventHandler = __webpack_require__(18);
	var Integrator = __webpack_require__(20);
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
	var Vector = __webpack_require__(14);
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(22);
	var Vector = __webpack_require__(14);
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Constraint = __webpack_require__(21);
	var Vector = __webpack_require__(14);
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(18);
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
	var Vector = __webpack_require__(14);
	var EventHandler = __webpack_require__(18);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzYTY4NjQ0YTFlZjcxNDEyNTIyYSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9FYXNpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9NdWx0aXBsZVRyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvVHdlZW5UcmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL34vZmFtb3VzL3BoeXNpY3MvUGh5c2ljc0VuZ2luZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvbWF0aC9WZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nLmpzIiwid2VicGFjazovLy8uL34vZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9jb3JlL1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL0NvbnN0cmFpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvRm9yY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYW1vdXMvY29yZS9FdmVudEVtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7NkNDdEMrQixDQUFZOzsyQ0FDaEIsQ0FBa0I7Ozs7bUNBQzFCLENBQTJCOzs7OzhDQUNiLENBQWlCOztTQUk5QyxRQUFRLHNCQUpNLFFBQVE7U0FLdEIsUUFBUSxzQkFMSixRQUFRO1NBTVosZ0JBQWdCLHFCQVRaLGdCQUFnQjtTQVVwQixjQUFjO1NBQ2QsTUFBTSx1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQ1hpQixDQUFrQjs7OzttQ0FDMUIsQ0FBMkI7Ozs7QUFFOUMsS0FBSSxnQkFBZ0IsR0FBRyxtQkFBTyxDQUFDLENBQXFDLENBQUMsQ0FBQztBQUN0RSxLQUFJLGNBQWMsR0FBRyxtQkFBTyxDQUFDLENBQW1DLENBQUMsQ0FBQztBQUNsRSxLQUFJLGNBQWMsR0FBRyxtQkFBTyxDQUFDLENBQW1DLENBQUMsQ0FBQzs7QUFFbEUsVUFBUyxZQUFZLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLFNBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixZQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQy9COztLQUVLLGdCQUFnQjtBQUNQLGNBRFQsZ0JBQWdCLENBQ04sTUFBTSxFQUFFOytCQURsQixnQkFBZ0I7O0FBRWQsYUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDcEIsYUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7TUFDcEI7O2tCQUpDLGdCQUFnQjs7Z0JBTVYsb0JBQUc7QUFDUCxvQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1VBQ3ZCOzs7Z0JBRVEsbUJBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNoQixpQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGlCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsaUJBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLGlCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLGlCQUFJLE1BQU07aUJBQUUsTUFBTTtpQkFBRSxNQUFNO2lCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsb0JBQU0sSUFBSSxFQUFFO0FBQ1IscUJBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25CLDJCQUFNLEdBQUcsUUFBUSxDQUFDO0FBQ2xCLDZCQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2tCQUNoQyxNQUFNO0FBQ0gseUJBQUksS0FBSyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDaEIsMkJBQU0sR0FBRztnQ0FBTSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3NCQUFBLENBQUM7QUFDakQsMkJBQU0sR0FBRyxXQUFDO2dDQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO3NCQUFBLENBQUM7QUFDcEQsdUJBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0FBQ2xCLDJCQUFNO2tCQUNUO0FBQ0Qsa0JBQUMsRUFBRSxDQUFDO2NBQ1A7VUFDSjs7O2dCQUVNLGlCQUFDLElBQUksRUFBRTs7O0FBQ1YsaUJBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBSztBQUNyQyx1QkFBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDaEIsbUNBQWMsRUFBRSxnQ0FBbUIsTUFBTSxFQUFFLENBQUM7QUFDNUMsd0JBQUcsRUFBRSxNQUFNO0FBQ1gsd0JBQUcsRUFBRSxNQUFNO0FBQ1gsNEJBQU8sRUFBRSxLQUFLO2tCQUNqQixDQUFDO2NBQ0wsQ0FBQztBQUNGLGlCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHL0IsbUJBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQUM7d0JBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Y0FBQSxDQUFDLENBQUM7O0FBRWpELG9CQUFPLE1BQU0sQ0FBQztVQUNqQjs7O2dCQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDckIsaUJBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixpQkFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ2hCLDBCQUFTLEdBQUc7QUFDUiw2QkFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ3hCLDBCQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsR0FDbEIsb0JBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUk7a0JBQ3JDO2NBQ0osTUFBTTtBQUNILDZDQUFlLGNBQWMsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUMxRCw2Q0FBZSxjQUFjLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3RELDZDQUFlLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdEQsdUJBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQUM7NEJBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7a0JBQUEsQ0FBQyxDQUFDOztBQUV6RCxxQkFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7Y0FDdEQ7QUFDRCxvQkFBTyxTQUFTLENBQUM7VUFDcEI7OztnQkFFRSxhQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTs7O0FBRWxDLGlCQUFJLFlBQVksR0FBRyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUM7QUFDL0MsaUJBQUksWUFBWSxFQUFFLFNBQVMsR0FBRyxRQUFRLENBQUM7OztBQUd2QyxpQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxpQkFBSSxDQUFDLFFBQVEsRUFBRTtBQUNYLHlCQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUNqQzs7O0FBR0QsaUJBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLHFCQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7QUFFeEIsaUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRCxxQkFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTt3QkFBTSxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUs7Y0FBQSxDQUFDLENBQUM7VUFDakY7OztnQkFFRyxjQUFDLElBQUksRUFBRTtBQUNQLGlCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLGlCQUFJLFFBQVEsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1VBQ2hEOzs7WUF6RkMsZ0JBQWdCOzs7U0E2RmxCLGdCQUFnQixHQUFoQixnQkFBZ0IsQzs7Ozs7Ozs7QUN6R3BCLEtBQUksY0FBYyxHQUFHLG1CQUFPLENBQUMsQ0FBbUMsQ0FBQyxDQUFDOztBQUVsRSxlQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLEVBQUUsRUFBRTtBQUM3QyxPQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQ3hDLE9BQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFCOztBQUVELGVBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7O0FBRWpFLGVBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDckUsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7QUFHaEIsT0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBVzs7QUFFNUMsU0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDekIseUJBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLFNBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQzlCLFNBQUksUUFBUSxFQUFFO0FBQ1YsZUFBUSxFQUFFLENBQUM7TUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDOzs7QUFHSCxPQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNwQixTQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkIsTUFBTTtBQUNMLHlCQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QyxTQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakI7RUFDRjs7QUFFRCxlQUFjLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFlBQVc7Ozs7QUFFcEQsT0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ25CLFNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFFLFlBQUU7Y0FBSSxFQUFFLENBQUMsTUFBSyxHQUFHLEVBQUUsQ0FBQztNQUFBLENBQUU7SUFDaEQ7RUFDSjs7QUFFRCxlQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFXOztBQUU3QyxPQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUN6QixPQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3pGOztBQUVELE9BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDOzs7Ozs7Ozs7Ozs7Ozs7U0N6Q2YsUUFBUSxHQUFSLFFBQVE7U0FlUixRQUFRLEdBQVIsUUFBUTs7QUFmakIsVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDL0MsT0FBSSxPQUFPLENBQUM7QUFDWixVQUFPLFlBQVc7QUFDakIsU0FBSSxPQUFPLEdBQUcsSUFBSTtTQUFFLElBQUksR0FBRyxTQUFTLENBQUM7QUFDckMsU0FBSSxLQUFLLEdBQUcsaUJBQVc7QUFDdEIsY0FBTyxHQUFHLElBQUksQ0FBQztBQUNmLFdBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDMUMsQ0FBQztBQUNGLFNBQUksT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNwQyxpQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLFlBQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFNBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7RUFDRjs7QUFBQSxFQUFDOztBQUVLLFVBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0FBQzlDLGFBQVUsS0FBSyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDakMsT0FBSSxJQUFJLEVBQ0osVUFBVSxDQUFDO0FBQ2YsVUFBTyxZQUFZO0FBQ2pCLFNBQUksT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUM7O0FBRTVCLFNBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJO1NBQ2YsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQixTQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLFVBQVUsRUFBRTs7QUFFbkMsbUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN6QixpQkFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZO0FBQ2xDLGFBQUksR0FBRyxHQUFHLENBQUM7QUFDWCxXQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLFVBQVUsQ0FBQyxDQUFDO01BQ2hCLE1BQU07QUFDTCxXQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ1gsU0FBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDekI7SUFDRixDQUFDOzs7Ozs7O0FDdkNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qjs7Ozs7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsd0JBQXdCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4Qix3QkFBd0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHdCQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7OztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLGFBQWE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLGFBQWE7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxZQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxZQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkI7Ozs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qjs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCOzs7Ozs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLG9CQUFvQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCOzs7Ozs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qjs7Ozs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLDhCQUE4QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQjs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCOzs7Ozs7QUMvckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Qjs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qjs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQiIsImZpbGUiOiJGYW1vdXNBbmltYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJGYW1vdXNBbmltYXRpb25zXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkZhbW91c0FuaW1hdGlvbnNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNhNjg2NDRhMWVmNzE0MTI1MjJhXG4gKiovIiwiaW1wb3J0IHtQcm9wZXJ0eUFuaW1hdG9yfSBmcm9tICcuL2FuaW1hdG9yJztcbmltcG9ydCBUcmFuc2l0aW9uYWJsZSBmcm9tICcuL3RyYW5zaXRpb25hYmxlJztcbmltcG9ydCBFYXNpbmcgZnJvbSAnZmFtb3VzL3RyYW5zaXRpb25zL0Vhc2luZyc7XG5pbXBvcnQge2RlYm91bmNlLCB0aHJvdHRsZX0gZnJvbSAnLi91dGlsL2RlYm91bmNlJztcblxuXG5leHBvcnQge1xuICAgIHRocm90dGxlLFxuICAgIGRlYm91bmNlLFxuICAgIFByb3BlcnR5QW5pbWF0b3IsXG4gICAgVHJhbnNpdGlvbmFibGUsXG4gICAgRWFzaW5nXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBUcmFuc2l0aW9uYWJsZSBmcm9tICcuL3RyYW5zaXRpb25hYmxlJztcbmltcG9ydCBFYXNpbmcgZnJvbSAnZmFtb3VzL3RyYW5zaXRpb25zL0Vhc2luZyc7XG5cbnZhciBTcHJpbmdUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1NwcmluZ1RyYW5zaXRpb24nKTtcbnZhciBXYWxsVHJhbnNpdGlvbiA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbicpO1xudmFyIFNuYXBUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1NuYXBUcmFuc2l0aW9uJyk7XG5cbmZ1bmN0aW9uIF9lbnN1cmVWYWx1ZSh2KSB7XG4gICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQodik7XG4gICAgcmV0dXJuIGlzTmFOKHZhbCkgPyAwIDogdmFsO1xufVxuXG5jbGFzcyBQcm9wZXJ0eUFuaW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgdGhpcy5fd3JhcCA9IG9iamVjdDtcbiAgICAgICAgdGhpcy5fcHJvcHMgPSB7fTtcbiAgICB9XG5cbiAgICBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgICB9XG5cbiAgICBfZmluZFByb3AocHJvcCwgY2IpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgb3JpZ2luYWwgPSBwcm9wO1xuICAgICAgICBwcm9wID0gcHJvcC5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLl93cmFwW3Byb3BbMF1dO1xuICAgICAgICB2YXIgZ2V0dGVyLCBzZXR0ZXIsIHBhcmVudCwgaSA9IDE7XG4gICAgICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eVtwcm9wW2ldXSkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHByb3BlcnR5O1xuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gcHJvcGVydHlbcHJvcFtpXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGktMTtcbiAgICAgICAgICAgICAgICBnZXR0ZXIgPSAoKSA9PiBfZW5zdXJlVmFsdWUocGFyZW50W3Byb3BbaW5kZXhdXSk7XG4gICAgICAgICAgICAgICAgc2V0dGVyID0gdiA9PiBwYXJlbnRbcHJvcFtpbmRleF1dID0gX2Vuc3VyZVZhbHVlKHYpO1xuICAgICAgICAgICAgICAgIGNiKGdldHRlciwgc2V0dGVyKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShwcm9wKSB7XG4gICAgICAgIHRoaXMuX2ZpbmRQcm9wKHByb3AsIChnZXR0ZXIsIHNldHRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcHJvcHNbcHJvcF0gPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbmFibGU6IG5ldyBUcmFuc2l0aW9uYWJsZShnZXR0ZXIoKSksXG4gICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgICAgICAgICAgX2FjdGl2ZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9wcm9wc1twcm9wXTtcblxuICAgICAgICAvLyBQcmVwYXJlIHRoZSBsaXN0ZW5lclxuICAgICAgICByZXN1bHQudHJhbnNpdGlvbmFibGUudXBkYXRlKHYgPT4gcmVzdWx0LnNldCh2KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfcHJvdmlkZUFuaW1hdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0ge307XG4gICAgICAgIGlmIChpbnB1dC5kdXJhdGlvbikge1xuICAgICAgICAgICAgYW5pbWF0aW9uID0ge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBpbnB1dC5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICBjdXJ2ZTogaW5wdXQuYW5pbWF0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgRWFzaW5nW2lucHV0LmFuaW1hdGlvbl0gOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCgnc3ByaW5nJywgU3ByaW5nVHJhbnNpdGlvbik7XG4gICAgICAgICAgICBUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCgnd2FsbCcsIFdhbGxUcmFuc2l0aW9uKTtcbiAgICAgICAgICAgIFRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kKCdzbmFwJywgU25hcFRyYW5zaXRpb24pO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoaW5wdXQpLmZvckVhY2goayA9PiBhbmltYXRpb25ba10gPSBpbnB1dFtrXSk7XG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0IHNldHVwIG1ldGhvZCB0byBiZSBzcHJpbmdcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uLm1ldGhvZCkgYW5pbWF0aW9uLm1ldGhvZCA9IFwic3ByaW5nXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbjtcbiAgICB9XG5cbiAgICBzZXQocHJvcCwgdmFsdWUsIGR1cmF0aW9uLCBhbmltYXRpb24pIHsgLy8gRHVyYXRpb24gbWF5IG5vdCBiZSBzcGVjaWZpZWQgaWYgcGh5c2ljcyBiYXNlZCBhbmltYXRpb25cblxuICAgICAgICB2YXIgcGh5c2ljc0Jhc2VkID0gdHlwZW9mIGR1cmF0aW9uICE9IFwibnVtYmVyXCI7XG4gICAgICAgIGlmIChwaHlzaWNzQmFzZWQpIGFuaW1hdGlvbiA9IGR1cmF0aW9uO1xuXG4gICAgICAgIC8vIE9idGFpbiB0aGUgcHJvcGVydHlcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gdGhpcy5fcHJvcHNbcHJvcF07XG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gdGhpcy5hbmltYXRlKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXMgYW5pbWF0aW9uIGFjdGl2ZT9cbiAgICAgICAgaWYgKHByb3BlcnR5Ll9hY3RpdmUpIHRoaXMuaGFsdChwcm9wKTtcbiAgICAgICAgcHJvcGVydHkuX2FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHRoaXMuX3Byb3ZpZGVBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgcHJvcGVydHkudHJhbnNpdGlvbmFibGUuc2V0KHZhbHVlLCBhbmltYXRpb24sICgpID0+IHByb3BlcnR5Ll9hY3RpdmUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgaGFsdChwcm9wKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BzW3Byb3BdO1xuICAgICAgICBpZiAocHJvcGVydHkpIHByb3BlcnR5LnRyYW5zaXRpb25hYmxlLmhhbHQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgUHJvcGVydHlBbmltYXRvclxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYW5pbWF0b3IuanNcbiAqKi8iLCJ2YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcblxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGZuKSB7XG4gIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCBbXTtcbiAgdGhpcy5fbGlzdGVuZXJzLnB1c2goZm4pO1xufVxuXG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGVbXCJAQHNldFwiXSA9IFRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5zZXQ7XG5cblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihkdXJhdGlvbiwgYW5pbWF0aW9uLCBjb21wbGV0ZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gQ2FsbCB0aGUgb3JpZ2luYWwgc2V0XG4gIHNlbGZbXCJAQHNldFwiXShkdXJhdGlvbiwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAvLyBMYXN0IHRpbWUgZXhlY3V0aW9uXG4gICAgc2VsZi5fZXhlY3V0ZUxpc3RlbmVycygpO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHNlbGYuX2FuaW1hdGlvbklEKTtcbiAgICBzZWxmLl9hbmltYXRpb25JRCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBTZXR1cCBhbmltYXRpb25cbiAgaWYgKCF0aGlzLl9hbmltYXRpb25JRCkge1xuICAgICAgdGhpcy5fYW5pbWF0ZSgpO1xuICB9IGVsc2Uge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHNlbGYuX2FuaW1hdGlvbklEKTtcbiAgICB0aGlzLl9hbmltYXRlKCk7XG4gIH1cbn1cblxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLl9leGVjdXRlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gRXhlY3V0ZSBsaXN0ZW5lcnNcbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCggZm4gPT4gZm4odGhpcy5nZXQoKSkgKVxuICAgIH1cbn1cblxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLl9hbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIFJlcXVlc3QgZnJhbWVcbiAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycygpO1xuICB0aGlzLl9hbmltYXRpb25JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShUcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuX2FuaW1hdGUuYmluZCh0aGlzKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmFuc2l0aW9uYWJsZS5qc1xuICoqLyIsIi8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcbi8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcbi8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcblx0dmFyIHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdH07XG5cdFx0dmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0fTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XG4gIHZhciBsYXN0LFxuICAgICAgZGVmZXJUaW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XG5cbiAgICB2YXIgbm93ID0gK25ldyBEYXRlLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hob2xkKSB7XG4gICAgICAvLyBob2xkIG9uIHRvIGl0XG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XG4gICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfSwgdGhyZXNoaG9sZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3QgPSBub3c7XG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2RlYm91bmNlLmpzXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIEVhc2luZyA9IHtcbiAgICBpblF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIG91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAtKHQgLT0gMSkgKiB0ICsgMTtcbiAgICB9LFxuICAgIGluT3V0UXVhZDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0O1xuICAgICAgICByZXR1cm4gLTAuNSAqICgtLXQgKiAodCAtIDIpIC0gMSk7XG4gICAgfSxcbiAgICBpbkN1YmljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xuICAgIH0sXG4gICAgb3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG4gICAgfSxcbiAgICBpbk91dEN1YmljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0O1xuICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKyAyKTtcbiAgICB9LFxuICAgIGluUXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0O1xuICAgIH0sXG4gICAgb3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAtKC0tdCAqIHQgKiB0ICogdCAtIDEpO1xuICAgIH0sXG4gICAgaW5PdXRRdWFydDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgIHJldHVybiAtMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMik7XG4gICAgfSxcbiAgICBpblF1aW50OiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgfSxcbiAgICBvdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIC0tdCAqIHQgKiB0ICogdCAqIHQgKyAxO1xuICAgIH0sXG4gICAgaW5PdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpO1xuICAgIH0sXG4gICAgaW5TaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogKE1hdGguUEkgLyAyKSkgKyAxO1xuICAgIH0sXG4gICAgb3V0U2luZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICB9LFxuICAgIGluT3V0U2luZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XG4gICAgfSxcbiAgICBpbkV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgfSxcbiAgICBvdXRFeHBvOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxO1xuICAgIH0sXG4gICAgaW5PdXRFeHBvOiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKTtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xuICAgIH0sXG4gICAgaW5DaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgIH0sXG4gICAgb3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG4gICAgfSxcbiAgICBpbk91dENpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSk7XG4gICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSk7XG4gICAgfSxcbiAgICBpbkVsYXN0aWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICB2YXIgYSA9IDE7XG4gICAgICAgIGlmICh0ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIGlmICghcClcbiAgICAgICAgICAgIHAgPSAwLjM7XG4gICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgIH0sXG4gICAgb3V0RWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKHQgPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgaWYgKCFwKVxuICAgICAgICAgICAgcCA9IDAuMztcbiAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyAxO1xuICAgIH0sXG4gICAgaW5PdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAoKHQgLz0gMC41KSA9PT0gMilcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICBpZiAoIXApXG4gICAgICAgICAgICBwID0gMC4zICogMS41O1xuICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oMSAvIGEpO1xuICAgICAgICBpZiAodCA8IDEpXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogMC41ICsgMTtcbiAgICB9LFxuICAgIGluQmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICB9LFxuICAgIG91dEJhY2s6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgcmV0dXJuIC0tdCAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDE7XG4gICAgfSxcbiAgICBpbk91dEJhY2s6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpO1xuICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICB9LFxuICAgIGluQm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5vdXRCb3VuY2UoMSAtIHQpO1xuICAgIH0sXG4gICAgb3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogdCAqIHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NTtcbiAgICAgICAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAwLjkzNzU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAwLjk4NDM3NTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaW5PdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0IDwgMC41KVxuICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5pbkJvdW5jZSh0ICogMikgKiAwLjU7XG4gICAgICAgIHJldHVybiBFYXNpbmcub3V0Qm91bmNlKHQgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gRWFzaW5nO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9FYXNpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNwcmluZ1RyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG4gICAgdGhpcy5lbmRTdGF0ZSA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuUEUuYWRkQm9keSh0aGlzLnBhcnRpY2xlKTtcbiAgICB0aGlzLlBFLmF0dGFjaCh0aGlzLnNwcmluZywgdGhpcy5wYXJ0aWNsZSk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gMztcblNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC41LFxuICAgIHZlbG9jaXR5OiAwXG59O1xuZnVuY3Rpb24gX2dldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZS5nZXRFbmVyZ3koKSArIHRoaXMuc3ByaW5nLmdldEVuZXJneShbdGhpcy5wYXJ0aWNsZV0pO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUuc2V0UG9zaXRpb24ocCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5wYXJ0aWNsZS5zZXRWZWxvY2l0eSh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU3ByaW5nVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlM7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmaW5pdGlvbi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnZlbG9jaXR5ID0gZGVmYXVsdHMudmVsb2NpdHk7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kIDwgMTUwKSB7XG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gMTUwO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBwZXJpb2Qgb2YgYSBTcHJpbmdUcmFuc2l0aW9uIGlzIGNhcHBlZCBhdCAxNTAgbXMuIFVzZSBhIFNuYXBUcmFuc2l0aW9uIGZvciBmYXN0ZXIgdHJhbnNpdGlvbnMnKTtcbiAgICB9XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmaW5pdGlvbi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zLCB2ZWwpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gcG9zIGluc3RhbmNlb2YgQXJyYXkgPyBwb3MubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQocG9zKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHBvcyk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHBvcyk7XG4gICAgaWYgKHZlbClcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWwpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodikpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IGVuZFN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBlbmRTdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBlbmRTdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ByaW5nVHJhbnNpdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBQRSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvUGh5c2ljc0VuZ2luZScpO1xudmFyIFBhcnRpY2xlID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCcuLi9waHlzaWNzL2ZvcmNlcy9TcHJpbmcnKTtcbnZhciBXYWxsID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9jb25zdHJhaW50cy9XYWxsJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFdhbGxUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy53YWxsID0gbmV3IFdhbGwoKTtcbiAgICB0aGlzLl9yZXN0VG9sZXJhbmNlID0gMWUtMTA7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IDE7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IHRoaXMuX3Jlc3RUb2xlcmFuY2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5QRSA9IG5ldyBQRSgpO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2goW1xuICAgICAgICB0aGlzLndhbGwsXG4gICAgICAgIHRoaXMuc3ByaW5nXG4gICAgXSwgdGhpcy5wYXJ0aWNsZSk7XG59XG5XYWxsVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5XYWxsVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjUsXG4gICAgdmVsb2NpdHk6IDAsXG4gICAgcmVzdGl0dXRpb246IDAuNVxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICB2YXIgZGlzdCA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtKCk7XG4gICAgdGhpcy53YWxsLnNldE9wdGlvbnMoe1xuICAgICAgICBkaXN0YW5jZTogdGhpcy5lbmRTdGF0ZS5ub3JtKCksXG4gICAgICAgIG5vcm1hbDogZGlzdCA9PT0gMCA/IHRoaXMucGFydGljbGUudmVsb2NpdHkubm9ybWFsaXplKC0xKSA6IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtYWxpemUoLTEpXG4gICAgfSk7XG4gICAgX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZS5jYWxsKHRoaXMpO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUucG9zaXRpb24uc2V0KHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUudmVsb2NpdHkuc2V0KHYpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uMUQoKSA6IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24oKTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eTFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5KCk7XG59XG5mdW5jdGlvbiBfc2V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5QRS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2IgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbmVyZ3kgPSBfZ2V0RW5lcmd5LmNhbGwodGhpcyk7XG4gICAgaWYgKGVuZXJneSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgdGhpcy5lbmRTdGF0ZSk7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gV2FsbFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWYucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5wZXJpb2QgPSBkZWZhdWx0cy5wZXJpb2Q7XG4gICAgaWYgKGRlZi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmLnZlbG9jaXR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIGlmIChkZWYucmVzdGl0dXRpb24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLnJlc3RpdHV0aW9uID0gZGVmYXVsdHMucmVzdGl0dXRpb247XG4gICAgaWYgKGRlZi5kcmlmdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYuZHJpZnQgPSBXYWxsLkRFRkFVTFRfT1BUSU9OUy5kcmlmdDtcbiAgICBpZiAoZGVmLnNsb3AgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLnNsb3AgPSBXYWxsLkRFRkFVTFRfT1BUSU9OUy5zbG9wO1xuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmLmRhbXBpbmdSYXRpb1xuICAgIH0pO1xuICAgIHRoaXMud2FsbC5zZXRPcHRpb25zKHtcbiAgICAgICAgcmVzdGl0dXRpb246IGRlZi5yZXN0aXR1dGlvbixcbiAgICAgICAgZHJpZnQ6IGRlZi5kcmlmdCxcbiAgICAgICAgc2xvcDogZGVmLnNsb3BcbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZi52ZWxvY2l0eSk7XG59XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGF0ZSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHN0YXRlKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBpZiAodmVsb2NpdHkpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsb2NpdHkpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMuY2FsbCh0aGlzLCBfc2V0UGFydGljbGVWZWxvY2l0eSh2ZWxvY2l0eSkpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoc3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoc3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFdhbGxUcmFuc2l0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBQRSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvUGh5c2ljc0VuZ2luZScpO1xudmFyIFBhcnRpY2xlID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCcuLi9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU25hcFRyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG4gICAgdGhpcy5lbmRTdGF0ZSA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSAxO1xuICAgIHRoaXMuX3Jlc3RUb2xlcmFuY2UgPSAxZS0xMDtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gdGhpcy5fcmVzdFRvbGVyYW5jZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLlBFID0gbmV3IFBFKCk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuc3ByaW5nID0gbmV3IFNwcmluZyh7IGFuY2hvcjogdGhpcy5lbmRTdGF0ZSB9KTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuU25hcFRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSAzO1xuU25hcFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMTAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4yLFxuICAgIHZlbG9jaXR5OiAwXG59O1xuZnVuY3Rpb24gX2dldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZS5nZXRFbmVyZ3koKSArIHRoaXMuc3ByaW5nLmdldEVuZXJneShbdGhpcy5wYXJ0aWNsZV0pO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmaW5pdGlvbi5wZXJpb2QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5wZXJpb2QgPSBkZWZhdWx0cy5wZXJpb2Q7XG4gICAgaWYgKGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID0gZGVmYXVsdHMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChkZWZpbml0aW9uLnZlbG9jaXR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24udmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiBkZWZpbml0aW9uLnBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiBkZWZpbml0aW9uLmRhbXBpbmdSYXRpb1xuICAgIH0pO1xuICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgZGVmaW5pdGlvbi52ZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXRlLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQoc3RhdGUpO1xuICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgaWYgKHZlbG9jaXR5KVxuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIHZlbG9jaXR5KTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHZlbG9jaXR5KSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcyk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChzdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU25hcFRyYW5zaXRpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3RyYW5zaXRpb25zL1NuYXBUcmFuc2l0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIE11bHRpcGxlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVUcmFuc2l0aW9uJyk7XG52YXIgVHdlZW5UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9Ud2VlblRyYW5zaXRpb24nKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlKHN0YXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5zZXQoc3RhcnQpO1xufVxudmFyIHRyYW5zaXRpb25NZXRob2RzID0ge307XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKG1ldGhvZHMpIHtcbiAgICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgaWYgKCFUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZChtZXRob2QsIG1ldGhvZHNbbWV0aG9kXSkpXG4gICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdWNjZXNzO1xufTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2QobmFtZSwgZW5naW5lQ2xhc3MpIHtcbiAgICBpZiAoIShuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSkge1xuICAgICAgICB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXSA9IGVuZ2luZUNsYXNzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcblRyYW5zaXRpb25hYmxlLnVucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTWV0aG9kKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykge1xuICAgICAgICBkZWxldGUgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gX2xvYWROZXh0KCkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGlvblF1ZXVlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMuYWN0aW9uUXVldWUuc2hpZnQoKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tRdWV1ZS5zaGlmdCgpO1xuICAgIHZhciBtZXRob2QgPSBudWxsO1xuICAgIHZhciBlbmRWYWx1ZSA9IHRoaXMuY3VycmVudEFjdGlvblswXTtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IHRoaXMuY3VycmVudEFjdGlvblsxXTtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2l0aW9uLm1ldGhvZCkge1xuICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uLm1ldGhvZDtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbk1ldGhvZHNbbWV0aG9kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2QgPSBUd2VlblRyYW5zaXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9jdXJyZW50TWV0aG9kICE9PSBtZXRob2QpIHtcbiAgICAgICAgaWYgKCEoZW5kVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSA9PT0gdHJ1ZSB8fCBlbmRWYWx1ZS5sZW5ndGggPD0gbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBtZXRob2QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBtZXRob2Q7XG4gICAgfVxuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnJlc2V0KHRoaXMuc3RhdGUsIHRoaXMudmVsb2NpdHkpO1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24udmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgX2xvYWROZXh0LmJpbmQodGhpcykpO1xufVxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uID0gW1xuICAgICAgICBlbmRTdGF0ZSxcbiAgICAgICAgdHJhbnNpdGlvblxuICAgIF07XG4gICAgdGhpcy5hY3Rpb25RdWV1ZS5wdXNoKGFjdGlvbik7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmICghdGhpcy5jdXJyZW50QWN0aW9uKVxuICAgICAgICBfbG9hZE5leHQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSBzdGFydFN0YXRlO1xuICAgIHRoaXMudmVsb2NpdHkgPSBzdGFydFZlbG9jaXR5O1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBlbmRWYWx1ZTtcbiAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGgpXG4gICAgICAgIGVuZFZhbHVlID0gdGhpcy5hY3Rpb25RdWV1ZVt0aGlzLmFjdGlvblF1ZXVlLmxlbmd0aCAtIDFdWzBdO1xuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudEFjdGlvbilcbiAgICAgICAgZW5kVmFsdWUgPSB0aGlzLmN1cnJlbnRBY3Rpb25bMF07XG4gICAgZWxzZVxuICAgICAgICBlbmRWYWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgcmV0dXJuIHRoaXMuc2V0KGVuZFZhbHVlLCB7XG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgY3VydmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSwgY2FsbGJhY2spO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQodGltZXN0YW1wKSB7XG4gICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSlcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0KHRpbWVzdGFtcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudEFjdGlvbjtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gTXVsdGlwbGVUcmFuc2l0aW9uKG1ldGhvZCkge1xuICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgIHRoaXMuX2luc3RhbmNlcyA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSBbXTtcbn1cbk11bHRpcGxlVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IHRydWU7XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2luc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnN0YXRlW2ldID0gdGhpcy5faW5zdGFuY2VzW2ldLmdldCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgX2FsbENhbGxiYWNrID0gVXRpbGl0eS5hZnRlcihlbmRTdGF0ZS5sZW5ndGgsIGNhbGxiYWNrKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZFN0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VzW2ldKVxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldID0gbmV3IHRoaXMubWV0aG9kKCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5zZXQoZW5kU3RhdGVbaV0sIHRyYW5zaXRpb24sIF9hbGxDYWxsYmFjayk7XG4gICAgfVxufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydFN0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VzW2ldKVxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldID0gbmV3IHRoaXMubWV0aG9kKCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5yZXNldChzdGFydFN0YXRlW2ldKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZVRyYW5zaXRpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbmZ1bmN0aW9uIFR3ZWVuVHJhbnNpdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShUd2VlblRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IDA7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSAwO1xuICAgIHRoaXMuX2N1cnZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdW5kZWZpbmVkO1xufVxuVHdlZW5UcmFuc2l0aW9uLkN1cnZlcyA9IHtcbiAgICBsaW5lYXI6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgIH0sXG4gICAgZWFzZUluOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgfSxcbiAgICBlYXNlT3V0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgyIC0gdCk7XG4gICAgfSxcbiAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0IDw9IDAuNSlcbiAgICAgICAgICAgIHJldHVybiAyICogdCAqIHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAtMiAqIHQgKiB0ICsgNCAqIHQgLSAxO1xuICAgIH0sXG4gICAgZWFzZU91dEJvdW5jZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiAoMyAtIDIgKiB0KTtcbiAgICB9LFxuICAgIHNwcmluZzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuICgxIC0gdCkgKiBNYXRoLnNpbig2ICogTWF0aC5QSSAqIHQpICsgdDtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcblR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY3VydmU6IFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyLFxuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgc3BlZWQ6IDBcbn07XG52YXIgcmVnaXN0ZXJlZEN1cnZlcyA9IHt9O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiByZWdpc3RlckN1cnZlKGN1cnZlTmFtZSwgY3VydmUpIHtcbiAgICBpZiAoIXJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0gPSBjdXJ2ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24udW5yZWdpc3RlckN1cnZlID0gZnVuY3Rpb24gdW5yZWdpc3RlckN1cnZlKGN1cnZlTmFtZSkge1xuICAgIGlmIChyZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0pIHtcbiAgICAgICAgZGVsZXRlIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uZ2V0Q3VydmUgPSBmdW5jdGlvbiBnZXRDdXJ2ZShjdXJ2ZU5hbWUpIHtcbiAgICB2YXIgY3VydmUgPSByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV07XG4gICAgaWYgKGN1cnZlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBjdXJ2ZTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY3VydmUgbm90IHJlZ2lzdGVyZWQnKTtcbn07XG5Ud2VlblRyYW5zaXRpb24uZ2V0Q3VydmVzID0gZnVuY3Rpb24gZ2V0Q3VydmVzKCkge1xuICAgIHJldHVybiByZWdpc3RlcmVkQ3VydmVzO1xufTtcbmZ1bmN0aW9uIF9pbnRlcnBvbGF0ZShhLCBiLCB0KSB7XG4gICAgcmV0dXJuICgxIC0gdCkgKiBhICsgdCAqIGI7XG59XG5mdW5jdGlvbiBfY2xvbmUob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gb2JqLnNsaWNlKDApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShvYmopO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZSh0cmFuc2l0aW9uLCBkZWZhdWx0VHJhbnNpdGlvbikge1xuICAgIHZhciByZXN1bHQgPSB7IGN1cnZlOiBkZWZhdWx0VHJhbnNpdGlvbi5jdXJ2ZSB9O1xuICAgIGlmIChkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbilcbiAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gZGVmYXVsdFRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICByZXN1bHQuc3BlZWQgPSBkZWZhdWx0VHJhbnNpdGlvbi5zcGVlZDtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gdHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uY3VydmUpXG4gICAgICAgICAgICByZXN1bHQuY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5zcGVlZClcbiAgICAgICAgICAgIHJlc3VsdC5zcGVlZCA9IHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0LmN1cnZlID09PSAnc3RyaW5nJylcbiAgICAgICAgcmVzdWx0LmN1cnZlID0gVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlKHJlc3VsdC5jdXJ2ZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmN1cnZlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5jdXJ2ZSA9IG9wdGlvbnMuY3VydmU7XG4gICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICBpZiAob3B0aW9ucy5zcGVlZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuc3BlZWQgPSBvcHRpb25zLnNwZWVkO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFZhbHVlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KGVuZFZhbHVlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zdGFydFZhbHVlID0gX2Nsb25lKHRoaXMuZ2V0KCkpO1xuICAgIHRyYW5zaXRpb24gPSBfbm9ybWFsaXplKHRyYW5zaXRpb24sIHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpIHtcbiAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICBpZiAoc3RhcnRWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhcmlhbmNlID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3RhcnRWYWx1ZSlcbiAgICAgICAgICAgICAgICB2YXJpYW5jZSArPSAoZW5kVmFsdWVbaV0gLSBzdGFydFZhbHVlW2ldKSAqIChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5kdXJhdGlvbiA9IE1hdGguc3FydCh2YXJpYW5jZSkgLyB0cmFuc2l0aW9uLnNwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5kdXJhdGlvbiA9IE1hdGguYWJzKGVuZFZhbHVlIC0gc3RhcnRWYWx1ZSkgLyB0cmFuc2l0aW9uLnNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSBfY2xvbmUoZW5kVmFsdWUpO1xuICAgIHRoaXMuX3N0YXJ0VmVsb2NpdHkgPSBfY2xvbmUodHJhbnNpdGlvbi52ZWxvY2l0eSk7XG4gICAgdGhpcy5fZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgIHRoaXMuX2N1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0VmFsdWUsIHN0YXJ0VmVsb2NpdHkpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gX2Nsb25lKHN0YXJ0VmFsdWUpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBfY2xvbmUoc3RhcnRWZWxvY2l0eSk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IDA7XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICB0aGlzLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbmZ1bmN0aW9uIF9jYWxjdWxhdGVWZWxvY2l0eShjdXJyZW50LCBzdGFydCwgY3VydmUsIGR1cmF0aW9uLCB0KSB7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIHZhciBlcHMgPSAxZS03O1xuICAgIHZhciBzcGVlZCA9IChjdXJ2ZSh0KSAtIGN1cnZlKHQgLSBlcHMpKSAvIGVwcztcbiAgICBpZiAoY3VycmVudCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZlbG9jaXR5ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eVtpXSA9IHNwZWVkICogKGN1cnJlbnRbaV0gLSBzdGFydFtpXSkgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eVtpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2VcbiAgICAgICAgdmVsb2NpdHkgPSBzcGVlZCAqIChjdXJyZW50IC0gc3RhcnQpIC8gZHVyYXRpb247XG4gICAgcmV0dXJuIHZlbG9jaXR5O1xufVxuZnVuY3Rpb24gX2NhbGN1bGF0ZVN0YXRlKHN0YXJ0LCBlbmQsIHQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKHN0YXJ0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgc3RhdGUgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydFtpXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBfaW50ZXJwb2xhdGUoc3RhcnRbaV0sIGVuZFtpXSwgdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBzdGFydFtpXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICBzdGF0ZSA9IF9pbnRlcnBvbGF0ZShzdGFydCwgZW5kLCB0KTtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSh0aW1lc3RhbXApIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aW1lc3RhbXApXG4gICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMuX3VwZGF0ZVRpbWUgPj0gdGltZXN0YW1wKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IHRpbWVzdGFtcDtcbiAgICB2YXIgdGltZVNpbmNlU3RhcnQgPSB0aW1lc3RhbXAgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgaWYgKHRpbWVTaW5jZVN0YXJ0ID49IHRoaXMuX2R1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmRWYWx1ZTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIDEpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRpbWVTaW5jZVN0YXJ0IDwgMCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fc3RhcnRWYWx1ZTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX3N0YXJ0VmVsb2NpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSB0aW1lU2luY2VTdGFydCAvIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gX2NhbGN1bGF0ZVN0YXRlKHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2VuZFZhbHVlLCB0aGlzLl9jdXJ2ZSh0KSk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBfY2FsY3VsYXRlVmVsb2NpdHkodGhpcy5zdGF0ZSwgdGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fY3VydmUsIHRoaXMuX2R1cmF0aW9uLCB0KTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnJlc2V0KHRoaXMuZ2V0KCkpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdsaW5lYXInLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmxpbmVhcik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW4pO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXQnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VJbk91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZUluT3V0KTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlT3V0Qm91bmNlJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlT3V0Qm91bmNlKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdzcHJpbmcnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLnNwcmluZyk7XG5Ud2VlblRyYW5zaXRpb24uY3VzdG9tQ3VydmUgPSBmdW5jdGlvbiBjdXN0b21DdXJ2ZSh2MSwgdjIpIHtcbiAgICB2MSA9IHYxIHx8IDA7XG4gICAgdjIgPSB2MiB8fCAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdjEgKiB0ICsgKC0yICogdjEgLSB2MiArIDMpICogdCAqIHQgKyAodjEgKyB2MiAtIDIpICogdCAqIHQgKiB0O1xuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUd2VlblRyYW5zaXRpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3RyYW5zaXRpb25zL1R3ZWVuVHJhbnNpdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIFBoeXNpY3NFbmdpbmUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGFydGljbGVzID0gW107XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gICAgdGhpcy5fYWdlbnREYXRhID0ge307XG4gICAgdGhpcy5fZm9yY2VzID0gW107XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBbXTtcbiAgICB0aGlzLl9idWZmZXIgPSAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xuICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG59XG52YXIgVElNRVNURVAgPSAxNztcbnZhciBNSU5fVElNRV9TVEVQID0gMTAwMCAvIDEyMDtcbnZhciBNQVhfVElNRV9TVEVQID0gMTc7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG52YXIgX2V2ZW50cyA9IHtcbiAgICBzdGFydDogJ3N0YXJ0JyxcbiAgICB1cGRhdGU6ICd1cGRhdGUnLFxuICAgIGVuZDogJ2VuZCdcbn07XG5QaHlzaWNzRW5naW5lLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjb25zdHJhaW50U3RlcHM6IDEsXG4gICAgc2xlZXBUb2xlcmFuY2U6IDFlLTcsXG4gICAgdmVsb2NpdHlDYXA6IHVuZGVmaW5lZCxcbiAgICBhbmd1bGFyVmVsb2NpdHlDYXA6IHVuZGVmaW5lZFxufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1trZXldKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYWRkQm9keSA9IGZ1bmN0aW9uIGFkZEJvZHkoYm9keSkge1xuICAgIGJvZHkuX2VuZ2luZSA9IHRoaXM7XG4gICAgaWYgKGJvZHkuaXNCb2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgICB0aGlzLl9oYXNCb2RpZXMgPSB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICB0aGlzLl9wYXJ0aWNsZXMucHVzaChib2R5KTtcbiAgICBib2R5Lm9uKCdzdGFydCcsIHRoaXMud2FrZS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gYm9keTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5yZW1vdmVCb2R5ID0gZnVuY3Rpb24gcmVtb3ZlQm9keShib2R5KSB7XG4gICAgdmFyIGFycmF5ID0gYm9keS5pc0JvZHkgPyB0aGlzLl9ib2RpZXMgOiB0aGlzLl9wYXJ0aWNsZXM7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihib2R5KTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBmb3IgKHZhciBhZ2VudEtleSBpbiB0aGlzLl9hZ2VudERhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hZ2VudERhdGEuaGFzT3duUHJvcGVydHkoYWdlbnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hGcm9tKHRoaXMuX2FnZW50RGF0YVthZ2VudEtleV0uaWQsIGJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldEJvZGllcygpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5faGFzQm9kaWVzID0gZmFsc2U7XG59O1xuZnVuY3Rpb24gX21hcEFnZW50QXJyYXkoYWdlbnQpIHtcbiAgICBpZiAoYWdlbnQuYXBwbHlGb3JjZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcmNlcztcbiAgICBpZiAoYWdlbnQuYXBwbHlDb25zdHJhaW50KVxuICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RyYWludHM7XG59XG5mdW5jdGlvbiBfYXR0YWNoT25lKGFnZW50LCB0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICBpZiAodGFyZ2V0cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0YXJnZXRzID0gdGhpcy5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKTtcbiAgICBpZiAoISh0YXJnZXRzIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgICB0YXJnZXRzID0gW3RhcmdldHNdO1xuICAgIGFnZW50Lm9uKCdjaGFuZ2UnLCB0aGlzLndha2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYWdlbnREYXRhW3RoaXMuX2N1cnJBZ2VudElkXSA9IHtcbiAgICAgICAgYWdlbnQ6IGFnZW50LFxuICAgICAgICBpZDogdGhpcy5fY3VyckFnZW50SWQsXG4gICAgICAgIHRhcmdldHM6IHRhcmdldHMsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfTtcbiAgICBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KS5wdXNoKHRoaXMuX2N1cnJBZ2VudElkKTtcbiAgICByZXR1cm4gdGhpcy5fY3VyckFnZW50SWQrKztcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaChhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHRoaXMud2FrZSgpO1xuICAgIGlmIChhZ2VudHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YXIgYWdlbnRJRHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBhZ2VudElEc1tpXSA9IF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHNbaV0sIHRhcmdldHMsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBhZ2VudElEcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYXR0YWNoVG8gPSBmdW5jdGlvbiBhdHRhY2hUbyhhZ2VudElELCB0YXJnZXQpIHtcbiAgICBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgYWdlbnRJRCkudGFyZ2V0cy5wdXNoKHRhcmdldCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gZGV0YWNoKGlkKSB7XG4gICAgdmFyIGFnZW50ID0gdGhpcy5nZXRBZ2VudChpZCk7XG4gICAgdmFyIGFnZW50QXJyYXkgPSBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KTtcbiAgICB2YXIgaW5kZXggPSBhZ2VudEFycmF5LmluZGV4T2YoaWQpO1xuICAgIGFnZW50QXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fYWdlbnREYXRhW2lkXTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2hGcm9tID0gZnVuY3Rpb24gZGV0YWNoRnJvbShpZCwgdGFyZ2V0KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgaWQpO1xuICAgIGlmIChib3VuZEFnZW50LnNvdXJjZSA9PT0gdGFyZ2V0KVxuICAgICAgICB0aGlzLmRldGFjaChpZCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXRzID0gYm91bmRBZ2VudC50YXJnZXRzO1xuICAgICAgICB2YXIgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YodGFyZ2V0KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpXG4gICAgICAgICAgICB0YXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaEFsbCA9IGZ1bmN0aW9uIGRldGFjaEFsbCgpIHtcbiAgICB0aGlzLl9hZ2VudERhdGEgPSB7fTtcbiAgICB0aGlzLl9mb3JjZXMgPSBbXTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyA9IFtdO1xuICAgIHRoaXMuX2N1cnJBZ2VudElkID0gMDtcbn07XG5mdW5jdGlvbiBfZ2V0QWdlbnREYXRhKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FnZW50RGF0YVtpZF07XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudCA9IGZ1bmN0aW9uIGdldEFnZW50KGlkKSB7XG4gICAgcmV0dXJuIF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBpZCkuYWdlbnQ7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0UGFydGljbGVzID0gZnVuY3Rpb24gZ2V0UGFydGljbGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJ0aWNsZXM7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0Qm9kaWVzID0gZnVuY3Rpb24gZ2V0Qm9kaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9ib2RpZXM7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0UGFydGljbGVzQW5kQm9kaWVzID0gZnVuY3Rpb24gZ2V0UGFydGljbGVzQW5kQm9kaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBhcnRpY2xlcygpLmNvbmNhdCh0aGlzLmdldEJvZGllcygpKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoUGFydGljbGUgPSBmdW5jdGlvbiBmb3JFYWNoUGFydGljbGUoZm4sIGR0KSB7XG4gICAgdmFyIHBhcnRpY2xlcyA9IHRoaXMuZ2V0UGFydGljbGVzKCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW4gPSBwYXJ0aWNsZXMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKylcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBwYXJ0aWNsZXNbaW5kZXhdLCBkdCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaEJvZHkgPSBmdW5jdGlvbiBmb3JFYWNoQm9keShmbiwgZHQpIHtcbiAgICBpZiAoIXRoaXMuX2hhc0JvZGllcylcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBib2RpZXMgPSB0aGlzLmdldEJvZGllcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gYm9kaWVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgYm9kaWVzW2luZGV4XSwgZHQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuLCBkdCkge1xuICAgIHRoaXMuZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShmbiwgZHQpO1xufTtcbmZ1bmN0aW9uIF91cGRhdGVGb3JjZShpbmRleCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIHRoaXMuX2ZvcmNlc1tpbmRleF0pO1xuICAgIGJvdW5kQWdlbnQuYWdlbnQuYXBwbHlGb3JjZShib3VuZEFnZW50LnRhcmdldHMsIGJvdW5kQWdlbnQuc291cmNlKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVGb3JjZXMoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSB0aGlzLl9mb3JjZXMubGVuZ3RoIC0gMTsgaW5kZXggPiAtMTsgaW5kZXgtLSlcbiAgICAgICAgX3VwZGF0ZUZvcmNlLmNhbGwodGhpcywgaW5kZXgpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUNvbnN0cmFpbnQoaW5kZXgsIGR0KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSB0aGlzLl9hZ2VudERhdGFbdGhpcy5fY29uc3RyYWludHNbaW5kZXhdXTtcbiAgICByZXR1cm4gYm91bmRBZ2VudC5hZ2VudC5hcHBseUNvbnN0cmFpbnQoYm91bmRBZ2VudC50YXJnZXRzLCBib3VuZEFnZW50LnNvdXJjZSwgZHQpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUNvbnN0cmFpbnRzKGR0KSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IDA7XG4gICAgd2hpbGUgKGl0ZXJhdGlvbiA8IHRoaXMub3B0aW9ucy5jb25zdHJhaW50U3RlcHMpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSB0aGlzLl9jb25zdHJhaW50cy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICAgICAgX3VwZGF0ZUNvbnN0cmFpbnQuY2FsbCh0aGlzLCBpbmRleCwgZHQpO1xuICAgICAgICBpdGVyYXRpb24rKztcbiAgICB9XG59XG5mdW5jdGlvbiBfdXBkYXRlVmVsb2NpdGllcyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlVmVsb2NpdHkoZHQpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudmVsb2NpdHlDYXApXG4gICAgICAgIGJvZHkudmVsb2NpdHkuY2FwKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcCkucHV0KGJvZHkudmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUFuZ3VsYXJWZWxvY2l0aWVzKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0oZHQpO1xuICAgIGJvZHkudXBkYXRlQW5ndWxhclZlbG9jaXR5KCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApXG4gICAgICAgIGJvZHkuYW5ndWxhclZlbG9jaXR5LmNhcCh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKS5wdXQoYm9keS5hbmd1bGFyVmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZU9yaWVudGF0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZVBvc2l0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlUG9zaXRpb24oZHQpO1xuICAgIGJvZHkuZW1pdChfZXZlbnRzLnVwZGF0ZSwgYm9keSk7XG59XG5mdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgX3VwZGF0ZUZvcmNlcy5jYWxsKHRoaXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2goX3VwZGF0ZVZlbG9jaXRpZXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KF91cGRhdGVBbmd1bGFyVmVsb2NpdGllcywgZHQpO1xuICAgIF91cGRhdGVDb25zdHJhaW50cy5jYWxsKHRoaXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KF91cGRhdGVPcmllbnRhdGlvbnMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2goX3VwZGF0ZVBvc2l0aW9ucywgZHQpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlc0VuZXJneSgpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICB2YXIgcGFydGljbGVFbmVyZ3kgPSAwO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAocGFydGljbGUpIHtcbiAgICAgICAgcGFydGljbGVFbmVyZ3kgPSBwYXJ0aWNsZS5nZXRFbmVyZ3koKTtcbiAgICAgICAgZW5lcmd5ICs9IHBhcnRpY2xlRW5lcmd5O1xuICAgIH0pO1xuICAgIHJldHVybiBlbmVyZ3k7XG59XG5mdW5jdGlvbiBfZ2V0QWdlbnRzRW5lcmd5KCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2FnZW50RGF0YSlcbiAgICAgICAgZW5lcmd5ICs9IHRoaXMuZ2V0QWdlbnRFbmVyZ3koaWQpO1xuICAgIHJldHVybiBlbmVyZ3k7XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudEVuZXJneSA9IGZ1bmN0aW9uIChhZ2VudElkKSB7XG4gICAgdmFyIGFnZW50RGF0YSA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBhZ2VudElkKTtcbiAgICByZXR1cm4gYWdlbnREYXRhLmFnZW50LmdldEVuZXJneShhZ2VudERhdGEudGFyZ2V0cywgYWdlbnREYXRhLnNvdXJjZSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVzRW5lcmd5LmNhbGwodGhpcykgKyBfZ2V0QWdlbnRzRW5lcmd5LmNhbGwodGhpcyk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuaXNTbGVlcGluZygpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGN1cnJUaW1lID0gbm93KCk7XG4gICAgdmFyIGR0RnJhbWUgPSBjdXJyVGltZSAtIHRoaXMuX3ByZXZUaW1lO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gY3VyclRpbWU7XG4gICAgaWYgKGR0RnJhbWUgPCBNSU5fVElNRV9TVEVQKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGR0RnJhbWUgPiBNQVhfVElNRV9TVEVQKVxuICAgICAgICBkdEZyYW1lID0gTUFYX1RJTUVfU1RFUDtcbiAgICBfaW50ZWdyYXRlLmNhbGwodGhpcywgVElNRVNURVApO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnVwZGF0ZSwgdGhpcyk7XG4gICAgaWYgKHRoaXMuZ2V0RW5lcmd5KCkgPCB0aGlzLm9wdGlvbnMuc2xlZXBUb2xlcmFuY2UpXG4gICAgICAgIHRoaXMuc2xlZXAoKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5pc1NsZWVwaW5nID0gZnVuY3Rpb24gaXNTbGVlcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTbGVlcGluZztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzU2xlZXBpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNsZWVwID0gZnVuY3Rpb24gc2xlZXAoKSB7XG4gICAgaWYgKHRoaXMuX2lzU2xlZXBpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgYm9keS5zbGVlcCgpO1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy5zdGFydCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyID09PSBudWxsKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4pIHtcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyID09PSBudWxsKVxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLm9uKGV2ZW50LCBmbik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzRW5naW5lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIEludGVncmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlZ3JhdG9ycy9TeW1wbGVjdGljRXVsZXInKTtcbmZ1bmN0aW9uIFBhcnRpY2xlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgZGVmYXVsdHMgPSBQYXJ0aWNsZS5ERUZBVUxUX09QVElPTlM7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5fZW5naW5lID0gbnVsbDtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG51bGw7XG4gICAgdGhpcy5tYXNzID0gb3B0aW9ucy5tYXNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1hc3MgOiBkZWZhdWx0cy5tYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ob3B0aW9ucy5wb3NpdGlvbiB8fCBkZWZhdWx0cy5wb3NpdGlvbik7XG4gICAgdGhpcy5zZXRWZWxvY2l0eShvcHRpb25zLnZlbG9jaXR5IHx8IGRlZmF1bHRzLnZlbG9jaXR5KTtcbiAgICB0aGlzLmZvcmNlLnNldChvcHRpb25zLmZvcmNlIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMudHJhbnNmb3JtID0gVHJhbnNmb3JtLmlkZW50aXR5LnNsaWNlKCk7XG4gICAgdGhpcy5fc3BlYyA9IHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgXSxcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMudHJhbnNmb3JtLFxuICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRhcmdldDogbnVsbFxuICAgICAgICB9XG4gICAgfTtcbn1cblBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwb3NpdGlvbjogW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICB2ZWxvY2l0eTogW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBtYXNzOiAxXG59O1xudmFyIF9ldmVudHMgPSB7XG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgdXBkYXRlOiAndXBkYXRlJyxcbiAgICBlbmQ6ICdlbmQnXG59O1xudmFyIG5vdyA9IERhdGUubm93O1xuUGFydGljbGUucHJvdG90eXBlLmlzQm9keSA9IGZhbHNlO1xuUGFydGljbGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIGlmICh0aGlzLl9lbmdpbmUpXG4gICAgICAgIHRoaXMuX2VuZ2luZS53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbik7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBzZXRQb3NpdGlvbjFEKHgpIHtcbiAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBnZXRQb3NpdGlvbjFEKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMudmVsb2NpdHkuc2V0KHZlbG9jaXR5KTtcbiAgICBpZiAoISh2ZWxvY2l0eVswXSA9PT0gMCAmJiB2ZWxvY2l0eVsxXSA9PT0gMCAmJiB2ZWxvY2l0eVsyXSA9PT0gMCkpXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICBpZiAoeCAhPT0gMClcbiAgICAgICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHkuZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldEZvcmNlID0gZnVuY3Rpb24gc2V0Rm9yY2UoZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlLnNldChmb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5MUQgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eTFEKCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldE1hc3MgPSBmdW5jdGlvbiBzZXRNYXNzKG1hc3MpIHtcbiAgICB0aGlzLm1hc3MgPSBtYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gbWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0TWFzcyA9IGZ1bmN0aW9uIGdldE1hc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChwb3NpdGlvbiwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkodmVsb2NpdHkgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JjZS5hZGQoZm9yY2UpLnB1dCh0aGlzLmZvcmNlKTtcbiAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuYXBwbHlJbXB1bHNlID0gZnVuY3Rpb24gYXBwbHlJbXB1bHNlKGltcHVsc2UpIHtcbiAgICBpZiAoaW1wdWxzZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdmVsb2NpdHkuYWRkKGltcHVsc2UubXVsdCh0aGlzLmludmVyc2VNYXNzKSkucHV0KHZlbG9jaXR5KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlVmVsb2NpdHkodGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGR0KSB7XG4gICAgSW50ZWdyYXRvci5pbnRlZ3JhdGVQb3NpdGlvbih0aGlzLCBkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLl9pbnRlZ3JhdGUgPSBmdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgdGhpcy5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMC41ICogdGhpcy5tYXNzICogdGhpcy52ZWxvY2l0eS5ub3JtU3F1YXJlZCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICB0cmFuc2Zvcm1bMTJdID0gcG9zaXRpb24ueDtcbiAgICB0cmFuc2Zvcm1bMTNdID0gcG9zaXRpb24ueTtcbiAgICB0cmFuc2Zvcm1bMTRdID0gcG9zaXRpb24uejtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIF9zcGVjID0gdGhpcy5fc3BlYy50YXJnZXQ7XG4gICAgX3NwZWMudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICBfc3BlYy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWM7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblBhcnRpY2xlLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE91dHB1dClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTbmFwKG9wdGlvbnMpIHtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLnBEaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudkRpZmYgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlMSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UyID0gbmV3IFZlY3RvcigpO1xufVxuU25hcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcblNuYXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU25hcDtcblNuYXAuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4xLFxuICAgIGxlbmd0aDogMCxcbiAgICBhbmNob3I6IHVuZGVmaW5lZFxufTtcbnZhciBwaSA9IE1hdGguUEk7XG5TbmFwLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuYW5jaG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3Iob3B0aW9ucy5hbmNob3IpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGlmIChvcHRpb25zLmRhbXBpbmdSYXRpbyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICBDb25zdHJhaW50LnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG59O1xuU25hcC5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yIHx8IHNvdXJjZS5wb3NpdGlvbjtcbiAgICB2YXIgc3RyZW5ndGggPSBNYXRoLnBvdygyICogcGkgLyBvcHRpb25zLnBlcmlvZCwgMik7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgZGlzdCA9IGFuY2hvci5zdWIodGFyZ2V0LnBvc2l0aW9uKS5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBlbmVyZ3kgKz0gMC41ICogc3RyZW5ndGggKiBkaXN0ICogZGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZXJneTtcbn07XG5TbmFwLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBwRGlmZiA9IHRoaXMucERpZmY7XG4gICAgdmFyIHZEaWZmID0gdGhpcy52RGlmZjtcbiAgICB2YXIgaW1wdWxzZTEgPSB0aGlzLmltcHVsc2UxO1xuICAgIHZhciBpbXB1bHNlMiA9IHRoaXMuaW1wdWxzZTI7XG4gICAgdmFyIGxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIHZhciBkYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciBwMSA9IHRhcmdldC5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHYxID0gdGFyZ2V0LnZlbG9jaXR5O1xuICAgICAgICB2YXIgbTEgPSB0YXJnZXQubWFzcztcbiAgICAgICAgdmFyIHcxID0gdGFyZ2V0LmludmVyc2VNYXNzO1xuICAgICAgICBwRGlmZi5zZXQocDEuc3ViKGFuY2hvcikpO1xuICAgICAgICB2YXIgZGlzdCA9IHBEaWZmLm5vcm0oKSAtIGxlbmd0aDtcbiAgICAgICAgdmFyIGVmZk1hc3M7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciB3MiA9IHNvdXJjZS5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgIHZhciB2MiA9IHNvdXJjZS52ZWxvY2l0eTtcbiAgICAgICAgICAgIHZEaWZmLnNldCh2MS5zdWIodjIpKTtcbiAgICAgICAgICAgIGVmZk1hc3MgPSAxIC8gKHcxICsgdzIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdkRpZmYuc2V0KHYxKTtcbiAgICAgICAgICAgIGVmZk1hc3MgPSBtMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2FtbWE7XG4gICAgICAgIHZhciBiZXRhO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBlcmlvZCA9PT0gMCkge1xuICAgICAgICAgICAgZ2FtbWEgPSAwO1xuICAgICAgICAgICAgYmV0YSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgayA9IDQgKiBlZmZNYXNzICogcGkgKiBwaSAvIChwZXJpb2QgKiBwZXJpb2QpO1xuICAgICAgICAgICAgdmFyIGMgPSA0ICogZWZmTWFzcyAqIHBpICogZGFtcGluZ1JhdGlvIC8gcGVyaW9kO1xuICAgICAgICAgICAgYmV0YSA9IGR0ICogayAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgICAgIGdhbW1hID0gMSAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW50aURyaWZ0ID0gYmV0YSAvIGR0ICogZGlzdDtcbiAgICAgICAgcERpZmYubm9ybWFsaXplKC1hbnRpRHJpZnQpLnN1Yih2RGlmZikubXVsdChkdCAvIChnYW1tYSArIGR0IC8gZWZmTWFzcykpLnB1dChpbXB1bHNlMSk7XG4gICAgICAgIHRhcmdldC5hcHBseUltcHVsc2UoaW1wdWxzZTEpO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBpbXB1bHNlMS5tdWx0KC0xKS5wdXQoaW1wdWxzZTIpO1xuICAgICAgICAgICAgc291cmNlLmFwcGx5SW1wdWxzZShpbXB1bHNlMik7XG4gICAgICAgIH1cbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTbmFwO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xuZnVuY3Rpb24gVmVjdG9yKHgsIHksIHopIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuc2V0KHgpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cbnZhciBfcmVnaXN0ZXIgPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuVmVjdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1Yih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUubXVsdCA9IGZ1bmN0aW9uIG11bHQocikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCByICogdGhpcy54LCByICogdGhpcy55LCByICogdGhpcy56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdihyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdCgxIC8gcik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uIGNyb3NzKHYpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgdnggPSB2Lng7XG4gICAgdmFyIHZ5ID0gdi55O1xuICAgIHZhciB2eiA9IHYuejtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeiAqIHZ5IC0geSAqIHZ6LCB4ICogdnogLSB6ICogdngsIHkgKiB2eCAtIHggKiB2eSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueSAmJiB2LnogPT09IHRoaXMuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCwgeSAqIGNvc1RoZXRhIC0geiAqIHNpblRoZXRhLCB5ICogc2luVGhldGEgKyB6ICogY29zVGhldGEpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogc2luVGhldGEgKyB4ICogY29zVGhldGEsIHksIHogKiBjb3NUaGV0YSAtIHggKiBzaW5UaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHggKiBjb3NUaGV0YSAtIHkgKiBzaW5UaGV0YSwgeCAqIHNpblRoZXRhICsgeSAqIGNvc1RoZXRhLCB6KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLm5vcm1TcXVhcmVkID0gZnVuY3Rpb24gbm9ybVNxdWFyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybSA9IGZ1bmN0aW9uIG5vcm0oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLm5vcm1TcXVhcmVkKCkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgICBsZW5ndGggPSAxO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiAxZS03KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMubXVsdChsZW5ndGggLyBub3JtKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgbGVuZ3RoLCAwLCAwKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XG4gICAgcmV0dXJuICEodGhpcy54IHx8IHRoaXMueSB8fCB0aGlzLnopO1xufTtcbmZ1bmN0aW9uIF9zZXRYWVooeCwgeSwgeikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6O1xuICAgIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gX3NldEZyb21BcnJheSh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2WzBdLCB2WzFdLCB2WzJdIHx8IDApO1xufVxuZnVuY3Rpb24gX3NldEZyb21WZWN0b3Iodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgdi54LCB2LnksIHYueik7XG59XG5mdW5jdGlvbiBfc2V0RnJvbU51bWJlcih4KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB4LCAwLCAwKTtcbn1cblZlY3Rvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHYpIHtcbiAgICBpZiAodiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21BcnJheS5jYWxsKHRoaXMsIHYpO1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHYpO1xuICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKHRoaXMsIHYpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0WFlaID0gZnVuY3Rpb24gKHgsIHksIHopIHtcbiAgICByZXR1cm4gX3NldFhZWi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0MUQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHgpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gcHV0KHYpIHtcbiAgICBpZiAodGhpcyA9PT0gX3JlZ2lzdGVyKVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIF9yZWdpc3Rlcik7XG4gICAgZWxzZVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIDAsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2FwID0gZnVuY3Rpb24gY2FwKGNhcCkge1xuICAgIGlmIChjYXAgPT09IEluZmluaXR5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMpO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiBjYXApXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGNhcCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24gcHJvamVjdChuKSB7XG4gICAgcmV0dXJuIG4ubXVsdCh0aGlzLmRvdChuKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yZWZsZWN0QWNyb3NzID0gZnVuY3Rpb24gcmVmbGVjdEFjcm9zcyhuKSB7XG4gICAgbi5ub3JtYWxpemUoKS5wdXQobik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yKF9yZWdpc3RlciwgdGhpcy5zdWIodGhpcy5wcm9qZWN0KG4pLm11bHQoMikpKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgdGhpcy56XG4gICAgXTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldDFEID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLng7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3I7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL21hdGgvVmVjdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBGb3JjZSA9IHJlcXVpcmUoJy4vRm9yY2UnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3ByaW5nKG9wdGlvbnMpIHtcbiAgICBGb3JjZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kaXNwID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xufVxuU3ByaW5nLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcblNwcmluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTcHJpbmc7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIE1JTl9QRVJJT0QgPSAxNTA7XG5TcHJpbmcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIEZFTkU6IGZ1bmN0aW9uIChkaXN0LCByTWF4KSB7XG4gICAgICAgIHZhciByTWF4U21hbGwgPSByTWF4ICogMC45OTtcbiAgICAgICAgdmFyIHIgPSBNYXRoLm1heChNYXRoLm1pbihkaXN0LCByTWF4U21hbGwpLCAtck1heFNtYWxsKTtcbiAgICAgICAgcmV0dXJuIHIgLyAoMSAtIHIgKiByIC8gKHJNYXggKiByTWF4KSk7XG4gICAgfSxcbiAgICBIT09LOiBmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9XG59O1xuU3ByaW5nLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgbWF4TGVuZ3RoOiBJbmZpbml0eSxcbiAgICBhbmNob3I6IHVuZGVmaW5lZCxcbiAgICBmb3JjZUZ1bmN0aW9uOiBTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TLkhPT0tcbn07XG5mdW5jdGlvbiBfY2FsY1N0aWZmbmVzcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLnN0aWZmbmVzcyA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbn1cbmZ1bmN0aW9uIF9jYWxjRGFtcGluZygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLmRhbXBpbmcgPSA0ICogcGkgKiBvcHRpb25zLmRhbXBpbmdSYXRpbyAvIG9wdGlvbnMucGVyaW9kO1xufVxuZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgX2NhbGNTdGlmZm5lc3MuY2FsbCh0aGlzKTtcbiAgICBfY2FsY0RhbXBpbmcuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGVyaW9kIDwgTUlOX1BFUklPRCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wZXJpb2QgPSBNSU5fUEVSSU9EO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgJyArIE1JTl9QRVJJT0QgKyAnIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZm9yY2VGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5TcHJpbmcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHN0aWZmbmVzcyA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkYW1waW5nID0gb3B0aW9ucy5kYW1waW5nO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIG1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgdmFyIGk7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgcDI7XG4gICAgdmFyIHYyO1xuICAgIHZhciBkaXN0O1xuICAgIHZhciBtO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHAyID0gdGFyZ2V0LnBvc2l0aW9uO1xuICAgICAgICB2MiA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgYW5jaG9yLnN1YihwMikucHV0KGRpc3ApO1xuICAgICAgICBkaXN0ID0gZGlzcC5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBpZiAoZGlzdCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbSA9IHRhcmdldC5tYXNzO1xuICAgICAgICBzdGlmZm5lc3MgKj0gbTtcbiAgICAgICAgZGFtcGluZyAqPSBtO1xuICAgICAgICBkaXNwLm5vcm1hbGl6ZShzdGlmZm5lc3MgKiBmb3JjZUZ1bmN0aW9uKGRpc3QsIG1heExlbmd0aCkpLnB1dChmb3JjZSk7XG4gICAgICAgIGlmIChkYW1waW5nKVxuICAgICAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIuc3ViKHNvdXJjZS52ZWxvY2l0eSkubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm9yY2UuYWRkKHYyLm11bHQoLWRhbXBpbmcpKS5wdXQoZm9yY2UpO1xuICAgICAgICB0YXJnZXQuYXBwbHlGb3JjZShmb3JjZSk7XG4gICAgICAgIGlmIChzb3VyY2UpXG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlGb3JjZShmb3JjZS5tdWx0KC0xKSk7XG4gICAgfVxufTtcblNwcmluZy5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IHNvdXJjZSA/IHNvdXJjZS5wb3NpdGlvbiA6IG9wdGlvbnMuYW5jaG9yO1xuICAgIHZhciBzdHJlbmd0aCA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgZW5lcmd5ICs9IDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlbmVyZ3k7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcHJpbmc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1NwcmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxsKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFdhbGwuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuZGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuV2FsbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbldhbGwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gV2FsbDtcbldhbGwuT05fQ09OVEFDVCA9IHtcbiAgICBSRUZMRUNUOiAwLFxuICAgIFNJTEVOVDogMVxufTtcbldhbGwuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgZHJpZnQ6IDAuNSxcbiAgICBzbG9wOiAwLFxuICAgIG5vcm1hbDogW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBkaXN0YW5jZTogMCxcbiAgICBvbkNvbnRhY3Q6IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUXG59O1xuV2FsbC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm5vcm1hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5vcm1hbCBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBvcHRpb25zLm5vcm1hbC5jbG9uZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5ub3JtYWwgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBuZXcgVmVjdG9yKG9wdGlvbnMubm9ybWFsKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucmVzdGl0dXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uID0gb3B0aW9ucy5yZXN0aXR1dGlvbjtcbiAgICBpZiAob3B0aW9ucy5kcmlmdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHJpZnQgPSBvcHRpb25zLmRyaWZ0O1xuICAgIGlmIChvcHRpb25zLnNsb3AgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNsb3AgPSBvcHRpb25zLnNsb3A7XG4gICAgaWYgKG9wdGlvbnMuZGlzdGFuY2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZTtcbiAgICBpZiAob3B0aW9ucy5vbkNvbnRhY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ29udGFjdCA9IG9wdGlvbnMub25Db250YWN0O1xufTtcbmZ1bmN0aW9uIF9nZXROb3JtYWxWZWxvY2l0eShuLCB2KSB7XG4gICAgcmV0dXJuIHYuZG90KG4pO1xufVxuZnVuY3Rpb24gX2dldERpc3RhbmNlRnJvbU9yaWdpbihwKSB7XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIHZhciBkID0gdGhpcy5vcHRpb25zLmRpc3RhbmNlO1xuICAgIHJldHVybiBwLmRvdChuKSArIGQ7XG59XG5mdW5jdGlvbiBfb25FbnRlcihwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpIHtcbiAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgIHZhciB2ID0gcGFydGljbGUudmVsb2NpdHk7XG4gICAgdmFyIG0gPSBwYXJ0aWNsZS5tYXNzO1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICB2YXIgYWN0aW9uID0gdGhpcy5vcHRpb25zLm9uQ29udGFjdDtcbiAgICB2YXIgcmVzdGl0dXRpb24gPSB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb247XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIGRyaWZ0ID0gdGhpcy5vcHRpb25zLmRyaWZ0O1xuICAgIHZhciBzbG9wID0gLXRoaXMub3B0aW9ucy5zbG9wO1xuICAgIHZhciBnYW1tYSA9IDA7XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcGFydGljbGU6IHBhcnRpY2xlLFxuICAgICAgICAgICAgd2FsbDogdGhpcyxcbiAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICBub3JtYWw6IG5cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncHJlQ29sbGlzaW9uJywgZGF0YSk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NvbGxpc2lvbicsIGRhdGEpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgV2FsbC5PTl9DT05UQUNULlJFRkxFQ1Q6XG4gICAgICAgIHZhciBsYW1iZGEgPSBvdmVybGFwIDwgc2xvcCA/IC0oKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2KSArIGRyaWZ0IC8gZHQgKiAob3ZlcmxhcCAtIHNsb3ApKSAvIChtICogZHQgKyBnYW1tYSkgOiAtKCgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodikpIC8gKG0gKiBkdCArIGdhbW1hKTtcbiAgICAgICAgaW1wdWxzZS5zZXQobi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5SW1wdWxzZShpbXB1bHNlKTtcbiAgICAgICAgcGFydGljbGUuc2V0UG9zaXRpb24ocC5hZGQobi5tdWx0KC1vdmVybGFwKSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KVxuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwb3N0Q29sbGlzaW9uJywgZGF0YSk7XG59XG5mdW5jdGlvbiBfb25FeGl0KHBhcnRpY2xlLCBvdmVybGFwLCBkdCkge1xuICAgIHZhciBhY3Rpb24gPSB0aGlzLm9wdGlvbnMub25Db250YWN0O1xuICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIGlmIChhY3Rpb24gPT09IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUKSB7XG4gICAgICAgIHBhcnRpY2xlLnNldFBvc2l0aW9uKHAuYWRkKG4ubXVsdCgtb3ZlcmxhcCkpKTtcbiAgICB9XG59XG5XYWxsLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRpY2xlID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHYgPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICAgICAgdmFyIHIgPSBwYXJ0aWNsZS5yYWRpdXMgfHwgMDtcbiAgICAgICAgdmFyIG92ZXJsYXAgPSBfZ2V0RGlzdGFuY2VGcm9tT3JpZ2luLmNhbGwodGhpcywgcC5hZGQobi5tdWx0KC1yKSkpO1xuICAgICAgICB2YXIgbnYgPSBfZ2V0Tm9ybWFsVmVsb2NpdHkuY2FsbCh0aGlzLCBuLCB2KTtcbiAgICAgICAgaWYgKG92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgaWYgKG52IDwgMClcbiAgICAgICAgICAgICAgICBfb25FbnRlci5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgX29uRXhpdC5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTVcbiAqL1xudmFyIFV0aWxpdHkgPSB7fTtcblV0aWxpdHkuRGlyZWN0aW9uID0ge1xuICAgIFg6IDAsXG4gICAgWTogMSxcbiAgICBaOiAyXG59O1xuVXRpbGl0eS5hZnRlciA9IGZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjb3VudGVyID0gY291bnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY291bnRlci0tO1xuICAgICAgICBpZiAoY291bnRlciA9PT0gMClcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5VdGlsaXR5LmxvYWRVUkwgPSBmdW5jdGlvbiBsb2FkVVJMKHVybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIG9ucmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5VdGlsaXR5LmNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTCA9IGZ1bmN0aW9uIGNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTChodG1sKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVXRpbGl0eS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKGIpIHtcbiAgICB2YXIgYTtcbiAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGEgPSBiIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiW2tleV0gPT09ICdvYmplY3QnICYmIGJba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChiW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBuZXcgQXJyYXkoYltrZXldLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYltrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2tleV1baV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBVdGlsaXR5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXInKTtcbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmRvd25zdHJlYW0gPSBbXTtcbiAgICB0aGlzLmRvd25zdHJlYW1GbiA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW0gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzID0ge307XG59XG5FdmVudEhhbmRsZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudEhhbmRsZXI7XG5FdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0SW5wdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIG9iamVjdC50cmlnZ2VyID0gaGFuZGxlci50cmlnZ2VyLmJpbmQoaGFuZGxlcik7XG4gICAgaWYgKGhhbmRsZXIuc3Vic2NyaWJlICYmIGhhbmRsZXIudW5zdWJzY3JpYmUpIHtcbiAgICAgICAgb2JqZWN0LnN1YnNjcmliZSA9IGhhbmRsZXIuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgICAgIG9iamVjdC51bnN1YnNjcmliZSA9IGhhbmRsZXIudW5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICB9XG59O1xuRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRPdXRwdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyKVxuICAgICAgICBoYW5kbGVyLmJpbmRUaGlzKG9iamVjdCk7XG4gICAgb2JqZWN0LnBpcGUgPSBoYW5kbGVyLnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QudW5waXBlID0gaGFuZGxlci51bnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3Qub24gPSBoYW5kbGVyLm9uLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LmFkZExpc3RlbmVyID0gb2JqZWN0Lm9uO1xuICAgIG9iamVjdC5yZW1vdmVMaXN0ZW5lciA9IGhhbmRsZXIucmVtb3ZlTGlzdGVuZXIuYmluZChoYW5kbGVyKTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKVxuICAgICAgICAgICAgdGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIodHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtRm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kb3duc3RyZWFtRm5baV0odHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQ7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICBkb3duc3RyZWFtQ3R4LnB1c2godGFyZ2V0KTtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRhcmdldCgncGlwZScsIG51bGwpO1xuICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICB0YXJnZXQudHJpZ2dlcigncGlwZScsIG51bGwpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC51bnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnVuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBkb3duc3RyZWFtQ3R4LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgICAgIHRhcmdldCgndW5waXBlJywgbnVsbCk7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSkge1xuICAgICAgICB2YXIgdXBzdHJlYW1MaXN0ZW5lciA9IHRoaXMudHJpZ2dlci5iaW5kKHRoaXMsIHR5cGUpO1xuICAgICAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdID0gdXBzdHJlYW1MaXN0ZW5lcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVwc3RyZWFtW2ldLm9uKHR5cGUsIHVwc3RyZWFtTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLm9uO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnB1c2goc291cmNlKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2Uub24odHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIodHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEhhbmRsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBUcmFuc2Zvcm0gPSB7fTtcblRyYW5zZm9ybS5wcmVjaXNpb24gPSAwLjAwMDAwMTtcblRyYW5zZm9ybS5pZGVudGl0eSA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLm11bHRpcGx5NHg0ID0gZnVuY3Rpb24gbXVsdGlwbHk0eDQoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSArIGFbMTJdICogYlszXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdICsgYVsxM10gKiBiWzNdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdICsgYVsxNF0gKiBiWzNdLFxuICAgICAgICBhWzNdICogYlswXSArIGFbN10gKiBiWzFdICsgYVsxMV0gKiBiWzJdICsgYVsxNV0gKiBiWzNdLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0gKyBhWzEyXSAqIGJbN10sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSArIGFbMTNdICogYls3XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSArIGFbMTRdICogYls3XSxcbiAgICAgICAgYVszXSAqIGJbNF0gKyBhWzddICogYls1XSArIGFbMTFdICogYls2XSArIGFbMTVdICogYls3XSxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSArIGFbMTJdICogYlsxMV0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0gKyBhWzEzXSAqIGJbMTFdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSArIGFbMTRdICogYlsxMV0sXG4gICAgICAgIGFbM10gKiBiWzhdICsgYVs3XSAqIGJbOV0gKyBhWzExXSAqIGJbMTBdICsgYVsxNV0gKiBiWzExXSxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0gKiBiWzE1XSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10gKiBiWzE1XSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdICogYlsxNV0sXG4gICAgICAgIGFbM10gKiBiWzEyXSArIGFbN10gKiBiWzEzXSArIGFbMTFdICogYlsxNF0gKyBhWzE1XSAqIGJbMTVdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuTW92ZSA9IGZ1bmN0aW9uIHRoZW5Nb3ZlKG0sIHQpIHtcbiAgICBpZiAoIXRbMl0pXG4gICAgICAgIHRbMl0gPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBtWzEyXSArIHRbMF0sXG4gICAgICAgIG1bMTNdICsgdFsxXSxcbiAgICAgICAgbVsxNF0gKyB0WzJdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubW92ZVRoZW4gPSBmdW5jdGlvbiBtb3ZlVGhlbih2LCBtKSB7XG4gICAgaWYgKCF2WzJdKVxuICAgICAgICB2WzJdID0gMDtcbiAgICB2YXIgdDAgPSB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF07XG4gICAgdmFyIHQxID0gdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldO1xuICAgIHZhciB0MiA9IHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF07XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0udHJhbnNsYXRlID0gZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB6LFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlblNjYWxlID0gZnVuY3Rpb24gdGhlblNjYWxlKG0sIHMpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBzWzBdICogbVswXSxcbiAgICAgICAgc1sxXSAqIG1bMV0sXG4gICAgICAgIHNbMl0gKiBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs0XSxcbiAgICAgICAgc1sxXSAqIG1bNV0sXG4gICAgICAgIHNbMl0gKiBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs4XSxcbiAgICAgICAgc1sxXSAqIG1bOV0sXG4gICAgICAgIHNbMl0gKiBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bMTJdLFxuICAgICAgICBzWzFdICogbVsxM10sXG4gICAgICAgIHNbMl0gKiBtWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAxO1xuICAgIGlmICh5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHkgPSB4O1xuICAgIHJldHVybiBbXG4gICAgICAgIHgsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHosXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVYID0gZnVuY3Rpb24gcm90YXRlWCh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGUgPSBmdW5jdGlvbiByb3RhdGUocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zUHNpID0gTWF0aC5jb3MocHNpKTtcbiAgICB2YXIgc2luUHNpID0gTWF0aC5zaW4ocHNpKTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICBjb3NUaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgY29zUGhpICogc2luUHNpICsgc2luUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgIHNpblBoaSAqIHNpblBzaSAtIGNvc1BoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAwLFxuICAgICAgICAtY29zVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgIGNvc1BoaSAqIGNvc1BzaSAtIHNpblBoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICBzaW5QaGkgKiBjb3NQc2kgKyBjb3NQaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgMCxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIC1zaW5QaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgY29zUGhpICogY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnJvdGF0ZUF4aXMgPSBmdW5jdGlvbiByb3RhdGVBeGlzKHYsIHRoZXRhKSB7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgdmVyVGhldGEgPSAxIC0gY29zVGhldGE7XG4gICAgdmFyIHh4ViA9IHZbMF0gKiB2WzBdICogdmVyVGhldGE7XG4gICAgdmFyIHh5ViA9IHZbMF0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHh6ViA9IHZbMF0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHl5ViA9IHZbMV0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHl6ViA9IHZbMV0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHp6ViA9IHZbMl0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHhzID0gdlswXSAqIHNpblRoZXRhO1xuICAgIHZhciB5cyA9IHZbMV0gKiBzaW5UaGV0YTtcbiAgICB2YXIgenMgPSB2WzJdICogc2luVGhldGE7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgeHhWICsgY29zVGhldGEsXG4gICAgICAgIHh5ViArIHpzLFxuICAgICAgICB4elYgLSB5cyxcbiAgICAgICAgMCxcbiAgICAgICAgeHlWIC0genMsXG4gICAgICAgIHl5ViArIGNvc1RoZXRhLFxuICAgICAgICB5elYgKyB4cyxcbiAgICAgICAgMCxcbiAgICAgICAgeHpWICsgeXMsXG4gICAgICAgIHl6ViAtIHhzLFxuICAgICAgICB6elYgKyBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uYWJvdXRPcmlnaW4gPSBmdW5jdGlvbiBhYm91dE9yaWdpbih2LCBtKSB7XG4gICAgdmFyIHQwID0gdlswXSAtICh2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0pO1xuICAgIHZhciB0MSA9IHZbMV0gLSAodlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldKTtcbiAgICB2YXIgdDIgPSB2WzJdIC0gKHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW1xuICAgICAgICB0MCxcbiAgICAgICAgdDEsXG4gICAgICAgIHQyXG4gICAgXSk7XG59O1xuVHJhbnNmb3JtLnNrZXcgPSBmdW5jdGlvbiBza2V3KHBoaSwgdGhldGEsIHBzaSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgudGFuKHRoZXRhKSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4ocHNpKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4ocGhpKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdYID0gZnVuY3Rpb24gc2tld1goYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5za2V3WSA9IGZ1bmN0aW9uIHNrZXdZKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4oYW5nbGUpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBwZXJzcGVjdGl2ZShmb2N1c1opIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAtMSAvIGZvY3VzWixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLmdldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVsxMl0sXG4gICAgICAgIG1bMTNdLFxuICAgICAgICBtWzE0XVxuICAgIF07XG59O1xuVHJhbnNmb3JtLmludmVyc2UgPSBmdW5jdGlvbiBpbnZlcnNlKG0pIHtcbiAgICB2YXIgYzAgPSBtWzVdICogbVsxMF0gLSBtWzZdICogbVs5XTtcbiAgICB2YXIgYzEgPSBtWzRdICogbVsxMF0gLSBtWzZdICogbVs4XTtcbiAgICB2YXIgYzIgPSBtWzRdICogbVs5XSAtIG1bNV0gKiBtWzhdO1xuICAgIHZhciBjNCA9IG1bMV0gKiBtWzEwXSAtIG1bMl0gKiBtWzldO1xuICAgIHZhciBjNSA9IG1bMF0gKiBtWzEwXSAtIG1bMl0gKiBtWzhdO1xuICAgIHZhciBjNiA9IG1bMF0gKiBtWzldIC0gbVsxXSAqIG1bOF07XG4gICAgdmFyIGM4ID0gbVsxXSAqIG1bNl0gLSBtWzJdICogbVs1XTtcbiAgICB2YXIgYzkgPSBtWzBdICogbVs2XSAtIG1bMl0gKiBtWzRdO1xuICAgIHZhciBjMTAgPSBtWzBdICogbVs1XSAtIG1bMV0gKiBtWzRdO1xuICAgIHZhciBkZXRNID0gbVswXSAqIGMwIC0gbVsxXSAqIGMxICsgbVsyXSAqIGMyO1xuICAgIHZhciBpbnZEID0gMSAvIGRldE07XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgaW52RCAqIGMwLFxuICAgICAgICAtaW52RCAqIGM0LFxuICAgICAgICBpbnZEICogYzgsXG4gICAgICAgIDAsXG4gICAgICAgIC1pbnZEICogYzEsXG4gICAgICAgIGludkQgKiBjNSxcbiAgICAgICAgLWludkQgKiBjOSxcbiAgICAgICAgMCxcbiAgICAgICAgaW52RCAqIGMyLFxuICAgICAgICAtaW52RCAqIGM2LFxuICAgICAgICBpbnZEICogYzEwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbiAgICByZXN1bHRbMTJdID0gLW1bMTJdICogcmVzdWx0WzBdIC0gbVsxM10gKiByZXN1bHRbNF0gLSBtWzE0XSAqIHJlc3VsdFs4XTtcbiAgICByZXN1bHRbMTNdID0gLW1bMTJdICogcmVzdWx0WzFdIC0gbVsxM10gKiByZXN1bHRbNV0gLSBtWzE0XSAqIHJlc3VsdFs5XTtcbiAgICByZXN1bHRbMTRdID0gLW1bMTJdICogcmVzdWx0WzJdIC0gbVsxM10gKiByZXN1bHRbNl0gLSBtWzE0XSAqIHJlc3VsdFsxMF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0udHJhbnNwb3NlID0gZnVuY3Rpb24gdHJhbnNwb3NlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICBtWzE0XSxcbiAgICAgICAgbVszXSxcbiAgICAgICAgbVs3XSxcbiAgICAgICAgbVsxMV0sXG4gICAgICAgIG1bMTVdXG4gICAgXTtcbn07XG5mdW5jdGlvbiBfbm9ybVNxdWFyZWQodikge1xuICAgIHJldHVybiB2Lmxlbmd0aCA9PT0gMiA/IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gOiB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl07XG59XG5mdW5jdGlvbiBfbm9ybSh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChfbm9ybVNxdWFyZWQodikpO1xufVxuZnVuY3Rpb24gX3NpZ24obikge1xuICAgIHJldHVybiBuIDwgMCA/IC0xIDogMTtcbn1cblRyYW5zZm9ybS5pbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoTSkge1xuICAgIHZhciB4ID0gW1xuICAgICAgICBNWzBdLFxuICAgICAgICBNWzFdLFxuICAgICAgICBNWzJdXG4gICAgXTtcbiAgICB2YXIgc2duID0gX3NpZ24oeFswXSk7XG4gICAgdmFyIHhOb3JtID0gX25vcm0oeCk7XG4gICAgdmFyIHYgPSBbXG4gICAgICAgIHhbMF0gKyBzZ24gKiB4Tm9ybSxcbiAgICAgICAgeFsxXSxcbiAgICAgICAgeFsyXVxuICAgIF07XG4gICAgdmFyIG11bHQgPSAyIC8gX25vcm1TcXVhcmVkKHYpO1xuICAgIGlmIChtdWx0ID49IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSksXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIFExID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbiAgICBRMVswXSA9IDEgLSBtdWx0ICogdlswXSAqIHZbMF07XG4gICAgUTFbNV0gPSAxIC0gbXVsdCAqIHZbMV0gKiB2WzFdO1xuICAgIFExWzEwXSA9IDEgLSBtdWx0ICogdlsyXSAqIHZbMl07XG4gICAgUTFbMV0gPSAtbXVsdCAqIHZbMF0gKiB2WzFdO1xuICAgIFExWzJdID0gLW11bHQgKiB2WzBdICogdlsyXTtcbiAgICBRMVs2XSA9IC1tdWx0ICogdlsxXSAqIHZbMl07XG4gICAgUTFbNF0gPSBRMVsxXTtcbiAgICBRMVs4XSA9IFExWzJdO1xuICAgIFExWzldID0gUTFbNl07XG4gICAgdmFyIE1RMSA9IFRyYW5zZm9ybS5tdWx0aXBseShRMSwgTSk7XG4gICAgdmFyIHgyID0gW1xuICAgICAgICBNUTFbNV0sXG4gICAgICAgIE1RMVs2XVxuICAgIF07XG4gICAgdmFyIHNnbjIgPSBfc2lnbih4MlswXSk7XG4gICAgdmFyIHgyTm9ybSA9IF9ub3JtKHgyKTtcbiAgICB2YXIgdjIgPSBbXG4gICAgICAgIHgyWzBdICsgc2duMiAqIHgyTm9ybSxcbiAgICAgICAgeDJbMV1cbiAgICBdO1xuICAgIHZhciBtdWx0MiA9IDIgLyBfbm9ybVNxdWFyZWQodjIpO1xuICAgIHZhciBRMiA9IFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG4gICAgUTJbNV0gPSAxIC0gbXVsdDIgKiB2MlswXSAqIHYyWzBdO1xuICAgIFEyWzEwXSA9IDEgLSBtdWx0MiAqIHYyWzFdICogdjJbMV07XG4gICAgUTJbNl0gPSAtbXVsdDIgKiB2MlswXSAqIHYyWzFdO1xuICAgIFEyWzldID0gUTJbNl07XG4gICAgdmFyIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTIsIFExKTtcbiAgICB2YXIgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShRLCBNKTtcbiAgICB2YXIgcmVtb3ZlciA9IFRyYW5zZm9ybS5zY2FsZShSWzBdIDwgMCA/IC0xIDogMSwgUls1XSA8IDAgPyAtMSA6IDEsIFJbMTBdIDwgMCA/IC0xIDogMSk7XG4gICAgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShSLCByZW1vdmVyKTtcbiAgICBRID0gVHJhbnNmb3JtLm11bHRpcGx5KHJlbW92ZXIsIFEpO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQudHJhbnNsYXRlID0gVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKTtcbiAgICByZXN1bHQucm90YXRlID0gW1xuICAgICAgICBNYXRoLmF0YW4yKC1RWzZdLCBRWzEwXSksXG4gICAgICAgIE1hdGguYXNpbihRWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMigtUVsxXSwgUVswXSlcbiAgICBdO1xuICAgIGlmICghcmVzdWx0LnJvdGF0ZVswXSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzBdID0gMDtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSA9IE1hdGguYXRhbjIoUVs0XSwgUVs1XSk7XG4gICAgfVxuICAgIHJlc3VsdC5zY2FsZSA9IFtcbiAgICAgICAgUlswXSxcbiAgICAgICAgUls1XSxcbiAgICAgICAgUlsxMF1cbiAgICBdO1xuICAgIHJlc3VsdC5za2V3ID0gW1xuICAgICAgICBNYXRoLmF0YW4yKFJbOV0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls4XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzRdLCByZXN1bHQuc2NhbGVbMF0pXG4gICAgXTtcbiAgICBpZiAoTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVswXSkgKyBNYXRoLmFicyhyZXN1bHQucm90YXRlWzJdKSA+IDEuNSAqIE1hdGguUEkpIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSA9IE1hdGguUEkgLSByZXN1bHQucm90YXRlWzFdO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA+IE1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdIC09IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA8IC1NYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSArPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMF0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdIC09IE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzJdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hdmVyYWdlID0gZnVuY3Rpb24gYXZlcmFnZShNMSwgTTIsIHQpIHtcbiAgICB0ID0gdCA9PT0gdW5kZWZpbmVkID8gMC41IDogdDtcbiAgICB2YXIgc3BlY00xID0gVHJhbnNmb3JtLmludGVycHJldChNMSk7XG4gICAgdmFyIHNwZWNNMiA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTIpO1xuICAgIHZhciBzcGVjQXZnID0ge1xuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBzY2FsZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBzcGVjQXZnLnRyYW5zbGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEudHJhbnNsYXRlW2ldICsgdCAqIHNwZWNNMi50cmFuc2xhdGVbaV07XG4gICAgICAgIHNwZWNBdmcucm90YXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5yb3RhdGVbaV0gKyB0ICogc3BlY00yLnJvdGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5zY2FsZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2NhbGVbaV0gKyB0ICogc3BlY00yLnNjYWxlW2ldO1xuICAgICAgICBzcGVjQXZnLnNrZXdbaV0gPSAoMSAtIHQpICogc3BlY00xLnNrZXdbaV0gKyB0ICogc3BlY00yLnNrZXdbaV07XG4gICAgfVxuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoc3BlY0F2Zyk7XG59O1xuVHJhbnNmb3JtLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoc3BlYykge1xuICAgIHZhciBzY2FsZU1hdHJpeCA9IFRyYW5zZm9ybS5zY2FsZShzcGVjLnNjYWxlWzBdLCBzcGVjLnNjYWxlWzFdLCBzcGVjLnNjYWxlWzJdKTtcbiAgICB2YXIgc2tld01hdHJpeCA9IFRyYW5zZm9ybS5za2V3KHNwZWMuc2tld1swXSwgc3BlYy5za2V3WzFdLCBzcGVjLnNrZXdbMl0pO1xuICAgIHZhciByb3RhdGVNYXRyaXggPSBUcmFuc2Zvcm0ucm90YXRlKHNwZWMucm90YXRlWzBdLCBzcGVjLnJvdGF0ZVsxXSwgc3BlYy5yb3RhdGVbMl0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUoVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5tdWx0aXBseShyb3RhdGVNYXRyaXgsIHNrZXdNYXRyaXgpLCBzY2FsZU1hdHJpeCksIHNwZWMudHJhbnNsYXRlKTtcbn07XG5UcmFuc2Zvcm0uZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gIVRyYW5zZm9ybS5ub3RFcXVhbHMoYSwgYik7XG59O1xuVHJhbnNmb3JtLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIShhICYmIGIpIHx8IGFbMTJdICE9PSBiWzEyXSB8fCBhWzEzXSAhPT0gYlsxM10gfHwgYVsxNF0gIT09IGJbMTRdIHx8IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSB8fCBhWzJdICE9PSBiWzJdIHx8IGFbNF0gIT09IGJbNF0gfHwgYVs1XSAhPT0gYls1XSB8fCBhWzZdICE9PSBiWzZdIHx8IGFbOF0gIT09IGJbOF0gfHwgYVs5XSAhPT0gYls5XSB8fCBhWzEwXSAhPT0gYlsxMF07XG59O1xuVHJhbnNmb3JtLm5vcm1hbGl6ZVJvdGF0aW9uID0gZnVuY3Rpb24gbm9ybWFsaXplUm90YXRpb24ocm90YXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gcm90YXRpb24uc2xpY2UoMCk7XG4gICAgaWYgKHJlc3VsdFswXSA9PT0gTWF0aC5QSSAqIDAuNSB8fCByZXN1bHRbMF0gPT09IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IC1yZXN1bHRbMF07XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdID4gTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gLSBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA8IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSArIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IC1NYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gLT0gMiAqIE1hdGguUEk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uaW5Gcm9udCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMC4wMDEsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5iZWhpbmQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIC0wLjAwMSxcbiAgICAxXG5dO1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmFtb3VzL2NvcmUvVHJhbnNmb3JtLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBTeW1wbGVjdGljRXVsZXIgPSB7fTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVWZWxvY2l0eSA9IGZ1bmN0aW9uIGludGVncmF0ZVZlbG9jaXR5KGJvZHksIGR0KSB7XG4gICAgdmFyIHYgPSBib2R5LnZlbG9jaXR5O1xuICAgIHZhciB3ID0gYm9keS5pbnZlcnNlTWFzcztcbiAgICB2YXIgZiA9IGJvZHkuZm9yY2U7XG4gICAgaWYgKGYuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2LmFkZChmLm11bHQoZHQgKiB3KSkucHV0KHYpO1xuICAgIGYuY2xlYXIoKTtcbn07XG5TeW1wbGVjdGljRXVsZXIuaW50ZWdyYXRlUG9zaXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVQb3NpdGlvbihib2R5LCBkdCkge1xuICAgIHZhciBwID0gYm9keS5wb3NpdGlvbjtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgcC5hZGQodi5tdWx0KGR0KSkucHV0KHApO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0gPSBmdW5jdGlvbiBpbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0oYm9keSwgZHQpIHtcbiAgICB2YXIgTCA9IGJvZHkuYW5ndWxhck1vbWVudHVtO1xuICAgIHZhciB0ID0gYm9keS50b3JxdWU7XG4gICAgaWYgKHQuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBMLmFkZCh0Lm11bHQoZHQpKS5wdXQoTCk7XG4gICAgdC5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZU9yaWVudGF0aW9uKGJvZHksIGR0KSB7XG4gICAgdmFyIHEgPSBib2R5Lm9yaWVudGF0aW9uO1xuICAgIHZhciB3ID0gYm9keS5hbmd1bGFyVmVsb2NpdHk7XG4gICAgaWYgKHcuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBxLmFkZChxLm11bHRpcGx5KHcpLnNjYWxhck11bHRpcGx5KDAuNSAqIGR0KSkucHV0KHEpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ltcGxlY3RpY0V1bGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIENvbnN0cmFpbnQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbkNvbnN0cmFpbnQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCBvcHRpb25zKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQoKSB7XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiAwO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29uc3RyYWludDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9Db25zdHJhaW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE1XG4gKi9cbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBGb3JjZShmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKGZvcmNlKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRhcmdldHMubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICB0YXJnZXRzW2xlbmd0aF0uYXBwbHlGb3JjZSh0aGlzLmZvcmNlKTtcbiAgICB9XG59O1xuRm9yY2UucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcmNlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Gb3JjZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNVxuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLl9vd25lciA9IHRoaXM7XG59XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgdmFyIGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcy5fb3duZXIsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlzdGVuZXIuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApXG4gICAgICAgICAgICBsaXN0ZW5lci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmJpbmRUaGlzID0gZnVuY3Rpb24gYmluZFRoaXMob3duZXIpIHtcbiAgICB0aGlzLl9vd25lciA9IG93bmVyO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZhbW91cy9jb3JlL0V2ZW50RW1pdHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9