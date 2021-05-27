import React, { useState } from 'react';
import Camera from './Camera';
import './App.css';

function App() {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <div className="page-wrapper">
      <header><h1>UR AURA</h1></header>
      {showCamera ?
        <Camera />
        : <button onClick={() => setShowCamera(true)}>open camera</button>
      }
    </div>
  );
}

export default App;
