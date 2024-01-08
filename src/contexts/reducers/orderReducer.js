import { Storage, GetStorage, SetStorage } from "../store/store";

export const orderState = Storage("order", { info: "" });

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "get":
      SetStorage("order", { info: state.info });
      return JSON.parse(GetStorage("order"));
    case "set":
      SetStorage("order", { info: action.payload });
      return JSON.parse(GetStorage("order"));
    case "remove":
      SetStorage("order", { info: "" });
      return JSON.parse(GetStorage("order"));
    default:
      return state;
  }
};
