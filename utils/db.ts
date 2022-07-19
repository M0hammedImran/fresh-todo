import { Database, PostgresConnector } from "$denodb/mod.ts";
import { Todo } from "../models/Todo.ts";

const connection = new PostgresConnector({
  uri: Deno.env.get("DATABASE_URL") as string,
});

export const db = new Database(connection);

db.link([Todo]).sync();
