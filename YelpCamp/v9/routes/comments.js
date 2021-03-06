var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

//comments new
router.get("/new", isLoggedIn, function(req, res) {
   
   Campground.findById(req.params.id, function(err, campground){
       
       if(err){
           
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           
           res.render("comments/new", {campground: campground});
       }
   });
});

//comments create
router.post("/", isLoggedIn, function(req, res){
    
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        
        if(err){
            
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            
            Comment.create(req.body.comment, function(err, comment){
                
                if(err){
                    
                    console.log(err);
                }else{
                    
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    //save the comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/index/" + campground._id);
                }
            });
        }
    });
    //create a new comment
    //connect new comment to campground
    //redirect to campground show page
});

//middleware
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;