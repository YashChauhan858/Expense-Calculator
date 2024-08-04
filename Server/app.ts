import { Hono } from "hono";

/** @Middleware */
import { cors } from "hono/cors";
import { logger } from "hono/logger";

/** @Routes */
import expensesRoute from "./routes/expenses";

const app = new Hono();

// setting up middleware
app.use("*", cors());
app.use(logger());

// routes with base path "/api", we can in future add more routes to this base path
app.basePath("/api").route("/expenses", expensesRoute);
export default app;
