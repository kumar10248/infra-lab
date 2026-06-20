const http = require("http");
const os = require("os");
const { Client } = require("pg");

const client = new Client({
  host: "postgres",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

client.connect()
  .then(() => console.log("DB Connected"))
  .catch(console.error);

const server = http.createServer(async (req, res) => {
console.log(req.url);
  if (req.url === "/users") {
    try {
      const result = await client.query(
        "SELECT * FROM users"
      );

      res.setHeader("Content-Type", "application/json");
       res.end(
    JSON.stringify({
      container: os.hostname(),
      users: result.rows
    })
  );
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Database Error");
    }

    return;
  }

   if (req.url === "/health") {
  try {
    await client.query("SELECT 1");

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
      status: "UP",
      database: "CONNECTED"
    }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: "DOWN",
      database: "DISCONNECTED"
    }));
  }

  return;
}
  res.end("API SERVER 🚀");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
