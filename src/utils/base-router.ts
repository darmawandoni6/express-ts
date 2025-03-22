import express from "express";

export abstract class RouterBase {
  protected readonly route;

  constructor() {
    this.route = express.Router();
    this.routes();
  }

  get router() {
    return this.route;
  }

  protected abstract routes(): void;
}
