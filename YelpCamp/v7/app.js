var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    seedDB              = require("./seeds"),
    User                = require("./models/user"),
    campgroundsRoutes   = require("./routes/campgrounds"),//requiring routes
    commentsRoutes      = require("./routes/comments"),
    indexRoutes         = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//seedDB(); //seed the DB

//PASSPORT CONFIG
app.use(require("express-session")({
    
    secret: "Pituca is crazy",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    
   res.locals.currentUser = req.user; 
   next();
});

app.use(indexRoutes);
app.use("/index", campgroundsRoutes);
app.use("/index/:id/comments", commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("The YelpCamp Server has started!");
});