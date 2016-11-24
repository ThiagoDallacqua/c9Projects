var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//schema setup

var campgroundSchema = new mongoose.Schema({
    
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    
    name: "Mountain Goat's Rest",
    image:"http://www.lamag.com/wp-content/uploads/sites/9/2015/06/ventana.jpg"
}, function(err, campground){
    
    if(err){
        
        console.log("ERROR!");
    }else{
        
        console.log("NEW CAMPGROUND ADDED!");
        console.log(campground);
    }
});*/

/*Campground.remove({name: "Mountain Goat's Rest"}, function(err, campground){
    
   if(err){
       
       console.log("ERROR!");
   } else{
       
       console.log("CAMPGROUND REMOVED");
       console.log(campground);
   }
});*/

app.get("/", function(req, res){
    
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        
       if(err){
           
           console.log("ERROR!");
       }else{
           
           res.render("campgrounds", {campgrounds: allCampgrounds});
       }
    });
});

app.get("/campgrounds/new", function(req, res) {
    
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var newcampground = {name: name, image: image};
    
    Campground.create(newcampground, function(err, campground){
        
        if(err){
            
            console.log("ERROR!");
        }else{
            
            console.log("NEW CAMPGROUND ADDED!");
            console.log(campground);
        }
    });
    
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("The YelpCamp Server has started!");
});