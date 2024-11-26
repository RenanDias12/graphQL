import Fastify from "fastify";

const app = Fastify({
    logger: true
});

try {
    app.listen({ port: 3333 }).then(() => {
        console.log('Server up on http://localhost:3333')
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
