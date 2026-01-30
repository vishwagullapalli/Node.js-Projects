import Fastify from "fastify";

const app = Fastify();
const port = 3000;

app.get("/", async (request, response) => {
    return "Welcome to What's Fare is Fair!";
});

await app.listen({ port });
console.log(`Web Server is listening at http://localhost:${port}`);
