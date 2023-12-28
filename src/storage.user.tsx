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
  audioCodec: string | null;

  // https://webrtc.github.io/samples/src/content/peerconnection/bandwidth/
  bandwidth: number | null;

  // https://webrtc.github.io/samples/src/content/getusermedia/record/
  redordingDuration: number;

  bannedIPs: string[];

  fullVideoWidth: boolean;
};

type UserPreferences = {
  theme: "light" | "dark" | "hightcontrast" | "auto";
  username: string | null;
  avatarUrl: string | null;
};

export type UserStorage = {
  button: ActionBarButtons;
  rtc: RTCSettings;
  message: MessagesSettings;
  user: UserPreferences;

  // recording => https://webrtc.github.io/samples/src/content/getusermedia/record/
  // video size => https://webrtc.github.io/samples/src/content/getusermedia/resolution/
};

export const DEFAULT_STORAGE: UserStorage = {
  button: {
    screenSharing: false,
    messages: true,
    fastClose: false,
    pause: false,
    mute: false,
    report: true,
  },
  rtc: {
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
