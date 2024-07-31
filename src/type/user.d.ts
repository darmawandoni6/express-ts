import type { Role } from "./role";

export namespace User {
  export interface Attributes {
    id: number;
    roleId: number;
    username: string;
    password: string;
  }

  export interface Profile extends Attributes {
    createdAt?: Date;
    updatedAt?: Date;
    role: Role.Attributes;
  }
  export interface LoginReq {
    username: string;
    password: string;
  }
  export interface LoginRes {
    token: string;
    expired: Date;
  }
}
