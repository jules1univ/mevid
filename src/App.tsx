import {
  FluentProvider,
  Theme,
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";
import { MutableRefObject, Suspense, lazy, useCallback, useMemo } from "react";
import { useStorage } from "./hooks/useStorage";
import { useAppReducer } from "./hooks/useAppReducer";
import { DEFAULT_STORAGE, UserContext } from "./hooks/useUserContext";

import "./index.scss";

const MessagesDrawer = lazy(() => import("./components/Messages"));
const SettingsModal = lazy(() => import("./components/Settings"));
const VideoView = lazy(() => import("./components/VideoView"));
const BottomBar = lazy(() => import("./components/BottomBar"));

const App = () => {
  const [storage, setStorage] = useStorage("settings", DEFAULT_STORAGE);
  const [state, dispatch] = useAppReducer();

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

  // const activeVideo = useCallback(() => {
  //   if (localVideoRef.current !== null) {
  //     return;
  //   }

  // }, [localVideoRef, storage, setActive]);

  const activeLocalVideo = useCallback(
    (video: MutableRefObject<HTMLVideoElement | null>) => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: storage.video.videoInput || undefined,
          },
          audio: {
            deviceId: storage.video.audioInput || undefined,
          },
        })
        .then((stream) => {
          if (video.current === null) {
            return;
          }
          video.current.srcObject = stream;
        });
    },
    [state]
  );

  return (
    <UserContext.Provider value={{ storage, setStorage }}>
      <FluentProvider theme={theme} className="container">
        <Suspense>
          <VideoView state={state} dispatch={dispatch} />
          <BottomBar state={state} dispatch={dispatch} />
          {storage.button.messages && (
            <MessagesDrawer state={state} dispatch={dispatch} messages={[]} />
          )}
          <SettingsModal state={state} dispatch={dispatch} />
        </Suspense>
      </FluentProvider>
    </UserContext.Provider>
  );
};

export default App;
