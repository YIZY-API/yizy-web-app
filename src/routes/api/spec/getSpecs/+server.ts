import { json, type RequestEvent } from "@sveltejs/kit";
import * as specService from "$lib/server/services/application/specService";
import { object, ObjectSchema, string, ValidationError } from "yup";
import * as yizyService from "$lib/api-client/yizyClient";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  const schema: ObjectSchema<yizyService.GetSpecsRequest> = object({
    userId: string().defined(),
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

  const req = body as yizyService.GetSpecsRequest;

  const result = await specService.getSpecs(req.userId);
  const res: yizyService.GetSpecsResponse = {
    error: null,
    result: {
      resultset: result.map((r) => {
        return {
          name: r.name,
          id: r.uuid,
        };
      }),
    },
  };
  return json({ res }, { status: 200 });
}
