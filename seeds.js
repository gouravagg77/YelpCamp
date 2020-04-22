var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var data = [{
        name: "Taj mahal",
        image: "https://traveljee.com/wp-content/uploads/2014/12/red_fort_delhi-600x402.jpg",
        description: "India is one of the fastest growing travel destinations in the world. A large number of foreign tourists arrives each year in India. The number of travel packages / tour packages sold by Indian travel companies are increasing year over year. The country offers diversified culture, natural beauty, and much more."
    },
    {
        name: "Taj mahal",
        image: "https://traveljee.com/wp-content/uploads/2014/12/red_fort_delhi-600x402.jpg",
        description: "India is one of the fastest growing travel destinations in the world. A large number of foreign tourists arrives each year in India. The number of travel packages / tour packages sold by Indian travel companies are increasing year over year. The country offers diversified culture, natural beauty, and much more."
    },
    {
        name: "Taj mahal",
        image: "https://traveljee.com/wp-content/uploads/2014/12/red_fort_delhi-600x402.jpg",
        description: "India is one of the fastest growing travel destinations in the world. A large number of foreign tourists arrives each year in India. The number of travel packages / tour packages sold by Indian travel companies are increasing year over year. The country offers diversified culture, natural beauty, and much more."
    }
];



function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed");
        }
        //add anew campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    //create comments
                    Comment.create({
                        text: "qwertyuiop",
                        author: "homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
            });
        });
    });

}
module.exports = seedDB;