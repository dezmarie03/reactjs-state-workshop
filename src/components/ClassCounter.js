import { Component } from "react";

class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
  }

  updateDocumentTitle() {
    document.title = `Count: ${this.state.count}`;
  }

  increment() {
    this.setState((state, props) => {
      const { max, step } = props;

      if (state.count >= max) return;

      return { count: state.count + step };
    }, this.updateDocumentTitle);
  }

  decrement() {
    this.setState((state, props) => {
      const { step } = props;

      if (state.count == 0) return;

      return { count: state.count - step };
    }, this.updateDocumentTitle);
  }

  reset() {
    this.setState({ count: 0 }, this.updateDocumentTitle);
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
