# react-animation-engine
Extract famous transitionable capabilities in 10kb. Mixin to transition between state values.

![Spring animation](http://s8.postimg.org/w9knnfj6d/springs.gif)

# Example
```jsx

import {TransitionableMixin, Easing} from 'famous-animation-engine';

var TestComponent = React.createClass({
  
  /**
   * Define transitionable properties
   */
  mixins: [TransitionableMixin(["width", "height"])],

  /**
   * Return initial values for the transitionables
   */
  getInitialState() {
    return {
      width: 200,
      height: 50
    }
  },

  /**
   * Animate using Easing functions
   */
  handleButtonClick() {
    this.width = {
      value: document.body.clientWidth / 2,
      duration: 5000
    };
    this.height = {
      value: document.body.clientHeight / 2,
      duration: 2000,
      curve: Easing.outCirc
    };
  },

  /**
   * Animate using Springs
   */
  handleClick() {
    // Halt the ongoing animation
    this.handleStop();

    // Toggle the status
    var toggle = !!this.state.toggle;

    // Animate
    this.width = {
      value: toggle ? 400: 100,
      method: "spring",
      dampRatio: 0.2,
      period: 1000
    };
    this.height = {
      value: toggle ? 300: 200,
      method: "spring",
      dampRatio: 0.2,
      period: 500
    };

    // Store the state
    this.setState({
      toggle: !toggle
    })
  },

  /**
   * Handle transitionable stop
   */
  handleStop() {
    this.halt();
  },

  /**
   * Render method
   */
  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>click me</button>
        <button onClick={this.handleStop}>Stop</button>
        <div style={{
          width: this.state.width,
          height: this.state.height,
          backgroundColor: 'blue',
          color: "white"
        }}
        onClick={this.handleClick}></div>
      </div>
    )
  }
});

/**
 * Render component into body
 */
React.render(<TestComponent/>, document.body);
```
