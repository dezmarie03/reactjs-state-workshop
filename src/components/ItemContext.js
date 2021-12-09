import React, { createContext, useCallback, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";
import name from "random-name";

const ITEM_ADD = 'ITEM_ADD';
const ITEM_DONE = 'ITEM_DONE';
const ITEM_UNDO = 'ITEM_UNDO';
const ITEM_REDO = 'ITEM_REDO';

const initialState = [
  {
    id: uuidv4(),
    name: name.first(),
    reason: 'Send note about meeting up for coffee',
    done: false
  }
];

export const ItemContext = createContext();

const reducer = (state = initialState, action) => {
  if (action.type === ITEM_ADD) {
    return [
      {
        id: uuidv4(),
        ...action.payload,
      },
      ...state,
    ];
  }

  if (action.type === ITEM_DONE) {
    return state.map(item => {
      if (item.id === action.payload.id) {
        return { ...item, done: !item.done }
      }

      return item;
    });
  }

  return state;
};

const useUndoReducer = (reducer, initialState) => {
  const undoState = {
    past: [],
    present: initialState,
    future: [],
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    if (action.type === ITEM_UNDO) {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }

    if (action.type === ITEM_REDO) {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture,
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    };
  }

  return useReducer(undoReducer, undoState);
};

export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useUndoReducer(reducer, initialState);
  const items = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

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

  const undoItem = useCallback(() => {
    dispatch({ type: ITEM_UNDO });
  }, [dispatch]);

  const redoItem = useCallback(() => {
    dispatch({ type: ITEM_REDO });
  }, [dispatch]);

  const value = { items, addItem, toggleDone, undoItem, redoItem, isPast, isFuture };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};
