import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import name from "random-name";

const initialState = [
  {
    id: uuidv4(),
    name: name.first(),
    reason: 'Send note about meeting up for coffee',
    done: false
  }
];

const Item = ({ item, onDone }) => {
  const done = () => onDone(item.id);

  return (
    <article>
      <h3>{item.name}</h3>
      <p>{item.reason}</p>
      <div>
        <label>
          <input type="checkbox" checked={item.done} onChange={done} />{' '}
          Done
        </label>
      </div>
    </article>
  );
};

const Items = ({ items = [], onDone }) => {
  return (
    <section className="items">
      <h2>Items ({items.length})</h2>
      {items.map(item => (
        <Item key={item.id} item={item} onDone={onDone} />
      ))}
    </section>
  );
};

const NewItem = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');

  const handleChange = event => {
    event.preventDefault();

    onSubmit({ name, reason });
  };

  return (
    <form onSubmit={handleChange}>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <input
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={event => setReason(event.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

const ReducerList = () => {
  const [items, setItems] = useState(initialState);

  const addItem = item => {
    item.id = uuidv4();
    item.done = false;
    setItems([item, ...items]);
  };

  const toggleDone = id => {
    setItems(
      items.map(item => {
        if (item.id !== id) return item;

        return { ...item, done: !item.done };
      })
    );
  };

  return (
    <div>
      <NewItem onSubmit={addItem} />
      <Items items={items} onDone={toggleDone} />
    </div>
  )
};

export default ReducerList;
