import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Title1,
  Title3,
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

const SettingsModal: FC<SettingsModalProps> = ({ open, setOpen }) => {
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
                      <Select style={{ width: "50%" }}>
                        <option>Auto</option>
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Hightcontrast</option>
                      </Select>
                    </div>
                    <div className="setting-line">
                      <p>Username</p>
                      <Input style={{ width: "50%" }} />
                    </div>

                    <div className="setting-line">
                      <p>Avatar (URL)</p>
                      <Input style={{ width: "50%" }} />
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
                      <Switch />
                    </div>
                    <div className="setting-line">
                      <p>Report</p>
                      <Switch />
                    </div>

                    <div className="setting-line">
                      <p>Screen Sharing</p>
                      <Switch />
                    </div>
                    <Divider style={{ margin: "20px 0px" }}>Left side</Divider>

                    <div className="setting-line">
                      <p>Mute</p>
                      <Switch />
                    </div>
                    <div className="setting-line">
                      <p>Pause</p>
                      <Switch />
                    </div>
                    <div className="setting-line">
                      <p>Close</p>
                      <Switch />
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
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary" icon={<Save24Regular />}>
              Save
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SettingsModal;
