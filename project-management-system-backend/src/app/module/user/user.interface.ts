export type UserRole = "admin" | "manager" | "member";

export type UserStatus = "active" | "inactive" | "suspended";

export interface IUser {
  name: string;

  username?: string;

  email: string;

  password: string;

  phone?: string;

  avatar?: string;

  bio?: string;

  role: UserRole;

  department?: string;

  designation?: string;

  skills?: string[];

  status: UserStatus;

  isVerified: boolean;

  lastLogin?: Date;

  timezone?: string;

  createdBy?: string;

  updatedBy?: string;

  isDeleted?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
