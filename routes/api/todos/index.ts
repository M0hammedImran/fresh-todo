import { HandlerContext } from "$fresh/server.ts";
import { Todo } from "../../../models/Todo.ts";
import { db } from "../../../utils/db.ts";
import { TodoInputSchema } from "../../../utils/zodSchema.ts";

export async function handler(req: Request, _ctx: HandlerContext) {
  try {
    if (req.method === "GET") {
      const data = await Todo.all();
      return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const todo = TodoInputSchema.parse(body);
      const data = await Todo.create({ ...todo });

      return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(undefined, {
      headers: { "Content-Type": "application/json" },
      status: 405,
      statusText: "Method Not Allowed",
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
      statusText: "Bad Request",
    });
  } finally {
    await db.close();
  }
}
