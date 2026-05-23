import { TUserRole, TUserStatus } from "./user.constant";

 

 

export interface IUser {
  name: string;

  username?: string;

  email: string;

  password: string;

  phone?: string;

  avatar?: string;

  bio?: string;

  role: TUserRole;

  department?: string;

  designation?: string;

  skills?: string[];

  status: TUserStatus;

  isVerified: boolean;

  lastLogin?: Date;

  timezone?: string;

  createdBy?: string;

  updatedBy?: string;

  isDeleted?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
