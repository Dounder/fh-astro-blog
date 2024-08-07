import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const { slug } = params;

	const post = await getEntry('blog', slug as any);

	if (!post) return new Response(JSON.stringify({ msg: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

	return new Response('Ok!', { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	return new Response(
		JSON.stringify({
			method: 'POST',
			...body,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};

export const PUT: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	return new Response(
		JSON.stringify({
			method: 'PUT',
			...body,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};

export const DELETE: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	return new Response(
		JSON.stringify({
			method: 'DELETE',
			...body,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	return new Response(
		JSON.stringify({
			method: 'PATCH',
			...body,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};