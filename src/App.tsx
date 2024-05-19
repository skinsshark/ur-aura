import { useState } from 'react';
import Aura from './Aura';
import Camera, { FacePositionType } from './Camera';

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
          <h1>UR–AURA</h1>
          <p>your energy, colorized</p>
        </nav>
      </header>

      {facePosition !== null && <Aura facePosition={facePosition} />}

      <div className="camera-wrapper">
        {showCamera ? (
          <Camera
            facePosition={facePosition}
            setFacePosition={setFacePosition}
          />
        ) : (
          <button onClick={() => setShowCamera(true)}>open camera</button>
        )}
      </div>
    </div>
  );
}

export default App;
