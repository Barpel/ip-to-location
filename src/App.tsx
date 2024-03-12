import './App.scss';
import Home from './pages/Home';
import NavBar from './layout/NavBar';
import CacheProvider from './context/CacheContext';


function App() {
  return (
    <CacheProvider>
      <div className="App">
        <NavBar />
        <Home></Home>
      </div>
    </CacheProvider>
  );
}

export default App;
