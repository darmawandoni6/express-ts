import type { Role } from "./role";

export interface User {
  id: number;
  roleId: number;
  username: string;
  password: string;
}

export interface Profile extends User {
  createdAt?: Date;
  updatedAt?: Date;
  role: Role;
}

export interface LoginReq {
  username: string;
  password: string;
}
export interface LoginRes {
  token: string;
  expired: Date;
}
