import './App.css';

import ClassCounter from './components/ClassCounter';

function App() {
  return (
    <div className="App">
      <ClassCounter max={25} step={5} />
    </div>
  );
}

export default App;
