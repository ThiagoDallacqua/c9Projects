var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");

router.get("/", function(req, res){ //INDEX route #RESFUL ROUTES

    Campground.find({}, function(err, allCampgrounds){
        
       if(err){
           
           console.log(err);
       }else{
           
           res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
       }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {//NEW route #RESFUL ROUTES
    
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

//EDIT ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
   
   Campground.findById(req.params.id, function(err, foundCampground){
       
      if(err){
          
            console.log(err);
            res.redirect("/index");
      } else{
          
          res.render("campgrounds/edit", {campground: foundCampground});
      }
   });
});

//UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    
    //find and update the campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        
        if(err){
            
            console.log(err);
            res.redirect("/index");
        }else{
            
            res.redirect("/index/" + req.params.id);
        }
    });
});

//DESTOY ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndRemove(req.params.id, function(err){
        
        if(err){
            
            console.log(err);
            res.redirect("/index");
        }else{
            
            res.redirect("/index");
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){//CREATE route #RESFUL ROUTES
    
    var name            = req.body.name,
        image           = req.body.image,
        desc            = req.body.description,
        author          = {
            
            id: req.user._id,
            username: req.user.username
        },
        newcampground   = {name: name, image: image, description: desc, author: author};
    
    Campground.create(newcampground, function(err, campground){
        
        if(err){
            
            console.log(err);
        }else{
            
            req.flash("success", "New Campground added!");
            console.log(campground);
        }
    });
    
    res.redirect("/index");
});

module.exports = router;