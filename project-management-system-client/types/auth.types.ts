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
  refreshToken: string | null;
}

type RefreshResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};