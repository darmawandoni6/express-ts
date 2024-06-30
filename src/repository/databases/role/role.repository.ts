import db from "@driver/index";
import type { Attributes } from "./role.model";

class Repository {
  private db = db.role;

  async create(payload: Attributes) {
    try {
      await this.db.create(payload);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findOne(name: string) {
    try {
      const res = await this.db.findOne({ where: { name } });
      return res?.toJSON();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(id: number, data: Partial<Attributes>) {
    try {
      await this.db.update(data, { where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(id: number) {
    try {
      await this.db.update({ status: false }, { where: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findAll() {
    try {
      const res = await this.db.findAll();
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Repository;
