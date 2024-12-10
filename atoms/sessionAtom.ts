import { atom } from "recoil";

export const userSession = atom({
  key: "session",
  default: false,
});
