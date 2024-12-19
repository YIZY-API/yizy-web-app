//import { dev } from "$app/environment";

//export function setSessionTokenCookie(
//  response: HTTPResponse,
//  token: string,
//  expiresAt,
//): void {
//  if (dev) {
//    // When deployed over HTTPS
//    response.headers.add(
//      "Set-Cookie",
//      `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`,
//    );
//  } else {
//    // When deployed over HTTP (localhost)
//    response.headers.add(
//      "Set-Cookie",
//      `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`,
//    );
//  }
//}
//
//export function deleteSessionTokenCookie(response: HTTPResponse): void {
//  if (!dev) {
//    // When deployed over HTTPS
//    response.headers.add(
//      "Set-Cookie",
//      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;",
//    );
//  } else {
//    // When deployed over HTTP (localhost)
//    response.headers.add(
//      "Set-Cookie",
//      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/",
//    );
//  }
//}
