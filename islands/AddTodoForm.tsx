/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { CallbackProps } from "../types.d.ts";

export default function AddTodoForm({ onSuccess, onError }: CallbackProps) {
  const [todo, setTodo] = useState("");

  const onSubmit = async (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    try {
      e.preventDefault();

      const data = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text: todo, completed: false }),
      });
      await data.json();
      if (onSuccess) {
        return onSuccess();
      }
      
      window.location.reload();
    } catch (error) {
      console.log(error);
      onError?.(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        class={tw`flex gap-4 flex-col md:flex-row items-center justify-center max-w-5xl mx-auto w-full`}
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(() => e.currentTarget.value)}
          name="todo"
          id="todo"
          class={tw`border w-full rounded-md p-2`}
        />
        <button
          class={tw`bg-indigo-500 w-full md:max-w-xs text-white font-medium rounded px-4 py-2`}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
