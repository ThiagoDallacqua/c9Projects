var express = require("express"),
    router  = express.Router(),
    Campground  = require("../models/campground");

router.get("/", function(req, res){ //INDEX route #RESFUL ROUTES

    Campground.find({}, function(err, allCampgrounds){
        
       if(err){
           
           console.log(err);
       }else{
           
           res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
       }
    });
});

router.get("/new", function(req, res) {//NEW route #RESFUL ROUTES
    
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {//SHOW route #RESFUL ROUTES

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err){
            
            console.log(err);
        }else{
            
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.post("/", function(req, res){//CREATE route #RESFUL ROUTES
    
    var name = req.body.name,
    image = req.body.image,
    desc = req.body.description,
    newcampground = {name: name, image: image, description: desc};
    
    Campground.create(newcampground, function(err, campground){
        
        if(err){
            
            console.log(err);
        }else{
            
            console.log("NEW CAMPGROUND ADDED!");
            console.log(campground);
        }
    });
    
    res.redirect("/index");
});

module.exports = router;