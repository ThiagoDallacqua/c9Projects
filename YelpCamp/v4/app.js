var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    /*Comment   = require("./models/comment"),
    User        = require("./models/user");*/
    
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

seedDB();

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

app.get("/index/new", function(req, res) {//NEW route #RESFUL ROUTES
    
    res.render("new");
});

app.get("/index/:id", function(req, res) {//SHOW route #RESFUL ROUTES

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
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