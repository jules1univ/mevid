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
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useStorage } from "./hooks/useStorage";

import "./index.scss";
import {
  ArrowRight24Regular,
  Chat24Regular,
  Dismiss24Filled,
  MicOff24Regular,
  Pause24Regular,
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: storage.rtc.videoInput || undefined
        },
        audio: {
          deviceId: storage.rtc.audioInput || undefined
        },
      })
      .then((stream) => {
        if (videoRef.current !== null) {
          videoRef.current.srcObject = stream;
        }
      }).catch(() => {
        
      })
  }, [storage]);

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
            <video ref={videoRef} autoPlay playsInline></video>
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
            <Button shape="circular" icon={<Dismiss24Filled />} size="large" />
          )}
          {storage.button.pause && (
            <Button shape="circular" icon={<Pause24Regular />} size="large" />
          )}
          {storage.button.mute && (
            <Button shape="circular" icon={<MicOff24Regular />} size="large" />
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
        />
      </Suspense>
    </FluentProvider>
  );
};

export default App;
