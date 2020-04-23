var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    Campground = require("./models/campgrounds"),
    seedDB = require("./seeds"),
    Comment = require("./models/comments"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    moment = require("moment");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//seedDB();

mongoose.connect("mongodb+srv://gouravaggarwal:Plmnko098@yelpcamp-d5nik.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to db");
}).catch(err => {
    console.log('ERROR: ', err.message);
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment;

app.use(require("express-session")({
    secret: "Campgrounds database",
    resave: false,
    saveUninitialized: false
}));

//passport settings
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user; //available in all the templates
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Requiring routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
    console.log("Server listening");
});