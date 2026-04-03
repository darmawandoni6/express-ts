import { z } from "zod";

export const UserSchema = z.object({
  email: z.email(),
  password: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
