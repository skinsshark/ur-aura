import React, { useState } from 'react';
import Camera from './Camera';
import './App.css';

function App() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="page-wrapper">
      <header>
        <div className="lil-border" />
        <nav>
          <h1>ur aura</h1>
          <p>your energy, colorized</p>
        </nav>
      </header>

      <div className="camera-wrapper">
        {showCamera ? (
          <Camera />
        ) : (
          <button onClick={() => setShowCamera(true)}>open camera</button>
        )}
      </div>
    </div>
  );
}

export default App;
