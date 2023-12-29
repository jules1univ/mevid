import { useReducer } from "react";

const appReducer = (state: AppState, action: AppAction) => {
  let newState = structuredClone(state);

  switch (action.type) {
    case "active":
      newState.active =
        action.payload === undefined ? !newState.active : action.payload;
      break;
    case "pause":
      newState.pause =
        action.payload === undefined ? !newState.pause : action.payload;
      break;
    case "mute":
      newState.mute =
        action.payload === undefined ? !newState.mute : action.payload;
      break;
    case "messageModal":
      newState.messageModal =
        action.payload === undefined ? !newState.messageModal : action.payload;
      break;
    case "settingModal":
      newState.settingModal =
        action.payload === undefined ? !newState.settingModal : action.payload;
      break;
  }

  return newState;
};

export const useAppReducer = () =>
  useReducer<typeof appReducer>(appReducer, {
    pause: false,
    active: false,
    mute: false,

    messageModal: false,
    settingModal: false,
  });
