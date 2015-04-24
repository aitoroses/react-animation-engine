import Transitionable from './transitionable';
import Easing from 'famous/transitions/Easing';

var SpringTransition = require('famous/transitions/SpringTransition');
var WallTransition = require('famous/transitions/WallTransition');
var SnapTransition = require('famous/transitions/SnapTransition');

function _ensureValue(v) {
    var val = parseFloat(v);
    return isNaN(val) ? 0 : val;
}

class PropertyAnimator {
    constructor(object) {
        this._wrap = object;
        this._props = {};
    }

    isActive() {
        return this._active;
    }

    _findProp(prop, cb) {
        var self = this;
        var original = prop;
        prop = prop.split('.');
        var property = this._wrap[prop[0]];
        var getter, setter, parent, i = 1;
        while(true) {
            if (property[prop[i]] !== undefined) {
                parent = property;
                property = property[prop[i]];
            } else {
                var index = i-1;
                getter = () => _ensureValue(parent[prop[index]]);
                setter = v => parent[prop[index]] = _ensureValue(v);
                cb(getter, setter)
                break;
            }
            i++;
        }
    }

    animate(prop) {
        this._findProp(prop, (getter, setter) => {
            this._props[prop] = {
                transitionable: new Transitionable(getter()),
                get: getter,
                set: setter,
                _active: false
            };
        })
        var result = this._props[prop];

        // Prepare the listener
        result.transitionable.update(v => result.set(v));

        return result;
    }

    _provideAnimation(input) {
        var animation = {};
        if (input.duration) {
            animation = {
                duration: input.duration,
                curve: input.animation ?
                    Easing[input.animation] : null
            }
        } else {
            Transitionable.registerMethod('spring', SpringTransition);
            Transitionable.registerMethod('wall', WallTransition);
            Transitionable.registerMethod('snap', SnapTransition);
            Object.keys(input).forEach(k => animation[k] = input[k]);
            // By default setup method to be spring
            if (!animation.method) animation.method = "spring";
        }
        return animation;
    }

    set(prop, value, duration, animation) { // Duration may not be specified if physics based animation

        var physicsBased = typeof duration != "number";
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
        property.transitionable.val(value, animation, () => property._active = false);
    }

    halt(prop) {
        var property = this._props[prop];
        if (property) property.transitionable.halt();
    }
}

export {
    PropertyAnimator
}
