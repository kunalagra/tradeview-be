// server.ts
import fastify from 'fastify';
import app, { options } from './app.js';

// Create a Fastify instance
const server = fastify({
	logger: true, // Optional: enables logging
});

// Register the app
server.register(app, options);

// Start the server
server.listen({ port: 8000, host: '0.0.0.0' });
