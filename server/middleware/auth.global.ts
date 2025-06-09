// server/middleware/auth.global.ts
import { sessionConfig } from "../utils/sessionConfig";

export default defineEventHandler(async (event) => {
  const url = event.node.req.url;

  if (url?.startsWith("/admin")) {
    const session = await useSession(event, sessionConfig);

    if (!session.data.user) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const user = session.data.user as { role: string };

    if (user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden: Admins only",
      });
    }
  }
});
