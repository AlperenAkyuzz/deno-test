import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { routes } from './routes.js';

const messages = [];
const channel = new BroadcastChannel("chat");
channel.onmessage = (event) => {
  messages.push(event.data);
};

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Merhaba Dünya!";
  })
  .get("/messages", (context) => {
    context.response.body = messages;
  })
  .post("/messages", async (context) => {
    const message = await context.request.body().value;
    messages.push(message);
    channel.postMessage(message);
    context.response.body = messages;
  });

const app = new Application();
app.use(oakCors());
app.use(routes.routes());
app.use(routes.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());