export const USER_STATUS = {
  active: "active",

  inactive: "inactive",

  suspended: "suspended",
} as const;

export type TUserStatus =
  keyof typeof USER_STATUS;

  

export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  manager: "manager",
  member: "member",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
