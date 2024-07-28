export interface User {
  username: string;
  name: string;
  privilege: number;
}

export const privilegeRoleTable: { [key: number]: string } = {
  1: "普通助理",
  2: "资深助理",
  3: "黑心",
};
