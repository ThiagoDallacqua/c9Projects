var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment   = require("./models/comment");
    //User        = require("./models/user");
    
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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
           
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

app.get("/index/new", function(req, res) {//NEW route #RESFUL ROUTES
    
    res.render("campgrounds/new");
});

app.get("/index/:id", function(req, res) {//SHOW route #RESFUL ROUTES

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err){
            
            console.log(err);
        }else{
            
            res.render("campgrounds/show", {campground: foundCampground});
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

//======================================================================
//COMMENTS ROUTES
//======================================================================

app.get("/index/:id/comments/new", function(req, res) {
   
   Campground.findById(req.params.id, function(err, campground){
       
       if(err){
           
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           
           res.render("comments/new", {campground: campground});
       }
   });
});

app.post("/index/:id/comments", function(req, res){
    
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

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("The YelpCamp Server has started!");
});