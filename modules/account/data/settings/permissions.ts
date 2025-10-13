export type PermissionType = {
  id: string;
  label: string;
  active: boolean;
};
export const permissionSetting: PermissionType[] = [
  {
    label: "Allow to access microphone",
    id: "microphone",
    active: false,
  },
  {
    label: "Allow to access location ",
    id: "location",
    active: true,
  },
  {
    label: "Allow to access notification",
    id: "notification",
    active: false,
  },
  {
    label: "Allow to access camera",
    id: "camera",
    active: false,
  },
];
