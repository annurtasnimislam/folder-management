import { Storage, GetStorage, SetStorage } from "../store/store";

export const activeState = Storage("active", {
  id: "00000",
  name: "root",
  color: "gray",
  subfolders: [],
});

export const activeReducer = (state, action) => {
  switch (action.type) {
    case "get":
      SetStorage("active", state);
      return JSON.parse(GetStorage("active"));
    case "set":
      SetStorage("active", action.payload);
      return JSON.parse(GetStorage("active"));
    case "remove":
      SetStorage("active", {});
      return JSON.parse(GetStorage("active"));
    default:
      return state;
  }
};
