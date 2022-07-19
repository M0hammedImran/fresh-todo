import { HandlerContext } from "$fresh/server.ts";
import { z } from "$zod/mod.ts";
import { Todo } from "../../../models/Todo.ts";
import { db } from "../../../utils/db.ts";
import { TodoInputSchema } from "../../../utils/zodSchema.ts";

export async function handler(req: Request, _ctx: HandlerContext) {
  try {
    if (req.method === "GET") {
      const data = await Todo.all();
      return Response.json(
        { data },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "POST") {
      const body = await req.json();
      const todo = TodoInputSchema.parse(body);

      const data = await Todo.create({ ...todo });

      return Response.json(
        { data },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return Response.json(undefined, {
      headers: { "Content-Type": "application/json" },
      status: 405,
      statusText: "Method Not Allowed",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues[0].message;
      if (errorMessage) {
        return Response.json(
          { error: errorMessage },
          {
            headers: { "Content-Type": "application/text" },
            status: 400,
            statusText: "Bad Request",
          }
        );
      }

      return Response.json(
        { error: error.message },
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
          statusText: "Bad Request",
        }
      );
    }

    return Response.json(
      { error },
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
        statusText: "Bad Request",
      }
    );
  } finally {
    await db.close();
  }
}
