import RoleRepository from "@modules/role/role.repository";
import RoleService from "@modules/role/role.service";
import UserRepository from "@modules/user/user.repository";
import UserService from "@modules/user/user.service";
import type { HelperUser } from "@type/helper";

import type Database from "./app/database";

class Service {
  roleRepository: RoleRepository;
  roleService: RoleService;

  helperUser: HelperUser;
  userRepository: UserRepository;
  userService: UserService;

  constructor({ model }: Database) {
    this.roleRepository = new RoleRepository(model.Role);
    this.roleService = new RoleService(this.roleRepository);

    this.helperUser = {
      model: {
        Role: model.Role,
      },
    };
    this.userRepository = new UserRepository(model.User);
    this.userService = new UserService(this.userRepository, this.helperUser);
  }
}

export default Service;
