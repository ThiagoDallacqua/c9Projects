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
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    
    name: "Mountain Goat's Rest",
    image:"http://www.lamag.com/wp-content/uploads/sites/9/2015/06/ventana.jpg",
    description: "This is a huge plato very close to a beautiful mountain, no bathrooms. Have a nice river nearby!"
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

app.get("/index", function(req, res){ //INDEX route #RESFUL ROUTES
    
    Campground.find({}, function(err, allCampgrounds){
        
       if(err){
           
           console.log(err);
       }else{
           
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});

app.get("/index/create", function(req, res) {//NEW route #RESFUL ROUTES
    
    res.render("create");
});

app.get("/index/:id", function(req, res) {//SHOW route #RESFUL ROUTES

    Campground.findById(req.params.id, function(err, foundCampground){
        
        if(err){
            
            console.log(err);
        }else{
            
            res.render("show", {campground: foundCampground});
        }
    });
});

app.post("/index", function(req, res){//CREATE route #RESFUL ROUTES
    
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

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("The YelpCamp Server has started!");
});