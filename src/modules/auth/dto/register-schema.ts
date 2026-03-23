import { z } from "zod";

import { UserSchema } from "@shared/dto/user-schema";

export const RegisterSchema = z.object({
  body: UserSchema.pick({ email: true, password: true }),
});
