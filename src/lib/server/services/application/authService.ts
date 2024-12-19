import {
  createSession,
  generateSessionToken,
  getOrCreateUser,
  type NewUserDto,
  removeSessionWithToken,
} from "../data/dbService";

export async function login(email: string): Promise<string> {
  const user: NewUserDto = await getOrCreateUser("testuser", email);
  const token = generateSessionToken();
  await createSession(token, user.id);
  return token;
}

export async function logout(token: string): Promise<void> {
  await removeSessionWithToken(token);
}
