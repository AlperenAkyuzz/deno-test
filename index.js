import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { router } from 'https://github.com/AlperenAkyuzz/deno-test/blob/master/routes.js';

const messages = [];
const channel = new BroadcastChannel("chat");
channel.onmessage = (event) => {
  messages.push(event.data);
};


const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());