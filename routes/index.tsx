/** @jsx h */
import { h } from "preact";

import { Handlers } from "$fresh/server.ts";
import { Todo } from "../models/Todo.ts";
import { tw } from "@twind";
import AddTodoForm from "../islands/AddTodoForm.tsx";
import SetCompleted from "../islands/SetCompleted.tsx";
import DeleteTodo from "../islands/DeleteTodo.tsx";

export const handler: Handlers<HomeProps> = {
  async GET(_, ctx) {
    const todos = await Todo.select("id", "text", "completed")
      .orderBy("id")
      .all();
    return ctx.render({ todos: todos as Todo[] });
  },
};

interface HomeProps {
  todos?: Todo[] | null;
  error?: string;
}

export default function Home({ data }: { data: HomeProps }) {
  return (
    <div class={tw`p-4 mx-auto max-w-6xl flex flex-col gap-4`}>
      <AddTodoForm />

      <div
        class={tw`grid gap-4 md: grid-cols-4 grid-rows-6 md:grid-flow-row place-items-center`}
      >
        {data?.todos?.map((todo) => (
          <div
            key={todo.id}
            class={tw`max-w-xs w-full bg-yellow-100 shadow rounded p-2`}
          >
            <h1>Todo: {todo.text}</h1>
            <p>
              Completed: <SetCompleted todo={todo} />
            </p>

            <DeleteTodo todoId={todo.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
