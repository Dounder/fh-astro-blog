import { defineAction, z } from 'astro:actions';
import { db, Post, eq } from 'astro:db';

export const updatePostLikes = defineAction({
	accept: 'json',
	input: z.object({
		postId: z.string(),
		likes: z.number(),
	}),
	handler: async ({ postId, likes }) => {
		const posts = await db.select().from(Post).where(eq(Post.id, postId));

		if (posts.length === 0) {
			const post = { id: postId, likes: 0, title: 'Post not found' };

			await db.insert(Post).values(post);
			posts.push(post);
		}

		const post = posts.at(0)!;
		post.likes += likes;

		await db.update(Post).set({ likes: post.likes }).where(eq(Post.id, postId));

		return true;
	},
});
