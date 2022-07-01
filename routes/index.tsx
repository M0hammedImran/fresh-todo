/** @jsx h */
import { h } from 'preact';

import { Handlers } from '$fresh/server.ts';
import { Todo } from '../models/Todo.ts';

export const handler: Handlers<Todo[] | null> = {
	async GET(_, ctx) {
		const todos = await Todo.select('id', 'text', 'completed').orderBy('id').all();
		return ctx.render(todos);
	},
};

export default function Home({ data }: { data: Todo[] | null }) {
	return (
		<div>
			{data?.map((todo) => (
				<div key={todo.id}>
					<h1>Todo: {todo.text}</h1>
					<p>Completed: {String(todo.completed)}</p>
				</div>
			))}
		</div>
	);
}

