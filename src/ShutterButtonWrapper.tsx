import { useState } from 'react';
import CameraCountdown from './CameraCountdown';
import './ShutterButtonWrapper.css';

const ShutterButtonWrapper = ({
  hasPermission,
  isCapturingPhoto,
  onCaptureImage,
  setIsCapturingPhoto,
}: {
  hasPermission: boolean;
  isCapturingPhoto: boolean;
  onCaptureImage: () => void;
  setIsCapturingPhoto: (isCapturingPhoto: boolean) => void;
}) => {
  const [buttonState, setButtonState] = useState<
    'start' | 'countdown' | 'generating'
  >('start');

  const handleShutterButtonClick = () => {
    setIsCapturingPhoto(true);
    setButtonState('countdown');
  };

  const handleCountdownComplete = () => {
    onCaptureImage();
    setButtonState('generating');
  };

  return (
    <div
      className={`shutter-button-wrapper ${
        isCapturingPhoto ? 'waiting-for-photo' : ''
      }`}
    >
      {hasPermission ? (
        <button
          disabled={isCapturingPhoto}
          className="shutter-button"
          onClick={handleShutterButtonClick}
        >
          {buttonState === 'start' && 'click to capture aura'}

          {buttonState === 'countdown' && (
            <CameraCountdown onComplete={handleCountdownComplete} />
          )}

          {buttonState === 'generating' && 'generating aura.......'}
        </button>
      ) : (
        <button className="shutter-button no-camera-permission" disabled>
          camera permissions are needed for this experience. please allow access
          and refresh when ready....
        </button>
      )}
      <div className="shutter-button-icon">
        <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M46.3796 49.5491L46.4309 48.4544L47.2412 49.1922L69.0355 69.0355L49.1922 47.2412L48.4544 46.4309L49.5491 46.3796L78.9914 45L49.5491 43.6204L48.4544 43.5691L49.1922 42.7588L69.0355 20.9645L47.2412 40.8078L46.4309 41.5456L46.3796 40.4509L45 11.0086L43.6204 40.4509L43.5691 41.5456L42.7588 40.8078L20.9645 20.9645L40.8078 42.7588L41.5456 43.5691L40.4509 43.6204L11.0086 45L40.4509 46.3796L41.5456 46.4309L40.8078 47.2412L20.9645 69.0355L42.7588 49.1922L43.5691 48.4544L43.6204 49.5491L45 78.9914L46.3796 49.5491Z"
            stroke="#fff"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default ShutterButtonWrapper;
