/** @jsx h */
import { h } from "preact";
import { Todo } from "../models/Todo.ts";
import { CallbackProps } from "../types.d.ts";

export default function SetCompleted({
  todo,
  onError,
  onSuccess,
}: { todo: Todo } & CallbackProps) {
  const onClick = async () => {
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
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

  return <button onClick={onClick}>{String(todo.completed)}</button>;
}
