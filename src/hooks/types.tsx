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

type VideoSettings = {
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

type UserStorage = {
  button: ActionBarButtons;
  video: VideoSettings;
  message: MessagesSettings;
  user: UserPreferences;

  // recording => https://webrtc.github.io/samples/src/content/getusermedia/record/
  // video size => https://webrtc.github.io/samples/src/content/getusermedia/resolution/
};

type AppActionKind =
  | "pause"
  | "active"
  | "mute"
  | "messageModal"
  | "settingModal";

type AppState = {
  pause: boolean;
  active: boolean;
  mute: boolean;

  messageModal: boolean;
  settingModal: boolean;
};

type AppAction = {
  type: AppActionKind;
  payload?: boolean;
};
