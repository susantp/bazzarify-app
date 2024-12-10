import React from "react";
import LanguageSettingScreen from "@/components/account/setting/screens/languageScreen";
import AddressSettingScreen from "@/components/account/setting/screens/addressSettingScreen";
import TermsPolicyScreen from "@/components/account/setting/screens/TermsPolicyScreen";
import PermissionSettingScreen from "@/components/account/setting/screens/permissionSetting";
import NotificationSettingScreen from "@/components/account/setting/screens/notificationsSetting";
import FaqScreen from "@/components/account/setting/screens/FaqScreen";

export interface IProfileMenu {
  id: string;
  label: string;
  screen?: React.ReactNode;
}

export enum SettingEnum {
  ADDRESS_BOOK = "addressBook",
  NOTIFICATION = "notification",
  LANGUAGE = "language",
  PERMISSIONS = "permissions",
  CONDITIONS = "conditions",
  FAQ = "faq",
  FEEDBACK = "feedback",
  REQUEST_ACCOUNT_DELETION = "requestAccountDeletion",
}

export const settingList: IProfileMenu[] = [
  {
    id: SettingEnum.ADDRESS_BOOK,
    label: "Address Book",
    screen: <AddressSettingScreen />,
  },
  {
    id: SettingEnum.NOTIFICATION,
    label: "Notification",
    screen: <NotificationSettingScreen />,
  },
  {
    id: SettingEnum.LANGUAGE,
    label: "Language",
    screen: <LanguageSettingScreen />,
  },
  {
    id: SettingEnum.PERMISSIONS,
    label: "Permissions",
    screen: <PermissionSettingScreen />,
  },
  {
    id: SettingEnum.CONDITIONS,
    label: "Conditions",
    screen: <TermsPolicyScreen />,
  },
  { id: SettingEnum.FAQ, label: "FAQ", screen: <FaqScreen /> },
  { id: SettingEnum.FEEDBACK, label: "Feedback" },
  {
    id: SettingEnum.REQUEST_ACCOUNT_DELETION,
    label: "Request Account Deletion",
  },
];
