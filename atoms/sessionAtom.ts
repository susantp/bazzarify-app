import { atom } from "recoil";
import { getValueFor } from "@/utils/secureStore";

type UserProfileType = {
  name: string;
  displayName?: string;
  email: string;
  phoneNumber: string;
  dob: string;
};

const userProfile: UserProfileType = {
  displayName: "",
  email: "omprakash@gmail.com  ",
  phoneNumber: "+9779876543210",
  name: "Om Prakash Shah",
  dob: "12/12/1992",
};

export const userSession = atom({
  key: "session",
  default: false,
});
export const userToken = atom({
  key: "token",
  default: getValueFor("token"),
});

export const userProfileAtom = atom<UserProfileType>({
  key: "profile",
  default: userProfile,
});
