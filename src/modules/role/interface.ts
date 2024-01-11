import type { NextFunction, Request, Response } from "express";

export interface RoleAtributes {
  id: number;
  name: string;
  status: boolean;
}

export interface IController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  edit(req: Request, res: Response, next: NextFunction): Promise<void>;
  remove(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
