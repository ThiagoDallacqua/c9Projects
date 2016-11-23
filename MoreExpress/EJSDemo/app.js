var express = require("express");
var app = express();

app.use(express.static("public")); //add the 'public' directory to the server, in order that all files there can be 'seen' by the server
app.set("view engine", "ejs"); //will add automaticaly the '.ejs' to the respective file ref.

app.get("/", function(req, res){
    
    res.render("home"); // '.ejs' file
});

app.get("/fallinlovewith/:thing", function(req, res){
    
    var thing = req.params.thing;
    
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    
    var posts = [
        {title: "Post1", author: "Susy", comment: "blah. blah, blah..."},
        {title: "Post2", author: "Mike", comment: "blah. blah, blah..."},
        {title: "Post3", author: "Jhon", comment: "blah. blah, blah..."},
        {title: "Post4", author: "Rob", comment: "blah. blah, blah..."}
    ];
    
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Server is listening!");
});