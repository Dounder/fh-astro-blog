import { column, defineDb, defineTable } from 'astro:db';

const Client = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		age: column.number(),
		isActive: column.boolean(),
	},
});

const Post = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text(),
		likes: column.number(),
	},
});

export default defineDb({
	tables: {
		Client,
		Post,
	},
});
