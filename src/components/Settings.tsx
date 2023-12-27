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
import { FC } from "react";
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
  return (
    <Dialog open={open} onOpenChange={(_, { open }) => setOpen(open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <SettingSection
              title="Preferences"
              content={
                <>
                  <div className="setting-item">
                    <div className="setting-line">
                      <p>Theme</p>
                      <Select
                        style={{ width: "50%" }}
                        onChange={(e) =>
                          setStorage({
                            ...storage,
                            user: {
                              ...storage.user,
                              theme: e.target
                                .value as typeof storage.user.theme,
                            },
                          })
                        }
                      >
                        <option value="auto">Auto</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="hightcontrast">Hightcontrast</option>
                      </Select>
                    </div>
                    <div className="setting-line">
                      <p>Username</p>
                      <Input
                        style={{ width: "50%" }}
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
                      />
                    </div>

                    <div className="setting-line">
                      <p>Avatar (URL)</p>
                      <Input
                        style={{ width: "50%" }}
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
                      />
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
                    <div className="setting-line">
                      <p>Report</p>
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

                    <div className="setting-line">
                      <p>Screen Sharing</p>
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
                    <Divider style={{ margin: "20px 0px" }}>Left side</Divider>

                    <div className="setting-line">
                      <p>Mute</p>
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
                    <div className="setting-line">
                      <p>Pause</p>
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
                    <div className="setting-line">
                      <p>Close</p>
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
                      <Switch />
                    </div>
                    <div className="setting-line">
                      <p>Image preview</p>
                      <Switch />
                    </div>
                    <div className="setting-line">
                      <p>File sending</p>
                      <Switch />
                    </div>

                    <div className="setting-line">
                      <p>Word filter</p>
                      <div className="setting-line" style={{ width: "50%" }}>
                        <Select style={{ width: "100%" }}></Select>
                        <Button icon={<Add24Regular />} />
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
                      <Select style={{ width: "50%" }}></Select>
                    </div>
                    <div className="setting-line">
                      <p>Audio (Input)</p>
                      <Select style={{ width: "50%" }}></Select>
                    </div>
                    <div className="setting-line">
                      <p>Audio (Output)</p>
                      <Select style={{ width: "50%" }}></Select>
                    </div>
                    <Divider style={{ margin: "20px 0px" }}>Advanced</Divider>
                    <div className="setting-line">
                      <p>Video Codec</p>
                      <Select style={{ width: "50%" }}></Select>
                    </div>
                    <div className="setting-line">
                      <p>Scalability Mode</p>
                      <Select style={{ width: "50%" }}></Select>
                    </div>
                    <div className="setting-line">
                      <p>Bandwidth</p>
                      <Input style={{ width: "50%" }} />
                    </div>
                    <div className="setting-line">
                      <p>Recording duration (s)</p>
                      <Input style={{ width: "50%" }} />
                    </div>
                    <div className="setting-line">
                      <p>Ban list (IP)</p>
                      <div className="setting-line" style={{ width: "50%" }}>
                        <Select style={{ width: "100%" }}></Select>
                        <Button icon={<Delete24Regular />} />
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
