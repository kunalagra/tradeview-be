import { errorResponseSchema } from './common.js';

export const placeOrderResponseSchema = {
	type: 'object',
	properties: {
		status: { type: 'string', enum: ['success', 'error'] },
		data: {
			type: 'object',
			properties: {
				message: { type: 'string' },
				order_id: { type: 'string' },
			},
			required: ['message', 'order_id'],
		},
	},
	required: ['status', 'data'],
};

export const placeOrderSchema = {
	body: {
		type: 'object',
		required: ['symbol', 'quantity', 'price'],
		properties: {
			symbol: { type: 'string' },
			quantity: { type: 'number', minimum: 1 },
			price: { type: 'number', minimum: 0.001 }, // Price should be greater than 0
		},
	},
	Response: {
		200: placeOrderResponseSchema,
		400: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	},
};
