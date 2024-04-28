require("dotenv").config();
const db_connection = require("./config/db_connection");
const APP_PORT = process.env.APP_PORT || 8080;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");
const passport = require("passport");
const cookie_session = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth.routes");
const session = require("express-session");
const mongodb_store = require("./config/session_db");
const app = express();
// const redis_connection = require("./config/redis_connection")

// app.use(express.static("public"))

app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookie_parser());
app.use(express());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: mongodb_store,
    cookie: {
      // secure: false,
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// DB connection
db_connection();

// Routes
app.use(require("./routes"));
// passport routes
app.use("/", authRoute);

// starting server
app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
