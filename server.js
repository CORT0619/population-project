import Fastify from 'fastify';

const fastify = Fastify();
const PORT = 5555;


fastify.register(import('@fastify/express'))
fastify.register(import('./routes/index.js'), {prefix: '/api/population'})

fastify.listen({ port: PORT }, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('listening on PORT ', PORT);
});