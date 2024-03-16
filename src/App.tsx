import './App.scss';
import Home from './pages/Home';
import NavBar from './layout/NavBar';
import CacheProvider from './context/CacheContext';


function App() {
  return (
    <CacheProvider>
      <main className="App">
        <NavBar />
        <Home></Home>
      </main>
    </CacheProvider>
  );
}

export default App;
