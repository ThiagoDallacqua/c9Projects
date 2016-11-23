var express = require("express");
var app = express();

app.get("/", function(req, res){ // this will redirect to a "homepage"
    
    console.log("someone made a request here!");
    res.send("Hi there!");
});

app.get("/bye", function(req, res){ // this will redirect to a "/bye" page
    
    console.log("someone made a request here!");
    res.send("Good Bye!");
});

app.get("/dog", function(req, res){ // this will redirect to a "/dog" page
    
    console.log("someone made a request here!");
    res.send("Meow!");
});

app.get("/r/:subredditName", function(req, res){ // this will redirect to any page that matches with the "/:subredditName" page
    
    var subreddit = req.params.subredditName;
    
    console.log("someone made a request here!");
    
    res.send("welcome to the " + subreddit + " page!");
});

app.get("/r/:subredditName/comments/:id/:tittle", function(req, res){ // this will redirect to any page that matches with the "/:subredditName" in the "comments" section with the "/:id" and "/:tittle"
    
    console.log("someone made a request here!");
    res.send("welcome to the comments page!");
});

app.get("*", function(req, res){ // this will send the user to a "page not found" message page, informing that the "/page" doesn't exist in the site
    
    console.log("someone made a request here!");
    res.send("You are a star!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Server started");
});