import { Select, Input } from "@fluentui/react-components";
import { Suspense, lazy } from "react";
import { useUserContext } from "../../hooks/useUserContext";

const SettingSection = lazy(() => import("./Section"));

const UserSettings = () => {
  const { storage, setStorage } = useUserContext();
  return (
    <Suspense>
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
                    <option key={0}>Auto</option>
                    <option key={1}>Light</option>
                    <option key={2}>Dark</option>
                    <option key={3}>Hightcontrast</option>
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
    </Suspense>
  );
};

export default UserSettings;
