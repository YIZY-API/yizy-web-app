import { json, type RequestEvent } from "@sveltejs/kit";
import * as specService from "$lib/server/services/application/specService";
import { object, ObjectSchema, string, ValidationError } from "yup";
import * as yizyService from "$lib/api-client/yizyClient";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  const schema: ObjectSchema<yizyService.CreateSpecRequest> = object({
    name: string().defined(),
    creatorUserId: string().defined(),
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

  const req = body as yizyService.CreateSpecRequest;

  const result = await specService.createSpec(req.name, req.creatorUserId);
  if (!result) {
    const res: yizyService.CreateSpecResponse = {
      error: { msg: "unable to create spec", code: 500 },
      result: null,
    };
    return json({ res }, { status: 200 });
  } else {
    const res: yizyService.CreateSpecResponse = {
      error: null,
      result: {
        name: result.name,
        id: result.id,
      },
    };
    return json({ res }, { status: 200 });
  }
}
