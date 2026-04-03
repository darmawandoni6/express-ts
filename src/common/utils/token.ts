import jwt from "jsonwebtoken";

export const generateToken = (data: object): string => {
  const { ACCESS_TOKEN, EXP_TOKEN } = process.env;
  const exp: number = Number(EXP_TOKEN);

  const token = jwt.sign(data, ACCESS_TOKEN as string, { expiresIn: `${exp}D` });
  return token;
};
