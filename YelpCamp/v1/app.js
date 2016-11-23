var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
    
var campgrounds = [
    
        {name: "Salmon Creek", image:"http://i.telegraph.co.uk/multimedia/archive/01439/camp-family_1439761c.jpg"},
        {name: "Granite Hill", image:"http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg?itok=HOYtWwYB"},
        {name: "Mountain Goat's Rest", image:"http://www.lamag.com/wp-content/uploads/sites/9/2015/06/ventana.jpg"}
    ];

app.get("/", function(req, res){
    
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var newcampground = {name: name, image: image};
    
    campgrounds.push(newcampground);
    
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("The YelpCamp Server has started!");
});