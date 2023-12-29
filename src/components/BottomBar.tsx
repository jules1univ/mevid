import { Button, Divider, tokens } from "@fluentui/react-components";
import {
  ArrowRight24Regular,
  Chat24Regular,
  Dismiss24Filled,
  Mic24Regular,
  MicOff24Regular,
  Open24Regular,
  Pause24Regular,
  Play24Regular,
  Settings24Regular,
  ShareScreenStart24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";
import { useUserContext } from "../hooks/useUserContext";
import { FC } from "react";

const BottomBar: FC<BottomBarProps> = ({ state, dispatch }) => {
  const { storage } = useUserContext();

  return (
    <div
      className="bottom-bar"
      style={{
        borderColor: tokens.colorNeutralStroke1,
        background: tokens.colorNeutralBackground1,
      }}
    >
      <div className="left">
        <Button
          shape="circular"
          icon={<Settings24Regular />}
          size="large"
          onClick={() => dispatch({ type: "settingModal", payload: true })}
        />
        {(storage.button.fastClose ||
          ((storage.button.pause || storage.button.mute) && state.active)) && (
          <Divider vertical />
        )}
        {storage.button.fastClose && (
          <Button
            shape="circular"
            icon={state.active ? <Dismiss24Filled /> : <Open24Regular />}
            size="large"
            onClick={() => {
              dispatch({ type: "active" });
              // if (
              //   localVideoRef.current !== null &&
              //   localVideoRef.current.srcObject !== null
              // ) {
              //   let stream = localVideoRef.current.srcObject as MediaStream;
              //   stream.getTracks().forEach((track) => {
              //     track.stop();
              //   });
              //   localVideoRef.current.srcObject = null;
              //   if (isPaused) {
              //     setPaused(false);
              //   }
              //   setActive(false);
              // } else {
              //   activeVideo();
              // }
            }}
          />
        )}
        {storage.button.pause && state.active && (
          <Button
            shape="circular"
            icon={state.pause ? <Play24Regular /> : <Pause24Regular />}
            size="large"
            onClick={() => {
              dispatch({ type: "pause" });
              // if (localVideoRef.current !== null) {
              //   if (isPaused) {
              //     localVideoRef.current.play();
              //   } else {
              //     localVideoRef.current.pause();
              //   }
              //   setPaused(() => !isPaused);
              // }
            }}
          />
        )}
        {storage.button.mute && state.active && (
          <Button
            shape="circular"
            icon={state.mute ? <MicOff24Regular /> : <Mic24Regular />}
            size="large"
            onClick={() => {
              dispatch({ type: "mute" });
              // if (localVideoRef.current !== null) {
              //   localVideoRef.current.muted = !localVideoRef.current.muted;
              //   setMuted(!isMuted);
              // }
            }}
          />
        )}
      </div>
      <div className="mid"></div>
      <div className="right">
        {storage.button.report && (
          <Button shape="circular" icon={<Warning24Regular />} size="large" />
        )}
        {storage.button.messages && (
          <Button
            shape="circular"
            icon={<Chat24Regular />}
            onClick={() => dispatch({ type: "messageModal", payload: true })}
            size="large"
          />
        )}
        {storage.button.screenSharing && (
          <Button
            shape="circular"
            icon={<ShareScreenStart24Regular />}
            size="large"
          />
        )}

        {(storage.button.messages || storage.button.report) && (
          <Divider vertical />
        )}
        <Button
          shape="circular"
          icon={<ArrowRight24Regular />}
          size="large"
          appearance="primary"
        />
      </div>
    </div>
  );
};

export default BottomBar;
