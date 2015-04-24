var FamousTransitionable = require('famous/transitions/Transitionable');

var allowAnimations = false;
var animationID = null;

var transitionables = [];
var listeners = [];

function haveAllFinishedAnimating() {
    return transitionables
            .map(t => t._isAnimating)
            .reduce((final, tIsAnimating) => final && !tIsAnimating, true)
}

function executeListeners() {
    for (var ls in listeners) {
        listeners[ls]()
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
    if (!allowAnimations) return
    executeListeners();
    animationID = requestAnimationFrame(animate);
}


class Transitionable extends FamousTransitionable {
    constructor(value) {
        super(value)

        // Configure for globals
        transitionables.push(this);
        this._listenerFn = () => this._executeListeners();
        listeners.push(this._listenerFn);

        this._isAnimating = false;
    }
    update(fn) {
        this._listeners = this._listeners || [];
        this._listeners.push(fn);
    }
    val(value, animation, complete) {
        var self = this;

        // Call the original set
        self.set(value, animation, function() {
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

    _executeListeners() {
        // Execute listeners
        if (this._listeners) {
          this._listeners.forEach( fn => fn(this.get()) )
        }
    }
}

module.exports = Transitionable;
