const http = require("http");
const os = require("os");
const { Pool } = require("pg");
const { createClient } = require("redis");
const promClient = require("prom-client");

/* ======================
   PostgreSQL
====================== */

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

/* ======================
   Redis
====================== */

const redis = createClient({
  url: "redis://redis:6379",
});

redis.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

(async () => {
  try {
    await redis.connect();
    console.log("Redis Connected");
  } catch (err) {
    console.error(err);
  }
})();

/* ======================
   Prometheus Metrics
====================== */

const register = new promClient.Registry();

promClient.collectDefaultMetrics({
  register,
});

const httpRequests = new promClient.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route"],
});

const httpDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

register.registerMetric(httpRequests);
register.registerMetric(httpDuration);

/* ======================
   HTTP Server
====================== */

const server = http.createServer(async (req, res) => {
  const route = req.url;
  const method = req.method;

  // Increment request counter
  httpRequests.inc({
    method,
    route,
  });

  // Start latency timer
  const end = httpDuration.startTimer();

  try {
    console.log(`${method} ${route}`);

    /* ======================
       Metrics Endpoint
    ====================== */

    if (route === "/metrics") {
      res.setHeader(
        "Content-Type",
        register.contentType
      );

      res.end(await register.metrics());

      end({ method, route });
      return;
    }

    /* ======================
       Users Endpoint
    ====================== */

    if (route === "/users") {
      const cache = await redis.get("users");

      if (cache) {
        res.setHeader(
          "Content-Type",
          "application/json"
        );

        res.end(
          JSON.stringify({
            source: "redis",
            container: os.hostname(),
            users: JSON.parse(cache),
          })
        );

        end({ method, route });
        return;
      }

      const result = await pool.query(
        "SELECT * FROM users"
      );

      await redis.set(
        "users",
        JSON.stringify(result.rows),
        {
          EX: 30,
        }
      );

      res.setHeader(
        "Content-Type",
        "application/json"
      );

      res.end(
        JSON.stringify({
          source: "database",
          container: os.hostname(),
          users: result.rows,
        })
      );

      end({ method, route });
      return;
    }

    /* ======================
       Health Endpoint
    ====================== */

    if (route === "/health") {
      try {
        await pool.query("SELECT 1");

        res.setHeader(
          "Content-Type",
          "application/json"
        );

        res.end(
          JSON.stringify({
            status: "UP",
            database: "CONNECTED",
            container: os.hostname(),
          })
        );
      } catch (err) {
        res.statusCode = 500;

        res.end(
          JSON.stringify({
            status: "DOWN",
            database: "DISCONNECTED",
            container: os.hostname(),
          })
        );
      }

      end({ method, route });
      return;
    }

    /* ======================
       404
    ====================== */

    res.statusCode = 404;
    res.end("Not Found");

    end({ method, route });
  } catch (err) {
    console.error(err);

    res.statusCode = 500;
    res.end("Internal Server Error");

    end({ method, route });
  }
});

/* ======================
   Start Server
====================== */

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
