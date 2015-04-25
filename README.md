# famous-animation-engine
Extract famous transitionable capabilities in 10kb. Mixin to transition between state values.

# Example
```jsx

import {TransitionableMixin, Easing} from 'famous-animation-engine';

var TestComponent = React.createClass({

    mixins: [TransitionableMixin({width: 50})],
    
    // Start transition
    handleClick() {
      this.width = {
        value: 500,
        duration: 5000
        curve: Easing.inCubic
      };
    },
    
    // Stop transitionables
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
            backgroundColor: 'blue',
            color: "white"
          }}>Loader</div>
        </div>
      )
    }
  });

  React.render(<TestComponent/>, document.body);
  ```
