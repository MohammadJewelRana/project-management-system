export type UserRole =
  | "admin"
  | "manager"
  | "member";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
}