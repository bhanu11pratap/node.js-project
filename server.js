if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const path = require("path");
const expressLayout = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));
app.use(
  bodyparser.urlencoded({
    limit: "10mb",
    extended: false,
  })
);
app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT, () => console.log("Listening"));
