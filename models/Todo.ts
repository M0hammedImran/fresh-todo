import { DataTypes, Model } from "$denodb/mod.ts";

export class Todo extends Model {
	static table = 'todos';
	static timestamps = true;

	static fields = {
		id: { primaryKey: true, autoIncrement: true },
		text: DataTypes.STRING,
		completed: DataTypes.BOOLEAN,
	};

	static defaults = {
		completed: false,
	};
}
