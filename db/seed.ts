import { getCollection } from 'astro:content';
import { Client, db, Post } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Client).values([
		{ id: 1, name: 'Alice', age: 25, isActive: true },
		{ id: 2, name: 'Bob', age: 30, isActive: false },
		{ id: 3, name: 'Charlie', age: 35, isActive: true },
	]);

	const posts = await getCollection('blog');

	await db.insert(Post).values(
		posts.map((post) => ({
			id: post.slug,
			title: post.data.title,
			likes: Math.floor(Math.random() * 100),
		}))
	);

	console.log('Database seeded!');
}
