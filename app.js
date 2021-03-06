require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

mongoose
  .set("useUnifiedTopology", true)
  .connect(process.env.MONGODB_URI || "mongodb://localhost/coffee-filter", {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport Setup
passport.serializeUser((roaster, done) => {
  done(null, roaster._id);
});

passport.deserializeUser((id, done) => {
  Roaster.findById(id)
    .then((roaster) => {
      done(null, roaster);
    })
    .catch((err) => done(err));
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);

passport.use(
  new LocalStrategy((username, password, done) => {
    Roaster.findOne({ username })
      .then((found) => {
        if (found === null) {
          done(null, false, { message: "Incorrect credentials" });
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: "Incorrect credentials" });
        } else {
          done(null, found);
        }
      })
      .catch((err) => done(err, false));
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const wizard = require("./routes/wizard");
app.use("/", wizard);

const dashboard = require("./routes/dashboard");
app.use("/", dashboard);

const auth = require("./routes/auth");
const Roaster = require("./models/Roaster");
app.use("/", auth);

module.exports = app;
