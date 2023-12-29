import { Suspense, lazy } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { Switch, Divider } from "@fluentui/react-components";

const SettingSection = lazy(() => import("./Section"));

const ActionBarSettings = () => {
  const { storage, setStorage } = useUserContext();
  return (
    <Suspense>
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
    </Suspense>
  );
};

export default ActionBarSettings;
