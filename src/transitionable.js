var FamousTransitionable = require('famous/transitions/Transitionable');

class Transitionable extends FamousTransitionable {
    update(fn) {
        this._listeners = this._listeners || [];
        this._listeners.push(fn);
    }
    val(duration, animation, complete) {
        var self = this;

        // Call the original set
        self.set(duration, animation, function() {
          // Last time execution
          self._executeListeners();
          if (self._animationID) {
              cancelAnimationFrame(self._animationID);
              self._animationID = undefined;
          }
          if (complete) {
              complete();
          };
        });

        // Setup animation
        function startAnimation() {
            self._executeListeners();
            if (self._animationID) {
                self._animationID = requestAnimationFrame(startAnimation);
            }
        }

        self._animationID = true;
        startAnimation();

    }

    _executeListeners() {
        // Execute listeners
        if (this._listeners) {
          this._listeners.forEach( fn => fn(this.get()) )
        }
    }
}

// Transitionable.prototype["@@set"] = FamousTransitionable.prototype.set;


module.exports = Transitionable;
