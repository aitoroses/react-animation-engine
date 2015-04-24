var Transitionable = require('famous/transitions/Transitionable');

Transitionable.prototype.update = function(fn) {
  this._listeners = this._listeners || [];
  this._listeners.push(fn);
}

Transitionable.prototype["@@set"] = Transitionable.prototype.set;

Transitionable.prototype.set = function(duration, animation, complete) {
  var self = this;

  // Call the original set
  self["@@set"](duration, animation, function() {
    // Last time execution
    self._executeListeners();
    if (self._animationID) {
        cancelAnimationFrame(self._animationID);
        self._willAnimate = false;
        self._animationID = undefined;
    }
    if (complete) {
        complete();
    };
  });

  // Setup animation
  function startAnimation() {
      if (!self._willAnimate) return;
      self._executeListeners();
      self._animationID = requestAnimationFrame(startAnimation);
  }

  if (!self._animationID) {
      self._willAnimate = self._willAnimate == false ? undefined : true
      startAnimation();
  }
}

Transitionable.prototype._executeListeners = function() {
    // Execute listeners
    if (this._listeners) {
      this._listeners.forEach( fn => fn(this.get()) )
    }
}

module.exports = Transitionable;
