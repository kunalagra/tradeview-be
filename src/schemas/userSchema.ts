// schemas/register.schema.ts
import { UserType, Broker } from '@/constants/common.enum.js';
import { errorResponseSchema, statusSchema } from './common.js';
export const registerSuccessSchema = {
	type: 'object',
	properties: {
		status: statusSchema,
		message: { type: 'string' },
	},
};
export const registerSchema = {
	body: {
		type: 'object',
		required: ['user_type', 'email', 'password', 'user_name', 'broker'],
		properties: {
			user_type: { type: 'string', enum: Object.values(UserType) },
			email: { type: 'string', format: 'email' },
			password: { type: 'string', minLength: 6 },
			user_name: { type: 'string', minLength: 1 },
			broker: { type: 'string', enum: Object.values(Broker) },
		},
	},
	response: {
		200: registerSuccessSchema,
		400: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	},
};

export const loginSchema = {
	body: {
		type: 'object',
		required: ['email', 'password'],
		properties: {
			email: { type: 'string', format: 'email' },
			password: { type: 'string', minLength: 6 },
		},
	},
	response: {
		200: {
			type: 'object',
			properties: {
				status: statusSchema,
				token: { type: 'string' },
			},
		},
		400: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	},
};
