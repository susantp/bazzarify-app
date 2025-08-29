import { atom } from "jotai";

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

export const userProfileAtom = atom<UserProfileType>(userProfile);
