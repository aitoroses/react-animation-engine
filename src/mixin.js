import Transitionable from './transitionable';
import Easing from 'famous/transitions/Easing';

function TransitionableMixin(props) {

  var _transitionables = {};

  for (var p in props) {
    _transitionables[p] = new Transitionable(props[p]);
  }

  var mixin = {
    componentWillMount() {
      for (var p in props) {
        var trans = _transitionables[p];
        trans.update(this._syncProp.bind(this, p))
        this._syncProp(p);
      }
    },
    componentDidMount() {
      for (var p in props) {
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
    },
    getInitialState() {
      return props;
    },
    _syncProp(prop) {
      var trans = _transitionables[prop];
      var state = {[prop]: trans.get()};
      this.setState(state);
    },
    tween(prop, value, animation, callback) {
      var trans = _transitionables[prop];
      //trans.halt();
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
