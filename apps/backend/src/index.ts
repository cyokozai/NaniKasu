export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from NaniKasu backend!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
