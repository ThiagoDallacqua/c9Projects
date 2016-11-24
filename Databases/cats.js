var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app"); //create a new DB named "cats", or, connect to it

var catSchema = new mongoose.Schema({ //create the schema to the objects to be saved in the "cats" DB
    
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema); //create a instance of a object to manipulate the objects to be save in the DB

/*var george = new Cat({ //create an object, with the pattern defined in the schema
    
   name: "Bella",
   age: 7,
   temperament: "Grouchy"
});

george.save(function(err, cat){
    
    if(err){
        
        console.log("SOMETING WENT WRONG!");
    }else{
        
        console.log("WE JUST SAVED A CAT TO THE DB:");
        console.log(cat);
    }
});*/ //save it in the DB

/*Cat.create({
    
   name: "Peteleco",
   age: 5,
   Temperament: "Lazy"
}, function(err, cat) {
    
    if(err){
        
        console.log("ERRROR!");
    }else{
        
        console.log("NEW CAT SAVED!")
        console.log(cat);
    }
});*/

Cat.find({}, function(err, cats){
    
    if(err){
        
        console.log("OH, NO, ERROR!");
    }else{
        
        console.log("ALL THE CATS:");
        console.log(cats);
    }
});