import db from "@driver/index";
import type { Attributes } from "./user.model";
import type { WhereOptions } from "sequelize";

class Repository {
  private db = db.user;
  private role = db.role;

  async create(payload: Attributes) {
    try {
      await this.db.create(payload);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findOne(where: WhereOptions<Attributes>) {
    try {
      const data = await this.db.findOne({ where, include: [{ model: this.role }] });
      return data?.toJSON();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(payload: Partial<Attributes>, where: WhereOptions<Attributes>) {
    try {
      await this.db.update(payload, { where });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(id: number) {
    try {
      await this.db.destroy({ where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Repository;
