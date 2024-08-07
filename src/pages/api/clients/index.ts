import type { APIRoute } from 'astro';
import { Client, db } from 'astro:db';

export const prerender = true;

export const GET: APIRoute = async ({ params, request }) => {
	const clients = await db.select().from(Client);

	return new Response(JSON.stringify(clients), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ params, request }) => {
	try {
		const { name, age, isActive } = await request.json();

		if (!name || !age || typeof isActive !== 'boolean')
			return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

		const { lastInsertRowid } = await db.insert(Client).values({ name, age, isActive });

		return new Response(JSON.stringify({ id: lastInsertRowid, name, age, isActive }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log(error);

		return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
};
