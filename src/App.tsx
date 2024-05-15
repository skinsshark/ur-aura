import { useState } from 'react';
import Camera, { FacePositionType } from './Camera';
import Diagram from './Diagram';

import './App.css';

function App() {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [facePosition, setFacePosition] = useState<FacePositionType | null>(
    null
  );

  return (
    <div className="page-wrapper">
      <header>
        <div className="lil-border" />
        <nav>
          <h1>ur aura</h1>
          <p>your energy, colorized</p>
        </nav>
      </header>

      {facePosition !== null && <Diagram facePosition={facePosition} />}

      <div className="camera-wrapper">
        {showCamera ? (
          <Camera setFacePosition={setFacePosition} />
        ) : (
          <button onClick={() => setShowCamera(true)}>open camera</button>
        )}
      </div>
    </div>
  );
}

export default App;
