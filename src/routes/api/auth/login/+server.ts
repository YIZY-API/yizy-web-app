import { json, type RequestEvent } from "@sveltejs/kit";
import * as authService from "$lib/server/services/application/authService";
import { object, ObjectSchema, string, ValidationError } from "yup";
import * as yizyService from "$lib/api-client/yizyClient";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  const schema: ObjectSchema<yizyService.LoginRequest> = object({
    email: string().defined(),
  });

  try {
    await schema.validate(body);
  } catch (error) {
    if (error instanceof ValidationError) {
      return json({
        result: null,
        error: {
          code: 400,
          msg: error.message,
        },
      }, { status: 200 });
    }
  }

  const token = await authService.login("testemail@gmail.com");

  const loginRes: yizyService.LoginResponse = {
    result: {
      token: token,
    },
    error: null,
  };

  //cookies.set("sessionToken", token, {
  //  httpOnly: false,
  //  path: "/",
  //  secure: false,
  //  sameSite: "lax",
  //});
  const headers: HeadersInit = [[
    "Set-Cookie",
    `sessionToken=${token};httpOnly=true;secure=true;sameSite=lax;path=/;`,
  ]];

  const res: Response = json(loginRes, {
    status: 200,
    headers: headers,
  });
  return res;
}
