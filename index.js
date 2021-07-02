const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
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
app.get("/dashboard", (req, res) => {
  const counter = [0, 1, 2, 3];
  res.render("dashboard", { counter: counter });
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
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/responsive", express.static(__dirname + "/public/css"));
app.use(urlencodedParser);

app.post("/login", urlencodedParser, (req, res) => {
  if (!req.body.email) {
    res.status(400).json({
      success: false,
      message: "Please enter proper email",
    });
  }
  if (!req.body.password) {
    res.status(400).json({
      success: false,
      message: "Please enter proper password",
    });
  }
  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

app.post("/register", urlencodedParser, (req, res) => {
  if (!req.body.firstName) {
    res.status(400).json({
      success: false,
      message: "Please enter proper first name",
    });
  }
  if (!req.body.lastName) {
    res.status(400).json({
      success: false,
      message: "Please enter proper last name",
    });
  }
  if (!req.body.email) {
    res.status(400).json({
      success: false,
      message: "Please enter proper email",
    });
  }
  if (!req.body.password) {
    res.status(400).json({
      success: false,
      message: "Please enter proper password",
    });
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!new RegExp(emailRegex).test(decodeURIComponent(req.body.email))) {
    res.status(400).json({
      success: false,
      message: "Please enter valid email address",
    });
  }
  if (
    !new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ).test(decodeURIComponent(req.body.password))
  ) {
    res.status(400).json({
      success: false,
      message:
        "Password should be minimum 8 characters and should includes atleast 1 uppercase, 1 lowercase, 1 number and 1 special characters",
    });
  }
  res.status(200).json({
    success: true,
    message: "Registration successful",
    data: res.body,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("The web server has started on port 3000");
});
