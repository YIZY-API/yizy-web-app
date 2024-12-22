import {
  createSession,
  generateSessionToken,
  getOrCreateUser,
  type NewUserDto,
  removeSessionWithToken,
} from "../data/dbService";
import { Google } from "arctic";
import {
  GOOGLE_OAUTH_CALLBACK_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} from "$env/static/private";

export const google = new Google(
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK_URL,
);

export async function login(email: string): Promise<string> {
  const user: NewUserDto = await getOrCreateUser("testuser", email, null);
  const token = generateSessionToken();
  await createSession(token, user.id);
  return token;
}

export async function loginWithGoogle(
  googleId: string,
  email: string,
  username: string,
): Promise<{ token: string; expiresAt: Date }> {
  const user: NewUserDto = await getOrCreateUser(username, email, googleId);
  const token = generateSessionToken();
  const ses = await createSession(token, user.id);
  return {
    token: token,
    expiresAt: ses.expiresAt,
  };
}

export async function logout(token: string): Promise<void> {
  await removeSessionWithToken(token);
}
