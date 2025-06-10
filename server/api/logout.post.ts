export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "a-very-secret-password-1234567890",
  });

  await session.clear();

  return { success: true };
});
