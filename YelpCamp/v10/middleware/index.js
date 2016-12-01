//all the middleware goes here
var middlewareOBJ   = {},
    Campground      = require("../models/campground"),
    Comment      = require("../models/comment");

middlewareOBJ.checkCampgroundOwnership = function(req, res, next){
    
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

middlewareOBJ.checkCommentOwnership = function(req, res, next){
    
     if(req.isAuthenticated()){
       
       Comment.findById(req.params.comment_id, function(err, foundComment){
       
          if(err){
              
                console.log(err);
                res.redirect("/index");
          } else{
              
                if(foundComment.author.id.equals(req.user._id)){
                    
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

middlewareOBJ.isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
    }
    
    res.redirect("/login");
}

module.exports =middlewareOBJ;