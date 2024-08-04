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

// routes
app.route("/api/expenses", expensesRoute);

export default app;
