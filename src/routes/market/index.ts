import { Status } from '@/constants/common.enum.js';
import { historicalDataSchema } from '@/schemas/marketSchema.js';
import { FastifyPluginAsync } from 'fastify';

const marketRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get(
		'/historical-data',
		{
			schema: historicalDataSchema,
		},
		async (request, reply) => {
			const { symbol, from_date, to_date } = request.query as {
				symbol: string;
				from_date: string;
				to_date: string;
			};

			// Convert date strings to Date objects
			const fromDate = new Date(from_date);
			const toDate = new Date(to_date);

			if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
				return reply.sendError(
					400,
					'Invalid date format. Please use YYYY-MM-DD.',
				);
			}

			try {
				const data = await fastify.prisma.marketData.findMany({
					where: {
						instrumentName: symbol,
						date: {
							gte: fromDate, 
							lte: toDate, 
						},
					},
					orderBy: {
						date: 'asc', 
					},
				});

				if (data.length === 0) {
					return reply.sendError(
						400,
						'No data found for the given symbol and date range',
					);
				}
				// Send the response in the specified format
				return reply.send({
					status: Status.SUCCESS,
					data,
				});
			} catch (error) {
				fastify.log.error('Error fetching historical data:', error);
				return reply.sendError(
					500,
					'An error occurred while fetching the data',
				);
			}
		},
	);
	fastify.get('/unique-symbols', async (_request, reply) => {
		try {
			const symbols = await fastify.prisma.marketData.findMany({
				distinct: ['instrumentName'], // Fetch distinct instrument names
				select: {
					instrumentName: true, // Select only the instrumentName field
				},
			});

			const uniqueSymbols = symbols.map((entry) => entry.instrumentName);

			return reply.send({
				status: Status.SUCCESS,
				data: uniqueSymbols,
			});
		} catch (error) {
			fastify.log.error('Error fetching unique symbols:', error);
			return reply.sendError(
				500,
				'An error occurred while fetching unique symbols',
			);
		}
	});
	fastify.get('/ws-market-data', { websocket: true }, (socket, request) => {
		interface WebSocketRequest {
			type: string;
			symbol?: string;
			from_date?: string;
			to_date?: string;
		}

		interface WebSocketResponse {
			type: string;
			data?: any;
			message?: string;
		}

		socket.on('message', (message: Buffer) => {
			const requestData: WebSocketRequest = JSON.parse(
				message.toString(),
			);

			if (requestData.type === 'getIndices') {
				// Query for available indices
				fastify.prisma.marketData
					.findMany({
						distinct: ['instrumentName'],
						select: { instrumentName: true },
					})
					.then((symbols) => {
						const indices = symbols.map(
							(entry) => entry.instrumentName,
						);
						const response: WebSocketResponse = {
							type: 'indices',
							data: indices,
						};
						socket.send(JSON.stringify(response));
					})
					.catch((error) => {
						const response: WebSocketResponse = {
							type: 'error',
							message: 'Error fetching indices',
						};
						socket.send(JSON.stringify(response));
					});
			}

			if (requestData.type === 'getChartData') {
				const { symbol, from_date, to_date } = requestData;

				if (from_date && to_date) {
					fastify.prisma.marketData
						.findMany({
							where: {
								instrumentName: symbol,
								date: {
									gte: new Date(from_date),
									lte: new Date(to_date),
								},
							},
							orderBy: { date: 'asc' },
						})
						.then((data) => {
							const response: WebSocketResponse = {
								type: 'chartData',
								data,
							};
							socket.send(JSON.stringify(response));
						})
						.catch((error) => {
							const response: WebSocketResponse = {
								type: 'error',
								message: 'Error fetching chart data',
							};
							socket.send(JSON.stringify(response));
						});
				} else {
					const response: WebSocketResponse = {
						type: 'error',
						message: 'Invalid date range',
					};
					socket.send(JSON.stringify(response));
				}
			}
		});

		// Handle WebSocket errors
		socket.on('error', (error: Error) => {
			console.error('WebSocket Error:', error);
		});

		// Handle WebSocket connection close
		socket.on('close', () => {
			console.log('WebSocket connection closed');
		});
	});
};

export default marketRoutes;
