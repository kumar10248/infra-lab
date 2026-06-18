const http = require("http");
const os = require("os");
const { Client } = require("pg");

const client = new Client({
  host: "postgres",
  user: "devashish",
  password: "secret123",
  database: "infra_lab",
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

  res.end("API SERVER 🚀");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
