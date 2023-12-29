type MessageData = {
  username: string;
  content: string;
};

type AppStateProps = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

type BottomBarProps = AppStateProps;
type SettingsModalProps = AppStateProps;
type VideoViewProps = AppStateProps;
type MessagesDrawerProps = AppStateProps & {
  messages: MessageData[];
};
