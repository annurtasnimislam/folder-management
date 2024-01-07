import { Storage, GetStorage, SetStorage } from "../store/store";

export const folderState = Storage("folder", []);

export const folderReducer = (state, action) => {
  switch (action.type) {
    case "get":
      SetStorage("folder", state);
      return JSON.parse(GetStorage("folder"));
    case "set":
      SetStorage("folder", action.payload);
      return JSON.parse(GetStorage("folder"));
    case "remove":
      SetStorage("folder", []);
      return JSON.parse(GetStorage("folder"));
    default:
      return state;
  }
};
