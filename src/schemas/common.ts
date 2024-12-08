import { Status } from '@/constants/common.enum.js';

export const statusSchema = {
	type: 'string',
	enum: Object.values(Status),
};

export const errorResponseSchema = {
	type: 'object',
	properties: {
		status: statusSchema,
		message: { type: 'string' },
	},
	required: ['status', 'message'],
};
