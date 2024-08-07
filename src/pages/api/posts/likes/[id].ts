import type { APIRoute } from 'astro';
import { db, eq, Post } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const postId = params.id ?? '';

	const posts = await db.select().from(Post).where(eq(Post.id, postId));

	if (posts.length === 0) {
		const post = { id: postId, likes: 0, title: 'Post not found' };

		return new Response(JSON.stringify(post), { status: 200, headers: { 'Content-Type': 'application/json' } });
	}

	return new Response(JSON.stringify(posts.at(0)), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const PUT: APIRoute = async ({ params, request }) => {
	const postId = params.id ?? '';
	const { likes = 0 } = await request.json();

	const posts = await db.select().from(Post).where(eq(Post.id, postId));

	if (posts.length === 0) {
		const post = { id: postId, likes: 0, title: 'Post not found' };

		await db.insert(Post).values(post);
		posts.push(post);
	}

	const post = posts.at(0)!;
	post.likes += likes;

	await db.update(Post).set({ likes: post.likes }).where(eq(Post.id, postId));

	return new Response(JSON.stringify(posts.at(0)), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
