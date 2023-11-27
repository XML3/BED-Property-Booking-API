import * as Sentry from "@sentry/node";
import "dotenv/config";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import log from "../src/middleware/logMiddleware.js";
import usersRouter from "../routes/users.js";
import loginRouter from "../routes/login.js";

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
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Global middleware goes here
app.use(express.json());
app.use(log);

//Routes go here
app.use("/users", usersRouter);
//login Route
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

//erroHandler goes here
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
