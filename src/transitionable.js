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
}

Transitionable.prototype._executeListeners = function() {
    // Execute listeners
    if (this._listeners) {
      this._listeners.forEach( fn => fn(this.get()) )
    }
}

Transitionable.prototype._animate = function() {
  // Request frame
  this._executeListeners();
  this._animationID = requestAnimationFrame(Transitionable.prototype._animate.bind(this));
}

module.exports = Transitionable;
