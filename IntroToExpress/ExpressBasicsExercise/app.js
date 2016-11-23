var express = require("express");
var app = express();

app.get("/", function(req, res){
    
    console.log("someone is connected!");
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    
    var animal = req.params.animal;
    var sounds = {
        
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow"
    };
    var sound = sounds[animal];
    
    console.log("someone is connected!");
    
    res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:message/:times", function(req, res) {
    
   var message = req.params.message;
   var num = Number(req.params.times);
   var text = "";
   
   console.log("someone is connected");
   
   for(var i = 0; i < num; i++){
       
       text += message + " ";
   }
   
   res.send(text);
});

app.get("*", function(req, res) {
    
    console.log("someone tryed a invalid page");
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Server started");
});