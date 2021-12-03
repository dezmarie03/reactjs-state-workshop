import { useState, useEffect } from "react";

const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
};

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);

    if (storage) return JSON.parse(storage).value;

    return initialState;
  }

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [key, value]);

  return [value, setValue];
}

const HooksCounter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'count');

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
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    storeStateInLocalStorage(count);
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
