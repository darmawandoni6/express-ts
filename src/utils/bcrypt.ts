import bcrypt from "bcrypt";

export default {
  encrypt: (password: string): string => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  compare: (password: string, encrypt: string): boolean => {
    return bcrypt.compareSync(password, encrypt);
  },
};
