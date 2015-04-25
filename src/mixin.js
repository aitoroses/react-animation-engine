import Transitionable from './transitionable';
import Easing from 'famous/transitions/Easing';

function TransitionableMixin(props) {

  props = Object.keys([].concat(props)).reduce( (acc,p) => {
    acc[props] = null;
    return acc;
  }, {})

  var _transitionables = {};

  var mixin = {

    componentWillUnmount() {
      for (var p in props) {
        delete _transitionables[p];
      }
    },

    componentWillMount() {
      for (var p in props) {
        // Create a transitionable
        _transitionables[p] = new Transitionable(this.state[p]);
        // Define a property
        Object.defineProperty(this, p, {
          get() {
            return _transitionables[p].get()
          },
          set(v) {
            /* {value, duration , animation} */
            if (typeof v != "object") {
              v = {value: v};
            }
            // Store the value
            var value = v.value;
            delete v.value;
            // Use 'inSine' as default curve
            if (!v.curve) {v.curve = Easing.inSine}
            this.tween(p, value, v);
          }
        });
      }
      var trans = _transitionables[p];
      trans.update(this._syncProp.bind(this, p))
      this._syncProp(p);
    },

    _syncProp(prop) {
      var trans = _transitionables[prop];
      var state = {[prop]: trans.get()};
      this.setState(state);
    },

    tween(prop, value, animation, callback) {
      var trans = _transitionables[prop];
      trans.val(value, animation, callback);
    },

    halt(prop) {
      if (prop) {
        var trans = _transitionables[p];
        trans.halt();
        return
      } else {
        for (var p in props) {
          var trans = _transitionables[p];
          trans.halt()
        }
      }
    }
  }

  return mixin
}

export default TransitionableMixin;
