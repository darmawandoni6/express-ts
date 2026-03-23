import { z } from "zod";

import { UserSchema } from "@shared/dto/user-schema";

export const LoginSchema = z.object({
  body: UserSchema.pick({ email: true, password: true }),
});

export type LoginBody = z.infer<typeof LoginSchema>["body"];

export const LoginResponse = z.object({
  token: z.string(),
  expiredAt: z.string(),
});

export type LoginResponseType = z.infer<typeof LoginResponse>;
