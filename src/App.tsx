import {
  Button,
  Divider,
  FluentProvider,
  Theme,
  tokens,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { Suspense, lazy, useMemo, useState } from "react";
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

type ActionBarButtons = {
  // https://webrtc.github.io/samples/src/content/getusermedia/getdisplaymedia/
  screenSharing: boolean;
  messages: boolean;
  fastClose: boolean;
  pause: boolean;
  mute: boolean;
  report: boolean;
};

type MessagesSettings = {
  // https://webrtc.github.io/samples/src/content/datachannel/filetransfer/
  fileSending: boolean;

  rightDirection: boolean;

  imagePreview: boolean;
  wordFilter: string[];
};

type RTCSettings = {
  // https://webrtc.github.io/samples/src/content/devices/input-output/
  audioInput: string | null;
  audioOutput: string | null;
  videoInput: string | null;

  // https://webrtc.github.io/samples/src/content/extensions/svc/
  videoCodec: string | null;
  scalibilityMode: string | null;

  // https://webrtc.github.io/samples/src/content/peerconnection/bandwidth/
  bandwidth: number | null;

  // https://webrtc.github.io/samples/src/content/getusermedia/record/
  redordingDuration: number;

  bannedIPs: string[];
};

type UserPreferences = {
  theme: "light" | "dark" | "auto";
  username: string | null;
  avatarUrl: string | null;
  language: string | null;
};

type UserStorage = {
  button: ActionBarButtons;
  rtc: RTCSettings;
  message: MessagesSettings;
  user: UserPreferences;

  // recording => https://webrtc.github.io/samples/src/content/getusermedia/record/
  // video size => https://webrtc.github.io/samples/src/content/getusermedia/resolution/
};

const DEFAULT_STORAGE: UserStorage = {
  button: {
    screenSharing: false,
    messages: true,
    fastClose: false,
    pause: false,
    mute: false,
    report: true,
  },
  rtc: {
    audioInput: null,
    audioOutput: null,
    videoInput: null,
    videoCodec: null,
    scalibilityMode: null,
    bandwidth: null,
    redordingDuration: 30,
    bannedIPs: [],
  },
  message: {
    fileSending: false,
    rightDirection: false,
    imagePreview: true,
    wordFilter: [],
  },
  user: {
    theme: "auto",
    username: null,
    avatarUrl: null,
    language: null,
  },
};

const MessagesDrawer = lazy(() => import("./components/Messages"));
const SettingsModal = lazy(() => import("./components/Settings"));

const App = () => {
  const [storage, setStorage] = useStorage<UserStorage>(
    "settings",
    DEFAULT_STORAGE
  );
  const [isChatOpen, setChatOpen] = useState<boolean>(false);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const theme: Theme = useMemo(() => {
    if (storage.user.theme === "auto") {
      return new Date().getHours() > 18 ? webDarkTheme : webLightTheme;
    }
    return storage.user.theme === "dark" ? webDarkTheme : webLightTheme;
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
          <div className="video"></div>
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
            className="btn"
          />
          {(storage.button.fastClose || storage.button.pause || storage.button.mute) && <Divider vertical />}
          {storage.button.fastClose && <Button
            shape="circular"
            icon={<Dismiss24Filled />}
            className="btn"
          />}
          {storage.button.pause && <Button
            shape="circular"
            icon={<Pause24Regular />}
            className="btn"
          />}
          {storage.button.mute && <Button
            shape="circular"
            icon={<MicOff24Regular />}
            className="btn"
          />}
        </div>
        <div className="mid"></div>
        <div className="right">
          {storage.button.report && <Button
            shape="circular"
            icon={<Warning24Regular />}
            className="btn"
          />}
          {storage.button.messages && <Button
            shape="circular"
            icon={<Chat24Regular />}
            onClick={() => setChatOpen(() => !isChatOpen)}
            className="btn"
          />}
          {storage.button.screenSharing && <Button
            shape="circular"
            icon={<ShareScreenStart24Regular />}
            className="btn"
          />}
        
          {(storage.button.messages || storage.button.report) && <Divider vertical />}
          <Button
            shape="circular"
            icon={<ArrowRight24Regular />}
            className="btn"
            appearance="primary"
          />
        </div>
      </div>
      <Suspense>
        {storage.button.messages && <MessagesDrawer open={isChatOpen} setOpen={setChatOpen} />}
        <SettingsModal open={isSettingsOpen} setOpen={setSettingsOpen} />
      </Suspense>
      {/* 
        |-------------------------------------------------------------------------|
        |                        |                 |                              |
        |                        |                 |                              |
        |   view1 (you)          |  view2 (other)  | + view3 (optional other)     |
        |                        |                 |                              |
        |                        |                 |                              |
        |                        |                 |                              |
        |----[settings]---------------------------------[report]--[next]--[chat]--|    
    
    
        |---[settings]------------------------|
             
             -- Input

             [audio input] -> choices
             [video input] -> choices
            
             -- Output

             [output format] -> choices
             [bandwidth]     -> size
             [country]       -> world/(selection)
             [ban list]       -> list

             -- User display

             [display name] -> name
             [avatar url]   -> url
             [mode]         -> 2/3 view
             [theme]        -> light/dark/auto
             [lang]         -> choices
             
             -- Chat

             [chat enable]   -> yes/no
             [image preview] -> yes/no
             [word filter]   -> list
             ([audio write]   -> yes/no)
    */}
    </FluentProvider>
  );
};

export default App;
