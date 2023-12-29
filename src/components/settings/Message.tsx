import { Suspense, lazy } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { Button, Select, Switch } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

const SettingSection = lazy(() => import("./Section"));

const MessageSettings = () => {
  const { storage, setStorage } = useUserContext();

  return (
    <Suspense>
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
                    <Select style={{ width: "100%" }} className="maxw"></Select>
                    <Button icon={<Add24Regular />} />
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

export default MessageSettings;
