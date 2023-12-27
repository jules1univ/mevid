import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardHeader,
  Select,
  Input,
  Divider,
  Switch,
} from "@fluentui/react-components";
import {
  Add24Regular,
  Delete24Regular,
  Save24Regular,
} from "@fluentui/react-icons";
import { FC, useEffect, useState } from "react";
import { UserStorage } from "../storage.user";

type SettingsModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  storage: UserStorage;
  setStorage: (newStorage: UserStorage) => void;
};

type SettingSectionProps = {
  title: string;
  content: JSX.Element;
};

type Devices = {
  audioIn: string[];
  videoIn: string[];
  audioOut: string[];
  error: boolean;
};

type Codecs = {
  audio: string[];
  video: string[];
};

const SettingSection: FC<SettingSectionProps> = ({ title, content }) => {
  return (
    <Card style={{ boxShadow: "none" }}>
      <CardHeader header={<h3>{title}</h3>} description={content} />
    </Card>
  );
};

const SettingsModal: FC<SettingsModalProps> = ({
  open,
  setOpen,
  storage,
  setStorage,
}) => {
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

  useEffect(() => {
    if (!open) {
      return;
    }

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

    navigator.mediaDevices
      .enumerateDevices()
      .then((allDevices) => {
        const audioInDevices = allDevices
          .filter((device) => device.kind === "audioinput")
          .map((audioDevice) =>
            audioDevice.label.length === 0 ? "Default" : audioDevice.label
          );
        const videoInDevices = allDevices
          .filter((device) => device.kind === "videoinput")
          .map((videoDevice) =>
            videoDevice.label.length === 0 ? "Default" : videoDevice.label
          );

        const audioOutDevices = allDevices
          .filter((device) => device.kind === "audiooutput")
          .map((audioOutDevice) =>
            audioOutDevice.label.length === 0 ? "Default" : audioOutDevice.label
          );

        setDevices({
          audioIn: audioInDevices,
          videoIn: videoInDevices,
          audioOut: audioOutDevices,
          error: false,
        });
      })
      .catch(() => {
        setDevices({
          audioIn: [],
          videoIn: [],
          audioOut: [],
          error: true,
        });
      });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(_, { open }) => setOpen(open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent className="setting-content">
            <SettingSection
              title="Preferences"
              content={
                <>
                  <div className="setting-item">
                    <div className="setting-line">
                      <p>Theme</p>
                      <div className="second">
                        <Select
                          value={
                            storage.user.theme[0].toUpperCase() +
                            storage.user.theme.slice(1)
                          }
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              user: {
                                ...storage.user,
                                theme:
                                  e.target.value.toLowerCase() as typeof storage.user.theme,
                              },
                            })
                          }
                          className="maxw"
                        >
                          <option>Auto</option>
                          <option>Light</option>
                          <option>Dark</option>
                          <option>Hightcontrast</option>
                        </Select>
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Username</p>
                      <div className="second">
                        <Input
                          value={storage.user.username || ""}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              user: {
                                ...storage.user,
                                username: e.target.value.trim(),
                              },
                            })
                          }
                          className="maxw"
                        />
                      </div>
                    </div>

                    <div className="setting-line">
                      <p>Avatar (URL)</p>
                      <div className="second">
                        <Input
                          value={storage.user.avatarUrl || ""}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              user: {
                                ...storage.user,
                                avatarUrl: e.target.value.trim(),
                              },
                            })
                          }
                          className="maxw"
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <SettingSection
              title="Action Bar"
              content={
                <>
                  <div className="setting-item">
                    <div className="setting-line">
                      <p>Messages</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.messages}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                messages: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Report</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.report}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                report: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="setting-line">
                      <p>Screen Sharing</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.screenSharing}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                screenSharing: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <Divider style={{ margin: "20px 0px" }}>Left side</Divider>

                    <div className="setting-line">
                      <p>Mute</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.mute}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                mute: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Pause</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.pause}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                pause: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Close</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.button.fastClose}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              button: {
                                ...storage.button,
                                fastClose: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <SettingSection
              title="Messages"
              content={
                <>
                  <div className="setting-item">
                    <div className="setting-line">
                      <p>Right side</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.message.rightDirection}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              message: {
                                ...storage.message,
                                rightDirection: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Image preview</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.message.imagePreview}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              message: {
                                ...storage.message,
                                imagePreview: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>File sending</p>
                      <div className="second">
                        <Switch
                          defaultChecked={storage.message.imagePreview}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              message: {
                                ...storage.message,
                                imagePreview: e.target.checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="setting-line">
                      <p>Word filter</p>
                      <div className="second">
                        <div className="setting-line">
                          <Select
                            style={{ width: "100%" }}
                            className="maxw"
                          ></Select>
                          <Button icon={<Add24Regular />} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <SettingSection
              title="Video"
              content={
                <>
                  <div className="setting-item">
                    <div className="setting-line">
                      <p>Video (Input)</p>
                      <div className="second">
                        <Select disabled={devices.error} className="maxw">
                          {devices.videoIn.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Audio (Input)</p>
                      <div className="second">
                        <Select disabled={devices.error} className="maxw">
                          {devices.audioIn.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Audio (Output)</p>
                      <div className="second">
                        <Select disabled={devices.error} className="maxw">
                          {devices.audioOut.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <Divider style={{ margin: "20px 0px" }}>Advanced</Divider>
                    <div className="setting-line">
                      <p>Video Codec</p>
                      <div className="second">
                        <Select className="maxw">
                          {codecs.video.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Audio Codec</p>
                      <div className="second">
                        <Select className="maxw">
                          {codecs.audio.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Bandwidth</p>
                      <div className="second">
                        <Input
                          type="number"
                          value={storage.rtc.bandwidth?.toString()}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              rtc: {
                                ...storage.rtc,
                                bandwidth: e.target.valueAsNumber,
                              },
                            })
                          }
                          className="maxw"
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Recording duration (s)</p>

                      <div className="second">
                        <Input
                          type="number"
                          value={storage.rtc.redordingDuration?.toString()}
                          onChange={(e) =>
                            setStorage({
                              ...storage,
                              rtc: {
                                ...storage.rtc,
                                redordingDuration: e.target.valueAsNumber,
                              },
                            })
                          }
                          className="maxw"
                        />
                      </div>
                    </div>
                    <div className="setting-line">
                      <p>Ban list (IP)</p>
                      <div className="second">
                        <div className="setting-line">
                          <Select
                            style={{ width: "100%" }}
                            className="maxw"
                          ></Select>
                          <Button icon={<Delete24Regular />} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
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
