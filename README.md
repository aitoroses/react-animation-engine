# famous-animation-engine
Extract famous transitionable capabilities in 10kb. Mixin to transition between state values.

# Example
```jsx

import {TransitionableMixin, Easing} from 'famous-animation-engine';

var TestComponent = React.createClass({
  mixins: [TransitionableMixin(["width", "height"])],

  getInitialState() {
    return {
      width: 200,
      height: 50
    }
  },

  handleClick() {
    this.width = {
      value: 800,
      duration: 5000
    };
    this.height = {
      value: 400,
      duration: 2000,
      curve: Easing.outCirc
    };
  },

  handleStop() {
    this.halt();
  },

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>click me</button>
        <button onClick={this.handleStop}>Stop</button>
        <div style={{
          width: this.state.width,
          height: this.state.height,
          backgroundColor: 'blue',
          color: "white"
        }}>Loader</div>
      </div>
    )
  }
});

React.render(<TestComponent/>, document.body);
```
