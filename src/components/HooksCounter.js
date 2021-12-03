import { useState, useEffect } from "react";

const HooksCounter = ({ max, step }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;

      return c + step;
    });
  };

  const decrement = () => {
    setCount(c => {
      if (c === 0) return c;

      return c - step;
    });
  };

  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="Counter">
      <h2>Hooks Functional Component</h2>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default HooksCounter;
