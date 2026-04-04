import bcrypt from "bcrypt";

export const Bcrypt = {
  encrypt: (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  compare: (password: string, encrypt: string): boolean => {
    return bcrypt.compareSync(password, encrypt);
  },
};
