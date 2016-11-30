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

router.get("/new", isLoggedIn, function(req, res) {//NEW route #RESFUL ROUTES
    
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

router.post("/", isLoggedIn, function(req, res){//CREATE route #RESFUL ROUTES
    
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

//middleware
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;