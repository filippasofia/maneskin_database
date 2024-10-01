const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
// Application
const app = express();
// Define port
const port = 3000;

// sqlite3
const sqlite3 = require("sqlite3");
const dbFile = "maneskin-database.sqlite3.db"; //filnamnet
db = new sqlite3.Database(dbFile);

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    },
  })
);

// view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// create routes
app.get("/", (req, res) => {
  res.send("My site!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
