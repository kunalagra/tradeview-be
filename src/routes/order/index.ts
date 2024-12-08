import { placeOrderSchema } from '@/schemas/orderSchema.js';
import { FastifyPluginAsync } from 'fastify';

const portfolioRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post(
		'/place_order',
		{ schema: placeOrderSchema, preValidation: [fastify.authenticate] },
		async (req, reply) => {
			// const { symbol, quantity, price } = req.body as {
			// 	symbol: string;
			// 	quantity: number;
			// 	price: number;
			//   };

			// Simulate generating an order ID (In a real application, you'd call a service to place the order)
			const order_id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

			reply.send({
				status: 'success',
				data: {
					message: 'Order Placed Successfully',
					order_id,
				},
			});
		},
	);
};

export default portfolioRoutes;
