import { json, type RequestEvent } from "@sveltejs/kit";
import * as specService from "$lib/server/services/application/specService";
import { object, ObjectSchema, string, ValidationError } from "yup";
import * as yizyService from "$lib/api-client/yizyClient";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  const schema: ObjectSchema<yizyService.UpdateSpecRequest> = object({
    content: string().defined(),
    specId: string().defined(),
    updatorUserId: string().defined(),
    prevSpecSnapshotId: string().defined(),
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

  const req = body as yizyService.UpdateSpecRequest;

  const result = await specService.updateSpec(
    req.specId,
    req.prevSpecSnapshotId,
    req.content,
    req.updatorUserId,
  );
  if (!result) {
    const res: yizyService.UpdateSpecResponse = {
      error: { msg: "unable to update spec", code: 500 },
      result: null,
    };
    return json({ res }, { status: 200 });
  } else {
    const res: yizyService.UpdateSpecResponse = {
      error: null,
      result: {
        content: result.content,
        prevSnapshotId: result.prevSnapshotId,
        versionNumber: result.versionNum,
      },
    };
    return json({ res }, { status: 200 });
  }
}
