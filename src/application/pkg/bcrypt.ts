import bcrypt from "bcrypt";

class Bcrypt {
  static encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  static compare(password: string, encrypt: string): boolean {
    return bcrypt.compareSync(password, encrypt);
  }
}

export default Bcrypt;
