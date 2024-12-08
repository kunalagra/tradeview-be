import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';

export default fp(async (fastify) => {
	fastify.register(cors, {
		origin: '*',
	});
	fastify.register(websocket);
});
