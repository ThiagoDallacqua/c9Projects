var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

//comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
   
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
router.post("/", middleware.isLoggedIn, function(req, res){
    
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

//comments edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   
   Comment.findById(req.params.comment_id, function(err, foundComment) {
       
       if(err){
           
           console.log(err);
           res.redirect("back");
       }else{
           
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
       }
   });
});

//comments update

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       
       if(err){
           
           console.log(err);
           res.redirect("back");
       }else{
           
           res.redirect(("/index/" + req.params.id));
       }
   }); 
});

//comment destroy

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        
        if(err){
            
            res.redirect("back");
        }else{
            
            res.redirect("/index/" + req.params.id);
        }
    });
});

module.exports = router;