const http = require("http");
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.connect().catch(console.error);

const server = http.createServer(async (req, res) => {
  let visits = 0;
  try {
    visits = await client.incr("visits");
  } catch (e) {
    visits = "Redis not connected";
  }
  res.writeHead(200);
  res.end(
    `Hello from Bonded POC!\nEnvironment: ${process.env.APP_ENV || "local"}\nVisits: ${visits}\n`
  );
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Server running!");
});