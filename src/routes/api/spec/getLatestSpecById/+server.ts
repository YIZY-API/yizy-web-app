import { json, type RequestEvent } from "@sveltejs/kit";
import * as specService from "$lib/server/services/application/specService";
import { object, ObjectSchema, string, ValidationError } from "yup";
import * as yizyService from "$lib/api-client/yizyClient";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  const schema: ObjectSchema<yizyService.GetLatestSpecByIdRequest> = object({
    id: string().defined(),
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

  const req = body as yizyService.GetLatestSpecByIdRequest;

  const result = await specService.getLatestSpecById(req.id);
  if (result == null) {
    const res: yizyService.GetLatestSpecByIdResponse = {
      error: null,
      result: null,
    };
    return json(res, { status: 200 });
  } else {
    const res: yizyService.GetLatestSpecByIdResponse = {
      error: null,
      result: {
        content: result.content,
        name: result.name,
        versionNumber: result.version.toString(),
        snapshotId: result.snapshotId,
      },
    };
    return json(res, { status: 200 });
  }
}
