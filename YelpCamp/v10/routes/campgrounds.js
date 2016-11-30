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

//EDIT ROUTE

router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
   
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

router.put("/:id", checkCampgroundOwnership, function(req, res){
    
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

router.delete("/:id", checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndRemove(req.params.id, function(err){
        
        if(err){
            
            console.log(err);
            res.redirect("/index");
        }else{
            
            res.redirect("/index");
        }
    });
});

router.post("/", isLoggedIn, function(req, res){//CREATE route #RESFUL ROUTES
    
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

function checkCampgroundOwnership(req, res, next){
    
     if(req.isAuthenticated()){
       
       Campground.findById(req.params.id, function(err, foundCampground){
       
          if(err){
              
                console.log(err);
                res.redirect("/index");
          } else{
              
                if(foundCampground.author.id.equals(req.user._id)){
                    
                    next();
                }else{
                    
                    res.redirect("back");
                }
          }
       });
    }else{
       
       res.redirect("back");
    }
}

module.exports = router;