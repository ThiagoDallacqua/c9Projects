var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    data        = [
                    {
                        
                        name: "Beach Paradise",
                        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
                        description: "blah blah blah"
                    },
                    
                    {
                        
                        name: "Desert Inn",
                        image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
                        description: "blah blah blah"
                    },
                    
                    {
                        
                        name: "Mountain's Creeck",
                        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
                        description: "blah blah blah"
                    }
                    
                    
                ];
    
function seedDB(){
    
    //Remove all campgrounds
    Campground.remove({}, function(err){ 
    
       if(err){
           
           console.log(err);
       } else{
           
           console.log("campgrounds removed!")
       }
       
       //Add a few campgrounds
        data.forEach(function(seed){
            
           Campground.create(seed, function(err, campground){
            
                if(err){
                    
                    console.log(err);
                }else{
                    
                    console.log("Added a campground");
                    
                    Comment.create(
                                
                                {
                                    
                                    text: "This place is greate, but I wish there was internet!",
                                    author: "Homer"
                                }, function(err, comment){
                                    
                                    if(err){
                                        
                                        console.log(err);
                                    }else{
                                        
                                        campground.comments.push(comment);
                                        campground.save();
                                        
                                        console.log("created new comment!");
                                    }
                                });
                }
            }); 
        });
    });
    
    //add a few comments
}

module.exports = seedDB;