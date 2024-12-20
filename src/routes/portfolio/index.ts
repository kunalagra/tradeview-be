import { holdingResponseSchema } from '@/schemas/portfolio.js';
import { FastifyPluginAsync } from 'fastify';

const portfolioRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get(
		'/holdings',
		{
			schema: holdingResponseSchema,
			preValidation: [fastify.authenticate],
		},
		async (req, reply) => {
			const holdingResponse = {
				status: 'success',
				data: [
					{
						tradingsymbol: 'GOLDBEES',
						exchange: 'BSE',
						isin: 'INF204KB17I5',
						quantity: 2,
						authorised_date: '2021-06-08 00:00:00',
						average_price: 40.67,
						last_price: 42.47,
						close_price: 42.28,
						pnl: 3.5999999999999943,
						day_change: 0.18999999999999773,
						day_change_percentage: 0.44938505203405327,
					},
					{
						tradingsymbol: 'IDEA',
						exchange: 'NSE',
						isin: 'INE669E01016',
						quantity: 5,
						authorised_date: '2021-06-08 00:00:00',
						average_price: 8.466,
						last_price: 10,
						close_price: 10.1,
						pnl: 7.6700000000000035,
						day_change: -0.09999999999999964,
						day_change_percentage: -0.9900990099009866,
					},
				],
			};

			reply.send(holdingResponse);
		},
	);
};

export default portfolioRoutes;
