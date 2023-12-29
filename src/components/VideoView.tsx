import { tokens } from "@fluentui/react-components";
import { useUserContext } from "../hooks/useUserContext";
import { FC, useRef } from "react";


const VideoView: FC<VideoViewProps> = ({ state }) => {
  const { storage } = useUserContext();

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div
      className="views"
      style={{
        backgroundColor: tokens.colorNeutralBackground2,
      }}
    >
      <div className="view-group">
        <div className="video">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            style={{
              width: storage.video.fullVideoWidth ? "100%" : "auto",
              height: !storage.video.fullVideoWidth ? "100%" : "auto",
              opacity: state.pause ? 0.5 : 1,
            }}
          />
        </div>
        <div className="video">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: storage.video.fullVideoWidth ? "100%" : "auto",
              height: !storage.video.fullVideoWidth ? "100%" : "auto",
              opacity: state.pause ? 0.5 : 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoView;
