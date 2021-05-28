import React, { useEffect, useRef, useState } from 'react';
import './Camera.css';

function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch(err) {console.error('sorry')}
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}

function Camera() {
  const OPTIONS = {
    audio: false,
    video: { facingMode: "user" },
  };

  const videoRef = useRef();
  const mediaStream = useUserMedia(OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  useEffect(() => {
    videoRef.current.play();
  }, [])

  return (
    <div className="camera-wrapper">
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
}

export default Camera;
