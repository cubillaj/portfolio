import { NextResponse } from "next/server";
import { z } from "zod";
import { readJson } from "../http/read-json";
import { RequestError } from "../http/request-error";

export function withValidation<S extends z.ZodType>(
  schema: S,
  handler: (
    data: z.output<S>,
    request: Request,
  ) => Response | Promise<Response>,
) {
  return async (request: Request): Promise<Response> => {
    let body: unknown;

    try {
      body = await readJson(request);
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof RequestError ? error.message : "Invalid request.",
        },
        {
          status: error instanceof RequestError ? error.status : 400,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const result = await schema.safeParseAsync(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.issues.map((issue) => ({
            path: issue.path.map(String).join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    return handler(result.data, request);
  };
}
