var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware")

//Route for showing all the campgrounds
router.get("/", function(req, res) {
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allcampgrounds });
        }
    });
    //s.render("campgrounds",{campgrounds: campgrounds});
});

//Form for adding new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("./campgrounds/new");
});

//Handles adding new campground
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form
    // add to campgrounds array
    //route to campgrounds page
    var name = req.body.name;
    var url = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        price: price,
        image: url,
        description: desc,
        author: author
    };
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Campground added");
            res.redirect("/campgrounds");
        }
    });
});

//Show a particular campground route
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campgrounds: foundCampground });
        }
    });
});

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campgrounds: foundCampground });
    });
});

//Update Campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCampground) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deletd");
            res.redirect("/campgrounds");
        }
    });

});

module.exports = router;