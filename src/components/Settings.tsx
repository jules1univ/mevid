import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import { Save24Regular } from "@fluentui/react-icons";
import { FC, Suspense, lazy, useCallback, useEffect, useState } from "react";

const UserSettings = lazy(() => import("./settings/User"));
const ActionBarSettings = lazy(() => import("./settings/ActionBar"));
const MessageSettings = lazy(() => import("./settings/Message"));
const VideoSettings = lazy(() => import("./settings/Video"));

const SettingsModal: FC<SettingsModalProps> = ({ state, dispatch }) => {
  const [devices, setDevices] = useState<Devices>({
    audioIn: [],
    videoIn: [],
    audioOut: [],
    error: false,
  });
  const [codecs, setCodecs] = useState<Codecs>({
    audio: [],
    video: [],
  });

  const updateCodecs = useCallback(() => {
    let codecsCp: Codecs = { video: [], audio: [] };
    const videoCapabilities = RTCRtpReceiver.getCapabilities("video");
    if (videoCapabilities?.codecs) {
      codecsCp.video = videoCapabilities.codecs.map(
        (codec) => codec.mimeType + " " + (codec.sdpFmtpLine || "")
      );
    }
    const audioCapabilities = RTCRtpReceiver.getCapabilities("audio");
    if (audioCapabilities?.codecs) {
      codecsCp.audio = audioCapabilities.codecs.map(
        (codec) => codec.mimeType + " " + (codec.sdpFmtpLine || "")
      );
    }
    setCodecs(codecsCp);
  }, [setCodecs]);

  const updateDevices = useCallback(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        let devicesCp: Devices = {
          videoIn: [],
          audioIn: [],
          audioOut: [],
          error: false,
        };
        devices.forEach((device) => {
          let item = {
            name: device.label.length === 0 ? "Default" : device.label,
            id: device.deviceId,
          };
          switch (device.kind) {
            case "audioinput":
              devicesCp.audioIn.push(item);
              break;
            case "audiooutput":
              devicesCp.audioOut.push(item);
              break;
            case "videoinput":
              devicesCp.videoIn.push(item);
              break;
          }
        });
        setDevices(devicesCp);
      })
      .catch(() => {
        setDevices({
          audioIn: [],
          videoIn: [],
          audioOut: [],
          error: true,
        });
      });
  }, [setDevices]);

  useEffect(() => {
    updateCodecs();

    navigator.mediaDevices.addEventListener("devicechange", updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", updateDevices);
    };
  }, []);

  return (
    <Dialog
      open={state.settingModal}
      onOpenChange={(_, { open }) =>
        dispatch({ type: "settingModal", payload: open })
      }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent className="setting-content">
            <Suspense>
              <UserSettings />
            </Suspense>
            <Suspense>
              <ActionBarSettings />
            </Suspense>
            <Suspense>
              <MessageSettings />
            </Suspense>
            <Suspense>
              <VideoSettings devices={devices} codecs={codecs} />
            </Suspense>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" icon={<Save24Regular />}>
                Save & Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SettingsModal;
