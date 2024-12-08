import { Status } from '@/constants/common.enum.js';
import { FastifyInstance, FastifyPluginCallback, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

// Define the method for the reply object
declare module 'fastify' {
	interface FastifyReply {
		sendError: (statusCode: number, message: string) => void;
	}
}

const sendErrorPlugin: FastifyPluginCallback = (
	fastify: FastifyInstance,
	options,
	done,
) => {
	// Add the `sendError` method to the reply object
	fastify.decorateReply(
		'sendError',
		function (this: FastifyReply, statusCode: number, message: string) {
			this.status(statusCode).send({
				status: Status.ERROR,
				message,
			});
		},
	);

	// Transform all errors into a JSON response in the format
	fastify.setErrorHandler((error, request, reply) => {
		const code = error.statusCode || 500;
		reply.status(code).send({
			status: 'error',
			message: error.message,
		});
	});

	done();
};

// Export the plugin using fastify-plugin for better type inference
export default fp(sendErrorPlugin, {
	name: 'fastify-send-error',
});
