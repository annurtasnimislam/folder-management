import { Storage, GetStorage, SetStorage } from "../store/store";

export const crumbState = Storage("crumb", [
  {
    id: "00000",
    name: "root",
    color: "gray",
    subfolders: [],
  },
]);

export const crumbReducer = (state, action) => {
  switch (action.type) {
    case "get":
      SetStorage("crumb", state);
      return JSON.parse(GetStorage("crumb"));
    case "set":
      SetStorage("crumb", action.payload);
      return JSON.parse(GetStorage("crumb"));
    case "remove":
      SetStorage("crumb", []);
      return JSON.parse(GetStorage("crumb"));
    default:
      return state;
  }
};
