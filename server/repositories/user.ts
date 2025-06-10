import { z } from "zod";
import { userSchema } from "../utils/zod";

export type User = z.infer<typeof userSchema> & {
  role: "admin" | "employee";
};

const users: User[] = [
  {
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    username: "employee",
    password: "employee",
    role: "employee",
  },
];

export const userRepository = {
  findByUsernameAndPassword(username: string, password: string): User | null {
    return (
      users.find((u) => u.username === username && u.password === password) ||
      null
    );
  },

  findById(id: number): User | null {
    return users[id] || null;
  },
};
