import { FastifyPluginAsync } from 'fastify';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '@/schemas/userSchema.js';
import { Status } from '@/constants/common.enum.js';

const userRoutes: FastifyPluginAsync = async (fastify) => {
	// User Registration
	fastify.post(
		'/register',
		{ schema: registerSchema },
		async (req, reply) => {
			const { user_type, email, password, user_name, broker } =
				req.body as {
					user_type: string;
					email: string;
					password: string;
					user_name: string;
					broker: string;
				};

			const existingUser = await fastify.prisma.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				return reply.sendError(400, 'User already exists');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await fastify.prisma.user.create({
				data: {
					user_type,
					email,
					password: hashedPassword,
					user_name,
					broker,
				},
			});

			reply.send({
				message: 'User registered successfully',
				userId: newUser.id,
			});
		},
	);

	// User Login
	fastify.post('/login', { schema: loginSchema }, async (req, reply) => {
		const { email, password } = req.body as {
			email: string;
			password: string;
		};

		const user = await fastify.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return reply.sendError(400, 'Invalid credentials');
		}

		const passwordValid = await bcrypt.compare(password, user.password);

		if (!passwordValid) {
			return reply.sendError(400, 'Invalid credentials');
		}

		const token = fastify.jwt.sign(
			{ userId: user.id, email: user.email },
			{
				expiresIn: '1h',
			},
		);

		reply.send({ status: Status.SUCCESS, token });
	});

	fastify.get(
		'/profile',
		{ preValidation: [fastify.authenticate] },
		async (req, reply) => {
			const userEmail = req.user.email as string;

			const user = await fastify.prisma.user.findUnique({
				where: { email: userEmail },
			});

			if (!user) {
				return reply.sendError(404, 'User not found');
			}

			// Construct the profile response
			const profileResponse = {
				status: Status.SUCCESS,
				data: {
					user_id: user.id || 'AB1234',
					user_type: user.user_type || 'individual',
					email: user.email || 'xxxyyy@gmail.com',
					user_name: user.user_name || 'AxAx Bxx',
					broker: user.broker || 'ZERODHA',
				},
			};
			reply.send(profileResponse);
		},
	);
};

export default userRoutes;
