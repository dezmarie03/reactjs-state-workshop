import './App.css';

import ClassCounter from './components/ClassCounter';
import HooksCounter from './components/HooksCounter';
import ReducerList from './components/ReducerList';

function App() {
  return (
    <div className="App">
      <ClassCounter max={25} step={5} />
      <hr />
      <HooksCounter max={25} step={5} />
      <hr />
      <ReducerList />
    </div>
  );
}

export default App;
