export interface UserModel {
  id: string;
  userName: string;
  token: string;
  roles: string[];
}

export interface LoginModel {
  userName: string;
  password: string;
}
