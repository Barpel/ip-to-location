import React from 'react';

import './App.scss';
import Home from './pages/Home';
import NavBar from './layout/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr />
      <Home></Home>
    </div>
  );
}

export default App;
