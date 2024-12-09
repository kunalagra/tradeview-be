import { errorResponseSchema, statusSchema } from './common.js';

export const historicalDataSuccessResponseSchema = {
	type: 'object',
	properties: {
		status: statusSchema,
		data: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					date: { type: 'string', format: 'date' },
					price: { type: 'number' },
				},
				required: ['date', 'price'],
			},
		},
	},
	required: ['status', 'data'],
};

export const historicalDataSchema = {
	querystring: {
		type: 'object',
		properties: {
			symbol: { type: 'string' },
			from_date: { type: 'string', format: 'date' }, // Ensures the date is in YYYY-MM-DD format
			to_date: { type: 'string', format: 'date' }, // Ensures the date is in YYYY-MM-DD format
		},
		required: ['symbol', 'from_date', 'to_date'], // Ensure that all three parameters are provided
		additionalProperties: false, // Disallow extra properties
	},
	response: {
		200: historicalDataSuccessResponseSchema,
		400: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	},
};
