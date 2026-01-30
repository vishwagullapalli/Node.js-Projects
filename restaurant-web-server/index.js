import Fastify from "fastify";
import operatingHours from "./data/operatingHours.js";
import menuItems from "./data/menuItems.js";
import ejs from "ejs";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import { join } from "path";
const publicPath = join(process.cwd(), "public");

const app = Fastify();
const port = 3000;

app.register(fastifyView, {
    engine: {
        ejs: ejs,
    },
});

app.register(fastifyStatic, {
    root: publicPath,
    prefix: "/public/",
});

app.get("/", async (request, response) => {
    return response.view("views/index.ejs", { name: "What's Fare is Fair " });
});

app.get("/menu", async (request, response) => {
    return response.view("views/menu.ejs", { menuItems });
});

app.get("/hours", async (request, response) => {
    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];
    return response.view("views/hours.ejs", { operatingHours, days });
});

app.listen({ port }, (err, address) => {
    if (err) throw err;
    console.log(`Server running at ${address}`);
});
