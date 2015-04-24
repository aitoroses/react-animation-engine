var Transitionable = require('famous/transitions/Transitionable');

Transitionable.prototype.update = function(fn) {
  this._listeners = this._listeners || [];
  this._listeners.push(fn);
}

Transitionable.prototype["@@set"] = Transitionable.prototype.set;

Transitionable.prototype.set = function(duration, animation, complete) {
  var self = this;
  this._open = true;

  // Call the original set
  self["@@set"](duration, animation, function() {
      self._open = false;
    if (complete) complete();
  });

  this._requestAnimation();
}

Transitionable.prototype._executeListeners = function() {
    // Execute listeners
    if (this._listeners) {
      this._listeners.forEach( fn => fn(this.get()) )
    }
}

Transitionable.prototype._requestAnimation = function() {
    var self = this;
    // Callback execution on requestAnimationFrame
    function recur() {
      // Request frame
      if (self._open) {
            self._executeListeners();
            requestAnimationFrame(recur);
      }
    }
    requestAnimationFrame(recur);
}

module.exports = Transitionable;
