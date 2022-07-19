import { Database, PostgresConnector } from "$denodb/mod.ts";
import { Todo } from "../models/Todo.ts";

const connection = new PostgresConnector({
  uri: "postgres://user:password@localhost:5432/freshapp",
});

export const db = new Database(connection);

db.link([Todo]);
