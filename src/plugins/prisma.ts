import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp(async (fastify) => {
	const prisma = new PrismaClient();

	await prisma.$connect();

	// Decorate Fastify instance with Prisma client
	fastify.decorate('prisma', prisma);

	fastify.addHook('onClose', async (fastify) => {
		await fastify.prisma.$disconnect();
	});
});

// Extend the FastifyInstance type for TypeScript
declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}
