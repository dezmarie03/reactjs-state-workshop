import './App.css';

import ClassCounter from './components/ClassCounter';
import HooksCounter from './components/HooksCounter';

function App() {
  return (
    <div className="App">
      <ClassCounter max={25} step={5} />
      <HooksCounter max={25} step={5} />
    </div>
  );
}

export default App;
