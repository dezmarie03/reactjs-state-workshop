import './App.css';

import ClassCounter from './components/ClassCounter';
import HooksCounter from './components/HooksCounter';
import ContextItemList from './components/ContextItemList';

function App() {
  return (
    <div className="App">
      <ClassCounter max={25} step={5} />
      <hr />
      <HooksCounter max={25} step={5} />
      <hr />
      <ContextItemList />
    </div>
  );
}

export default App;
