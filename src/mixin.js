import Transitionable from './transitionable';
import Easing from 'famous/transitions/Easing';

function TransitionableMixin(props) {

  props = [].concat(props);

  var _transitionables = {};

  var mixin = {

    componentWillUnmount() {
      props.forEach( p => {
        delete _transitionables[p];
      })
    },

    componentWillMount() {
      props.forEach( p => {
        // Create a transitionable
        _transitionables[p] = new Transitionable(this.state[p]);
        // Define a property
        var property = p;
        Object.defineProperty(this, property, {
          get() {
            return _transitionables[property].get()
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
            this.tween(property, value, v);
          }
        });
        var trans = _transitionables[property];
        trans.update(this._syncProp.bind(this, property))
        this._syncProp(property);
      })
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
        props.forEach( p => {
          var trans = _transitionables[p];
          trans.halt()
        })
      }
    }
  }

  return mixin
}

export default TransitionableMixin;
