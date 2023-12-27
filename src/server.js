import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import usersRouter from "./routes/users.router.js";
import "./db/dbConfig.js";
import mongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "passport";
import viewsRouter from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import "./passport/jwt.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000,
    },
    store: new mongoStore({
      mongoUrl:
      "mongodb+srv://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 10,
      
    }),
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});