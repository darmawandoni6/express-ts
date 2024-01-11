import type { NextFunction, Request, Response } from "express";

export interface UserAttributes {
  id: number;
  roleId: number;
  username: string;
  password: string;
}

export interface IController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  getByToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  edit(req: Request, res: Response, next: NextFunction): Promise<void>;
  remove(req: Request, res: Response, next: NextFunction): Promise<void>;
}
