import './App.css';
import BarContainer from './Components/BarContainer';
import SortButtons from './Components/SortButtons';
import BarContextProvider from './Components/BarContext';

function App() {
  return (
    <div className="App">
      <BarContextProvider>
        <SortButtons />
        <BarContainer />
      </BarContextProvider>
    </div>
  );
}

export default App;
