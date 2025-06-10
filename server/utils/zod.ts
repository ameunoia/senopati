import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4),
});

export type User = z.infer<typeof userSchema>;
