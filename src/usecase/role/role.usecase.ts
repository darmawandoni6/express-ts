import Repository from "@database/role/role.repository";
import type { WhereOptions } from "sequelize";
import type { Attributes } from "@database/role/role.model";
import createHttpError from "http-errors";

class Usecases {
  private repository = new Repository();
  where: WhereOptions<Attributes> = {};
  attributes: Partial<Attributes> = {};

  async create() {
    try {
      const att = this.attributes as Attributes;
      const role = await this.repository.findOne(att.name);
      if (role) {
        throw createHttpError.Conflict(`${role.name} sudah ada`);
      }
      await this.repository.create(att);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(id: number) {
    try {
      if (!this.attributes.name) {
        throw createHttpError.BadRequest(`name`);
      }
      const role = await this.repository.findOne(this.attributes.name);
      if (role) {
        throw createHttpError.Conflict(`${role.name} sudah ada`);
      }

      await this.repository.update(id, this.attributes);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(id: number) {
    try {
      await this.repository.remove(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findAll() {
    try {
      const data = await this.repository.findAll();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Usecases;
