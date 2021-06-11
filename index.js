const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// Configure template Engine and Main File
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      todaysDate: (date) => new Date(date),
    },
  })
);
// Seting template Engine
app.set("view engine", "hbs");

// routes
app.get("/", (req, res) => {
  res.render("home", {
    msg: "This is home page",
  });
});
app.get("/room-listing", (req, res) => {
  const counter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  res.render("room-listing", { counter: counter });
});
app.get("/user-registration", (req, res) => {
  res.render("user-registration", {
    peoples: [{ name: "jhon smith" }, { name: "jhonny Bravo" }],
  });
});

app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});
