import { HandlerContext } from '$fresh/server.ts';
import { Todo } from '../../../Models/Todo.ts';
import { db } from '../../../utils/db.ts';
import * as zod from 'https://deno.land/x/zod@v3.17.3/mod.ts';

const idSchema = zod.number();

const todoSchema = zod.object({
	completed: zod.boolean(),
});

export async function handler(req: Request, ctx: HandlerContext) {
	try {
		if (req.method === 'GET') {
			const id = idSchema.parse(Number(ctx.params.id));

			const data = await Todo.find(id);

			return new Response(JSON.stringify({ data }), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (req.method === 'PATCH') {
			const id = idSchema.parse(Number(ctx.params.id));

			const todo = todoSchema.parse(await req.json());

			await Todo.where({ id }).update(todo);
			const data = await Todo.find(id);
            
			return new Response(JSON.stringify({ data }), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(undefined, {
			headers: { 'Content-Type': 'application/json' },
			status: 405,
			statusText: 'Method Not Allowed',
		});
	} catch (error) {
		if (error instanceof zod.ZodError) {
			return new Response(JSON.stringify({ error, message: 'Invalid Id' }), {
				headers: { 'Content-Type': 'application/json' },
				status: 400,
				statusText: 'Bad Request',
			});
		}

		return new Response(JSON.stringify({ error }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500,
			statusText: 'Internal Server Error',
		});
	} finally {
		await db.close();
	}
}

