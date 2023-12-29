type Devices = {
  audioIn: { name: string; id: string }[];
  videoIn: { name: string; id: string }[];
  audioOut: { name: string; id: string }[];
  error: boolean;
};

type Codecs = {
  audio: string[];
  video: string[];
};
