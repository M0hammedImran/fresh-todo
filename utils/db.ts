import { Database, PostgresConnector } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';
import { Todo } from "../Models/Todo.ts";

const connection = new PostgresConnector({
	host: 'localhost',
	port: 5432,
	username: 'user',
	password: 'password',
	database: 'freshapp',
});

export const db = new Database(connection);

db.link([Todo])

