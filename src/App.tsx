import {
  Button,
  Divider,
  FluentProvider,
  Theme,
  tokens,
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";
import { Suspense, lazy, useCallback, useMemo, useRef, useState } from "react";
import { useStorage } from "./hooks/useStorage";

import "./index.scss";
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
import { DEFAULT_STORAGE, UserStorage } from "./storage.user";

const MessagesDrawer = lazy(() => import("./components/Messages"));
const SettingsModal = lazy(() => import("./components/Settings"));

const App = () => {
  const [storage, setStorage] = useStorage<UserStorage>(
    "settings",
    DEFAULT_STORAGE
  );
  const [isChatOpen, setChatOpen] = useState<boolean>(false);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const [isPaused, setPaused] = useState<boolean>(false);
  const [isMuted, setMuted] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const theme: Theme = useMemo(() => {
    switch (storage.user.theme) {
      case "auto":
        return new Date().getHours() >= 18 ? teamsDarkTheme : teamsLightTheme;
      case "dark":
        return teamsDarkTheme;
      case "light":
        return teamsLightTheme;
      case "hightcontrast":
        return teamsHighContrastTheme;
    }
  }, [storage]);

  const activeVideo = useCallback(() => {
    if (localVideoRef.current !== null) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: storage.rtc.videoInput || undefined,
          },
          audio: {
            deviceId: storage.rtc.audioInput || undefined,
          },
        })
        .then((stream) => {
          if (localVideoRef.current !== null) {
            localVideoRef.current.srcObject = stream;
            setActive(true);
          }
        });
    }
  }, [localVideoRef, storage, setActive]);

  return (
    <FluentProvider theme={theme} className="container">
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
                width: storage.rtc.fullVideoWidth ? "100%" : "auto",
                height: !storage.rtc.fullVideoWidth ? "100%" : "auto",
                opacity: isPaused ? 0.5 : 1,
              }}
            />
          </div>
          <div className="video"></div>
        </div>
      </div>

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
            onClick={() => setSettingsOpen(true)}
          />
          {(storage.button.fastClose ||
            storage.button.pause ||
            storage.button.mute) && <Divider vertical />}
          {storage.button.fastClose && (
            <Button
              shape="circular"
              icon={isActive ? <Dismiss24Filled /> : <Open24Regular />}
              size="large"
              onClick={() => {
                if (
                  localVideoRef.current !== null &&
                  localVideoRef.current.srcObject !== null
                ) {
                  let stream = localVideoRef.current.srcObject as MediaStream;
                  stream.getTracks().forEach((track) => {
                    track.stop();
                  });
                  localVideoRef.current.srcObject = null;
                  if (isPaused) {
                    setPaused(false);
                  }
                  setActive(false);
                } else {
                  activeVideo();
                }
              }}
            />
          )}
          {storage.button.pause && isActive && (
            <Button
              shape="circular"
              icon={isPaused ? <Play24Regular /> : <Pause24Regular />}
              size="large"
              onClick={() => {
                if (localVideoRef.current !== null) {
                  if (isPaused) {
                    localVideoRef.current.play();
                  } else {
                    localVideoRef.current.pause();
                  }
                  setPaused(() => !isPaused);
                }
              }}
            />
          )}
          {storage.button.mute && isActive && (
            <Button
              shape="circular"
              icon={isMuted ? <MicOff24Regular /> : <Mic24Regular />}
              size="large"
              onClick={() => {
                if (localVideoRef.current !== null) {
                  localVideoRef.current.muted = !localVideoRef.current.muted;
                  setMuted(!isMuted);
                }
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
              onClick={() => setChatOpen(true)}
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
      <Suspense>
        {storage.button.messages && (
          <MessagesDrawer
            open={isChatOpen}
            rightSide={storage.message.rightDirection}
            setOpen={setChatOpen}
          />
        )}
        <SettingsModal
          open={isSettingsOpen}
          setOpen={setSettingsOpen}
          storage={storage}
          setStorage={setStorage}
          activeVideo={activeVideo}
        />
      </Suspense>
    </FluentProvider>
  );
};

export default App;
