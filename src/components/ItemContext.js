import React, { createContext, useCallback, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";
import name from "random-name";

const ITEM_ADD = 'ITEM_ADD';
const ITEM_DONE = 'ITEM_DONE';

const initialState = [
  {
    id: uuidv4(),
    name: name.first(),
    reason: 'Send note about meeting up for coffee',
    done: false
  }
];

export const ItemContext = createContext();

const reducer = (state, action) => {
  if (action.type === ITEM_ADD) {
    return [
      action.payload,
      ...state,
    ];
  }

  if (action.type === ITEM_DONE) {
    return state.map(item => {
      if (item.id !== action.payload.id) return item;
      return { ...item, done: !item.done };
    });
  }

  return state;
};

export const ItemProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback(({ name, reason }) => {
    dispatch({
      type: ITEM_ADD,
      payload: {
        name,
        reason,
        done: false,
        id: uuidv4(),
      },
    });
  }, [dispatch]);

  const toggleDone = useCallback(id => {
    dispatch({
      type: ITEM_DONE,
      payload: { id },
    });
  }, [dispatch]);

  const value = { items, addItem, toggleDone };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};
