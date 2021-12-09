import React, { useContext, useState } from "react";

import { ItemContext, ItemProvider } from "./ItemContext";

const Item = React.memo(({ item }) => {
  const { toggleDone } = useContext(ItemContext);

  const done = () => toggleDone(item.id);

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
});

const Items = () => {
  const { items, undoItem, redoItem, isPast, isFuture } = useContext(ItemContext);
  console.log({ undoItem, redoItem, isPast, isFuture });

  return (
    <section className="items">
      <h2>Items ({items.length}) Context Component</h2>
      <button disabled={!isPast} onClick={undoItem}>Undo</button>
      <button disabled={!isFuture} onClick={redoItem}>Redo</button>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
};

const NewItem = React.memo(() => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');

  const { addItem } = useContext(ItemContext);

  const handleChange = event => {
    event.preventDefault();

    addItem({ name, reason });
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
});

const ContextItemList = () => {
  return (
    <ItemProvider>
      <NewItem />
      <Items />
    </ItemProvider>
  )
};

export default ContextItemList;
