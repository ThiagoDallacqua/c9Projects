var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    data        = [
                    {
                        
                        name: "Beach Paradise",
                        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non massa venenatis, aliquet mi sed, auctor massa. Sed mauris ipsum, iaculis in risus in, condimentum semper eros. Mauris nec lectus vulputate, tincidunt dolor vitae, cursus massa. Nullam sit amet sem sed tellus ornare sagittis in sagittis mi. Praesent id elit sollicitudin, sagittis erat id, placerat lectus. Proin quis tellus erat. Vestibulum nulla quam, interdum at pretium nec, commodo non neque. Ut molestie pulvinar dui."
                    },
                    
                    {
                        
                        name: "Desert Inn",
                        image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non massa venenatis, aliquet mi sed, auctor massa. Sed mauris ipsum, iaculis in risus in, condimentum semper eros. Mauris nec lectus vulputate, tincidunt dolor vitae, cursus massa. Nullam sit amet sem sed tellus ornare sagittis in sagittis mi. Praesent id elit sollicitudin, sagittis erat id, placerat lectus. Proin quis tellus erat. Vestibulum nulla quam, interdum at pretium nec, commodo non neque. Ut molestie pulvinar dui."
                    },
                    
                    {
                        
                        name: "Mountain's Creeck",
                        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non massa venenatis, aliquet mi sed, auctor massa. Sed mauris ipsum, iaculis in risus in, condimentum semper eros. Mauris nec lectus vulputate, tincidunt dolor vitae, cursus massa. Nullam sit amet sem sed tellus ornare sagittis in sagittis mi. Praesent id elit sollicitudin, sagittis erat id, placerat lectus. Proin quis tellus erat. Vestibulum nulla quam, interdum at pretium nec, commodo non neque. Ut molestie pulvinar dui."
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