import fp from 'fastify-plugin';
import fastifyJWT from '@fastify/jwt';

export interface AuthPluginOptions {
	jwtSecret: string;
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: {
			userId: string;
			email: string;
		};
	}
}

export default fp<AuthPluginOptions>(async (fastify, opts) => {
	fastify.register(fastifyJWT, {
		secret: fastify.config.JWT_SECRET_KEY || 'supersecret',
	});

	fastify.decorate('authenticate', async function (request, reply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});
});

declare module 'fastify' {
	export interface FastifyInstance {
		authenticate(request: any, reply: any): Promise<void>;
	}
}
