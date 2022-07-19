import { Database, PostgresConnector } from '$denodb/mod.ts';
import { Todo } from "../models/Todo.ts";

const connection = new PostgresConnector({
	host: 'localhost',
	port: 5432,
	username: 'user',
	password: 'password',
	database: 'freshapp',
});

export const db = new Database(connection);

db.link([Todo])

