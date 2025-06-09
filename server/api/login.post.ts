import { userSchema } from "../utils/zod";
import { userRepository } from "../repositories/user";
import { sessionConfig } from "../utils/sessionConfig";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const validatedUser = userSchema.parse(body);

    const foundUser = userRepository.findByUsernameAndPassword(
      validatedUser.username,
      validatedUser.password
    );

    if (!foundUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid credentials",
      });
    }

    const session = await useSession(event, sessionConfig);
    await session.update({
      user: {
        username: foundUser.username,
        role: foundUser.role,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: error.errors,
      });
    }
    throw error;
  }
});
