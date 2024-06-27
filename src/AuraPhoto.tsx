import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import AuraCluster from "./AuraCluster";
import { FacePositionType } from "./Camera";
import { toBlob } from "html-to-image";

interface Props {
  width: number;
  height: number;
  webcamSnapshotImgSrc: string;
  facePosition: FacePositionType | null;
  auraRefs: RefObject<SVGSVGElement>[];
  isGeneratingPhoto: boolean;
  setIsGeneratingPhoto: Dispatch<SetStateAction<boolean>>;
}

const AuraPhoto: React.FC<Props> = ({
  width,
  height,
  webcamSnapshotImgSrc,
  facePosition,
  auraRefs,
  isGeneratingPhoto,
  setIsGeneratingPhoto,
}) => {
  useEffect(() => {
    async function generatePhoto() {
      if (isGeneratingPhoto) {
        try {
          const photo = document.getElementById("aura-photo") as HTMLElement;
          // Blob this 3 times,
          // since for some reason, the rendering isn't fast enough to capture it with just one call?
          await toBlob(photo, {
            cacheBust: false,
            width: width,
            height: height,
          });
          await toBlob(photo, {
            cacheBust: false,
            width: width,
            height: height,
          });
          const blob = await toBlob(photo, {
            cacheBust: false,
            width: width,
            height: height,
          });

          if (blob) {
            await navigator.share({
              files: [
                new File([blob], "ur-aura.png", {
                  type: blob.type,
                }),
              ],
            });
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsGeneratingPhoto(false);
        }
      }
    }

    generatePhoto();
  }, []);

  return (
    <div
      id="aura-photo"
      style={{
        width: width,
        height: height,
        position: "relative",
      }}
    >
      <img
        style={{ width: width, height: height }}
        src={webcamSnapshotImgSrc}
      />
      {facePosition && (
        <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
      )}
    </div>
  );
};

export default AuraPhoto;
