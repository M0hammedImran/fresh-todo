import { z }  from '$zod/mod.ts';


export const TodoInputSchema = z.object({
	text: z.string().min(3, 'text should be atleast 3 characters'),
	completed: z.boolean(),
});


export const TodoSchema = TodoInputSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
