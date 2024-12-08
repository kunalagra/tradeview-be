import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
// 1 is added to name so that autoload will always load it first
const schema = {
	type: 'object',
	properties: {
		DATABASE_URL: {
			type: 'string',
		},
		JWT_SECRET_KEY: {
			type: 'string',
		},
	},
	required: ['DATABASE_URL'],
};

const options = {
	dotenv: true,
	schema: schema,
};

export interface envPluginOptions {
	DATABASE_URL: string;
	JWT_SECRET_KEY: string;
}
export default fp<envPluginOptions>(async (fastify) => {
	await fastify.register(fastifyEnv, options);
});

declare module 'fastify' {
	export interface FastifyInstance {
		config: envPluginOptions;
	}
}
