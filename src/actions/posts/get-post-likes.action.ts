import { defineAction, z } from 'astro:actions';
import { db, Post, eq } from 'astro:db';

export const getPostLikes = defineAction({
	accept: 'json',
	input: z.string(),
	handler: async (postId) => {
		const posts = await db.select().from(Post).where(eq(Post.id, postId));

		return { likes: posts.length === 0 ? 0 : posts.at(0)!.likes };
	},
});
