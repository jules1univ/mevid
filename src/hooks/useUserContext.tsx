import { createContext, useContext } from "react";

export const DEFAULT_STORAGE: UserStorage = {
  button: {
    screenSharing: false,
    messages: true,
    fastClose: false,
    pause: false,
    mute: false,
    report: true,
  },
  video: {
    fullVideoWidth: true,
    audioInput: null,
    audioOutput: null,
    videoInput: null,
    videoCodec: null,
    audioCodec: null,
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
  },
};

type UserContextProps = {
  storage: UserStorage;
  setStorage: (newStorage: UserStorage) => void;
};

export const UserContext = createContext<UserContextProps>({
  storage: DEFAULT_STORAGE,
  setStorage: () => {},
});

export const useUserContext = () => useContext(UserContext);
