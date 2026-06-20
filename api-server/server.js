const http = require("http");
const os = require("os");
const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  connectionTimeoutMillis: 3000,
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err.message);
});

console.log("API Server Starting...");

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  // GET /users
  if (req.url === "/users") {
    try {
      const result = await pool.query(
        "SELECT * FROM users"
      );

      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          container: os.hostname(),
          users: result.rows,
        })
      );
    } catch (err) {
      console.error(err);

      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Database Error",
        })
      );
    }

    return;
  }

  // GET /health
  if (req.url === "/health") {
    try {
      await pool.query("SELECT 1");

      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          status: "UP",
          database: "CONNECTED",
          container: os.hostname(),
        })
      );
    } catch (err) {
      console.error(err.message);

      res.statusCode = 500;

      res.end(
        JSON.stringify({
          status: "DOWN",
          database: "DISCONNECTED",
          container: os.hostname(),
        })
      );
    }

    return;
  }

  // Default Route
  res.end(`Hello from ${os.hostname()}`);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
