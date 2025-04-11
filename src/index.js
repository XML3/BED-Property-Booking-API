import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import log from "../src/middleware/logMiddleware.js";
import usersRouter from "../routes/users.js";
import bookingsRouter from "../routes/bookings.js";
import propertiesRouter from "../routes/properties.js";
import hostsRouter from "../routes/hosts.js";
import amenitiesRouter from "../routes/amenities.js";
import reviewsRouter from "../routes/reviews.js";
import loginRouter from "../routes/login.js";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
try {
  const prisma = new PrismaClient({ adapter });
  console.log("Prisma Client initialized successfully");
} catch (error) {
  console.error("Error initializing Prisma Client:", error);
}

const app = express();

//Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Global middleware goes here
app.use(express.json());
app.use(log);

const corsOptions = {
  origin: "https://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//Routes go here
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/reviews", reviewsRouter);
// login Route
app.use("/login", loginRouter);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

//erroHandler goes here
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
export default app;
