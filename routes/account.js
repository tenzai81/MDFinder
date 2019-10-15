const express = require("express");
const router = express.Router();
const db = require ("../database");

function loginRedirect(req, res, next) {
  if (req.session.name) {
    res.redirect("/account/dashboard");
  } else {
    next();
  }
}

function loginCheck(req, res, next) {
  if (!req.session.name) {
    res.redirect("/account/login");
  } else {
 
    next();
  }
}

// URI: /account/
router.get("/", loginCheck, (req, res) => {
  res.render("/account/account");
});

router.get("/dashboard", loginCheck, (req, res) => {
  if (!req.session.favMovies) req.session.favMovies = [];
  res.render("account/dashboard", {
    favMovies: req.session.favMovies,
    name: req.session.name || "buddy"
  });
});

router.get("/settings", loginCheck, (req, res) => {
  res.render("account/settings");
});

router.post("/add", loginCheck, (req, res) => {
  if (req.session) {
    req.session.favMovies.push({ title: req.body.title });
  }
  res.redirect("/account/dashboard");
});

router.get("/login", loginRedirect, (req, res) => {
  res.render("/account/login");
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login/login");
});

router.post("/login", function(req, res) {
  console.log(req.body);
  if (req.session) {
    console.log("session is working");
    req.session.name = req.body.name;
  }
  res.redirect("/account/dashboard");
});

module.exports = router;