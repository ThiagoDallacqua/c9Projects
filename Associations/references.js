var mongoose = require("mongoose"),
    Post = require("./models/post"),
    User = require("./models/user");

mongoose.connect("mongodb://localhost/blog_demo_2");

/*User.create({
    
    email: "bob@gmail.com",
    name: "Bob Belcher"
});*/

Post.create({
    
   title: "How to coock the best burguer pt. 4",
   content: "blah blah blah blah"
}, function(err, post){
    
    if(err){
        
        console.log(err);
    }else{
        
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
            
            if(err){
                
                console.log(err);
            }else{
                
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    
                    if(err){
                        
                        console.log(err);
                    }else{
                        
                        console.log(data);
                    }
                })
            }
        });
    }
});

//FIND USER
//FIND ALL POSTS FOR THAT USER

/*User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    
    if(err){
        
        console.log(err);
    }else{
        
        console.log(user);
    }
});*/