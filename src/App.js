import './App.css';

import ClassCounter from './components/ClassCounter';
import HooksCounter from './components/HooksCounter';
import ContextItemList from './components/ContextItemList';
import FetchStarWarsCharacters from './components/FetchStarWarsCharacters';

function App() {
  return (
    <div className="App">
      <ClassCounter max={25} step={5} />
      <hr />
      <HooksCounter max={25} step={5} />
      <hr />
      <ContextItemList />
      <hr />
      <FetchStarWarsCharacters />
    </div>
  );
}

export default App;
