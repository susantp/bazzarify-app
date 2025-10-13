import React from "react";
import LanguageSettingScreen from "@/modules/account/components/settings/languageScreen";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";
import TermsPolicyScreen from "@/modules/account/components/settings/TermsPolicyScreen";
import PermissionSettingScreen from "@/modules/account/components/settings/permissionSetting";
import NotificationSettingScreen from "@/modules/account/components/settings/notificationsSetting";
import FaqScreen from "@/modules/account/components/settings/FaqScreen";

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
