export const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Merhaba Dünyalar!";
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
