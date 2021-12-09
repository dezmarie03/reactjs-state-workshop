import { useCallback, useEffect, useReducer } from "react";

const endpoint = "https://star-wars-character-search.glitch.me/api";

const initialState = {
  characters: [],
  loading: true,
  error: null,
};

const FETCHING = "FETCHING";
const RESPONSE_COMPLETE = "RESPONSE_COMPLETE";
const ERROR = "ERROR";

const reducer = (state, action) => {
  if (action.type === FETCHING) {
    return {
      characters: [],
      loading: true,
      errors: null,
    };
  }

  if (action.type === RESPONSE_COMPLETE) {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    }
  }

  if (action.type === ERROR) {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    }
  }

  return state;
};

const fetchCharacters = dispatch => {
  dispatch({ type: FETCHING });

  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => dispatch({
      type: RESPONSE_COMPLETE,
      payload: { characters: response.characters }
    }))
    .catch(error => dispatch({
      type: ERROR,
      payload: { error }
    }));
}

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(action => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action);
    }
  }, [dispatch]);

  return [state, enhancedDispatch];
};

const CharactersList = ({ characters = [] }) => {
  return (
    <section>
      {characters.map(character => (
        <div key={character.id}>
          {character.name}
        </div>
      ))}
    </section>
  );
};

const FetchStarWarsCharacters = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  useEffect(() => { dispatch(() => { }) }, []);

  return (
    <div>
      <header>
        <h2>Fetch Star Wars Characters Component</h2>
      </header>
      <main>
        <section>
          <button onClick={() => dispatch(fetchCharacters)}>Fetch Characters</button>
          <CharactersList characters={characters} />
        </section>
      </main>
    </div>
  );
}

export default FetchStarWarsCharacters;
