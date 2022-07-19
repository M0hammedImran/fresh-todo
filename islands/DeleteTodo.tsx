/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { CallbackProps } from "../types.d.ts";

interface Props extends CallbackProps {
  todoId: string;
}

export default function DeleteTodo({ todoId, onError, onSuccess }: Props) {
  const onClick = async () => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);

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
    <div class={tw`w-full flex justify-end`}>
      <button
        onClick={onClick}
        class={tw`bg-red-500 text-white rounded-md text-sm p-1`}
      >
        Delete
      </button>
    </div>
  );
}
