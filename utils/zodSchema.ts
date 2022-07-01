import { z }  from '$zod/mod.ts';


export const TodoInputSchema = z.object({
	text: z.string(),
	completed: z.boolean(),
});


export const TodoSchema = TodoInputSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
