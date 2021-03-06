import { HandlerContext } from "$fresh/server.ts";
import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import { Todo } from "../../../models/Todo.ts";
import { db } from "../../../utils/db.ts";

const idSchema = z.number();

const todoSchema = z.object({
  completed: z.boolean(),
});

export async function handler(req: Request, ctx: HandlerContext) {
  try {
    if (req.method === "GET") {
      const id = idSchema.parse(Number(ctx.params.id));

      const data = await Todo.find(id);

      return Response.json(
        { data },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "PATCH") {
      const id = idSchema.parse(Number(ctx.params.id));

      const todo = todoSchema.parse(await req.json());

      await Todo.where({ id }).update(todo);
      const data = await Todo.find(id);

      return Response.json(
        { data },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === "DELETE") {
      const id = idSchema.parse(Number(ctx.params.id));

      await Todo.deleteById(id);

      return Response.json(
        { message: "success" },
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
      return Response.json(
        { error, message: "Invalid Id" },
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
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  } finally {
    await db.close();
  }
}
