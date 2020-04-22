var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res) {
    res.render("landing");
});

//============//
//Auth routes//
//===========//

//Show register form route
router.get("/register", function(req, res) {
    res.render("register");
});

//Handles registering user
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Login page route
router.get("/login", function(req, res) {
    res.render("login");
})

//Handles logging in
router.post("/login", passport.authenticate("local", { //by passport local mongoose package
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!!")
    res.redirect("/campgrounds");
});

module.exports = router;