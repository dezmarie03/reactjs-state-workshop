import { Component } from "react";

const increment = (state, props) => {
  const { max, step } = props;

  if (state.count >= max) return;

  return { count: state.count + step };
}

const decrement = (state, props) => {
  const { step } = props;

  if (state.count == 0) return;

  return { count: state.count - step };
}

class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(increment);
  }

  decrement() {
    this.setState(decrement);
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <h2>Classic Class Component</h2>
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default ClassCounter;
