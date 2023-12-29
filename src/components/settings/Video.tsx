import {
  Select,
  Input,
  Button,
  Divider,
  Switch,
} from "@fluentui/react-components";
import { FC, Suspense, lazy } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { Delete24Regular } from "@fluentui/react-icons";

const SettingSection = lazy(() => import("./Section"));


type VideoSettingsProps = {
  devices: Devices;
  codecs: Codecs;
};

const VideoSettings: FC<VideoSettingsProps> = ({ devices, codecs }) => {
  const { storage, setStorage } = useUserContext();
  return (
    <Suspense>
      <SettingSection
        title="Video"
        content={
          <>
            <div className="setting-item">
              <div className="setting-line">
                <p>Display format (Width/Height)</p>
                <div className="second">
                  <Switch
                    defaultChecked={storage.video.fullVideoWidth}
                    onChange={(e) =>
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
                          fullVideoWidth: e.target.checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="setting-line">
                <p>Video (Input)</p>
                <div className="second">
                  <Select
                    disabled={devices.error}
                    className="maxw"
                    onChange={(e) => {
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
                          videoInput:
                            devices.videoIn[e.target.selectedIndex].id,
                        },
                      });
                    }}
                  >
                    {devices.videoIn.map((item) => (
                      <option key={item.id + "video-in"}>{item.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="setting-line">
                <p>Audio (Input)</p>
                <div className="second">
                  <Select
                    disabled={devices.error}
                    className="maxw"
                    onChange={(e) => {
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
                          audioInput:
                            devices.audioIn[e.target.selectedIndex].id,
                        },
                      });
                    }}
                  >
                    {devices.audioIn.map((item) => (
                      <option key={item.id + "audio-in"}>{item.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="setting-line">
                <p>Audio (Output)</p>
                <div className="second">
                  <Select
                    disabled={devices.error}
                    className="maxw"
                    onChange={(e) => {
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
                          audioOutput:
                            devices.audioOut[e.target.selectedIndex].id,
                        },
                      });
                    }}
                  >
                    {devices.audioOut.map((item) => (
                      <option key={item.id + "-audio-out"}>{item.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <Divider style={{ margin: "20px 0px" }}>Advanced</Divider>
              <div className="setting-line">
                <p>Video Codec</p>
                <div className="second">
                  <Select className="maxw">
                    {codecs.video.map((item, index) => (
                      <option key={index + "-video"}>{item}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="setting-line">
                <p>Audio Codec</p>
                <div className="second">
                  <Select className="maxw">
                    {codecs.audio.map((item, index) => (
                      <option key={index + "-audio"}>{item}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="setting-line">
                <p>Bandwidth</p>
                <div className="second">
                  <Input
                    type="number"
                    value={storage.video.bandwidth?.toString()}
                    onChange={(e) =>
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
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
                    value={storage.video.redordingDuration?.toString()}
                    onChange={(e) =>
                      setStorage({
                        ...storage,
                        video: {
                          ...storage.video,
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
                    <Select style={{ width: "100%" }} className="maxw"></Select>
                    <Button icon={<Delete24Regular />} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </Suspense>
  );
};

export default VideoSettings;
