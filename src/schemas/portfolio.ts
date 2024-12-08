import { errorResponseSchema, statusSchema } from './common.js';

export const holdingResponseSchema = {
	response: {
		200: {
			type: 'object',
			properties: {
				status: statusSchema,
				data: {
					type: 'array',
					items: {
						type: 'object',
						required: [
							'tradingsymbol',
							'exchange',
							'isin',
							'quantity',
							'authorised_date',
							'average_price',
							'last_price',
							'close_price',
							'pnl',
							'day_change',
							'day_change_percentage',
						],
						properties: {
							tradingsymbol: { type: 'string' },
							exchange: { type: 'string' },
							isin: { type: 'string' },
							quantity: { type: 'number' },
							authorised_date: {
								type: 'string',
								format: 'date-time',
							},
							average_price: { type: 'number' },
							last_price: { type: 'number' },
							close_price: { type: 'number' },
							pnl: { type: 'number' },
							day_change: { type: 'number' },
							day_change_percentage: { type: 'number' },
						},
					},
				},
			},
			required: ['status', 'data'],
		},
		400: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	},
};
