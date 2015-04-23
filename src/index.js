var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');

Transitionable.prototype.update = function(fn) {
  this._listeners = this._listeners || [];
  this._listeners.push(fn);
}

Transitionable.prototype["@@set"] = Transitionable.prototype.set;

Transitionable.prototype.set = function(duration, animation, complete) {
  var self = this;
  var open = true;
  function recur() {
    self["@@set"](duration, animation, function() {
      open = false;
      if (complete) complete();
    });

    // Execute listeners
    if (self._listeners) {
      self._listeners.forEach(function(fn){
        fn(self.get());
      })
    }

    // Request frame
    if (open) requestAnimationFrame(recur);

  }
  recur();
}

module.exports = {
  Transitionable: Transitionable,
  Easing: Easing
}
