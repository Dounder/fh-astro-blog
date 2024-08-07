import type { APIRoute } from 'astro';
import { Client, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const clientId = params.clientId;

	return new Response(JSON.stringify({ method: 'GET', clientId: Number(clientId) }), {
		status: 201,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const clientId = params.clientId ?? '';

	try {
		const { name, age, isActive } = await request.json();

		if (!name || !age || typeof isActive !== 'boolean')
			return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

		await db.update(Client).set({ name, age, isActive }).where(eq(Client.id, +clientId));

		const updatedClient = await db.select().from(Client).where(eq(Client.id, +clientId));

		return new Response(JSON.stringify(updatedClient.at(0)), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.log(error);

		return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
};

export const DELETE: APIRoute = async ({ params, request }) => {
	try {
		const clientId = params.clientId ?? '';

		const { rowsAffected } = await db.delete(Client).where(eq(Client.id, +clientId));

		if (rowsAffected === 0)
			return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

		return new Response(JSON.stringify({ message: `Client with id ${clientId} deleted` }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log(error);

		return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
};
