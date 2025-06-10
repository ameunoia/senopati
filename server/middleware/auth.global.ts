export default defineEventHandler(async (event) => {
  const url = event.node.req.url;

  const protectedPaths = ["/home", "/admin"];

  if (protectedPaths.some((path) => url?.startsWith(path))) {
    const session = await useSession(event, {
      password: "a-very-secret-password-1234567890",
    });

    if (!session.data.user) {
      sendRedirect(event, "/", 302);
      return;
    }

    if (url?.startsWith("/admin") && session.data.user.role !== "admin") {
      sendRedirect(event, "/home", 302);
      return;
    }
  }
});
