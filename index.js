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
app.get("/about-us", (req, res) => {
  res.render("about-us", { msg: null });
});
app.get("/peoples", (req, res) => {
  res.render("peoples", {
    peoples: [{ name: "jhon smith" }, { name: "jhonny Bravo" }],
  });
});
// port where app is served
app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});
