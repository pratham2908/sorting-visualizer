import './App.css';
import BarContextProvider from './Components/BarContext';
import Sorter from './Components/Sorter';

function App() {
  return (
    <div className="App">
      <BarContextProvider>
        <Sorter />
      </BarContextProvider>
    </div>
  );
}

export default App;
